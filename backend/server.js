const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Trust proxy for rate limiting behind proxies/load balancers
app.set('trust proxy', 1); // trust first proxy

// Constants
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_FILE_TYPES = [
  // 3D Model formats
  'model/gltf-binary',
  'model/gltf+json',
  'application/octet-stream', // For .glb files
  'application/x-blender',
  'application/x-maya',
  'application/x-3ds',
  'application/x-stl',
  'application/obj',
  'application/fbx',
  // Image formats
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    // Use the client's IP address for rate limiting
    return req.ip;
  }
});

// Apply rate limiting to all API routes
// app.use('/api/', limiter); // Temporarily disabled for debugging CORS issue



// Add CORS headers to allow file uploads from the frontend


app.use(cors());
app.use(express.json());

// Configure multer for file uploads with validation
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only 3D model files (GLTF, GLB, OBJ, etc.) and images (JPG, PNG) are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  });

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }

  // Default error response
  res.status(500).json({ 
    error: 'An error occurred while processing your request.'
  });
};



// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint for security assessment
app.post('/api/assess', upload.array('models', 10), async (req, res, next) => {
  try {
    const { siteName, facilityType, locationEnvironment, initialObservations, specificConcerns } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Construct the multi-modal prompt
    const promptMessages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              You are a world-class physical security consultant with 20 years of experience creating security assessment reports and Standard Operating Procedures (SOPs) for major corporations.

              You are analyzing the following location:
              - Site Name: ${siteName || 'Not Provided'}
              - Facility Type: ${facilityType || 'Not Provided'}
              - Environment: ${locationEnvironment || 'Not Provided'}

              The on-site human assessor has provided the following notes:
              - Initial Observations: ${initialObservations || 'None'}
              - Specific Concerns: ${specificConcerns || 'None'}

              The following images have been provided as visual evidence. Analyze them carefully in conjunction with the assessor's notes to identify vulnerabilities and positive security features.

              YOUR TASK:
              Generate a comprehensive physical security audit report in Markdown format. The report MUST include the following sections:
              1.  **Executive Summary:** A brief overview of the security posture, summarizing key findings.
              2.  **Identified Vulnerabilities:** A numbered list of all identified risks. For each risk, you must provide:
                  *   **Vulnerability:** A clear, concise description of the issue (e.g., "Unsecured Perimeter Fence").
                  *   **Observed in Image(s):** Reference which uploaded image(s) (e.g., "Image 1", "Image 3") show this vulnerability.
                  *   **Severity:** A rating of Low, Medium, or High, with justification.
                  *   **Recommendation/SOP:** A detailed, actionable Standard Operating Procedure (SOP) to mitigate the risk. This should be practical and specific.
              3.  **Positive Security Features:** A numbered list of security measures that are correctly implemented or observed as beneficial. For each feature, reference which uploaded image(s) (e.g., "Image 2") show this feature.
              4.  **Concluding Remarks:** A brief summary and any final recommendations.
            `
          },
          // Add image URLs
          ...req.files.map(file => ({
            type: "image_url",
            image_url: {
              url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
            }
          }))
        ]
      }
    ];

    // Call OpenAI API for analysis
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: promptMessages,
      max_tokens: 2048 // Increased token limit for more detailed reports
    });

    res.json({
      analysis: response.choices[0].message.content,
      filenames: req.files.map(f => f.originalname)
    });
  } catch (error) {
    console.error('Error processing request:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    if (error.response) {
      // Handle OpenAI API errors
      console.error('OpenAI API Error:', error.response.status, error.response.data);
      return res.status(502).json({ 
        error: 'Error communicating with the AI service. Please try again later.'
      });
    }
    
    // Pass to error handling middleware
    next(error);
  }
});

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`PORT from .env: ${process.env.PORT}`);
});

// Error handling middleware (must be last)
app.use(errorHandler);
