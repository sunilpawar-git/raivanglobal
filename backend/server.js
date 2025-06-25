const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint for security assessment
app.post('/api/assess', upload.single('model'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
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
    console.error('Error processing request:', error);
    res.status(500).json({ 
      error: 'Error processing request',
      details: error.message 
    });
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
