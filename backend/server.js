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
app.use('/api/', limiter);

// Increase the maximum request size for file uploads
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Add CORS headers to allow file uploads from the frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware
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

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }

  // Default error response
  res.status(500).json({ 
    error: 'An error occurred while processing your request.'
  });
};

app.use(errorHandler);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint for security assessment
app.post('/api/assess', upload.single('model'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Additional validation
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
    }

    if (!ALLOWED_FILE_TYPES.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid file type. Only 3D model files (GLTF, GLB, OBJ, etc.) and images (JPG, PNG) are accepted.' 
      });
    }

    // Convert file to base64
    const base64File = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    // Call OpenAI API for analysis
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this 3D model for security vulnerabilities. Identify potential security risks, check for common vulnerabilities, provide remediation steps, and rate severity (Low/Medium/High)."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64File}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    res.json({
      analysis: response.choices[0].message.content,
      filename: req.file.originalname
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
});
