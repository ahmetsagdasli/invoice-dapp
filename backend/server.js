const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Data directory
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
fs.ensureDirSync(DATA_DIR);
fs.ensureDirSync(UPLOADS_DIR);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `invoice-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
    }
  }
});

// Blockchain connection
let provider;
let contract;

async function initBlockchain() {
  try {
    provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    
    // Test connection
    const network = await provider.getNetwork();
    console.log('��� Blockchain connected:', network.name, `(Chain ID: ${network.chainId})`);
    
    // Contract setup (optional - for direct blockchain queries)
    if (process.env.CONTRACT_ADDRESS && process.env.PRIVATE_KEY) {
      const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      // Contract ABI would go here if needed
      console.log('��� Contract ready at:', process.env.CONTRACT_ADDRESS);
    }
    
  } catch (error) {
    console.error('❌ Blockchain connection failed:', error.message);
  }
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    network: process.env.NODE_ENV || 'development',
    blockchain: {
      rpcUrl: process.env.RPC_URL,
      contractAddress: process.env.CONTRACT_ADDRESS
    }
  });
});

// API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'Invoice DApp Backend API',
    version: '1.0.0',
    developer: 'ahmetsagdasli',
    endpoints: {
      health: '/health',
      upload: '/api/upload',
      blockchain: '/api/blockchain/info'
    },
    timestamp: new Date().toISOString()
  });
});

// File upload endpoint
app.post('/api/upload', upload.single('invoice'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        message: 'Please select a file to upload' 
      });
    }

    const fileInfo = {
      id: Date.now().toString(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString(),
      uploadedBy: req.body.userAddress || 'anonymous'
    };

    // Save file info to JSON
    const filesDB = path.join(DATA_DIR, 'uploaded_files.json');
    let files = [];
    
    if (await fs.pathExists(filesDB)) {
      files = await fs.readJson(filesDB);
    }
    
    files.push(fileInfo);
    await fs.writeJson(filesDB, files, { spaces: 2 });

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileInfo.id,
        name: fileInfo.originalName,
        size: fileInfo.size,
        url: `/uploads/${req.file.filename}`
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Upload failed',
      message: error.message 
    });
  }
});

// Get uploaded files
app.get('/api/files', async (req, res) => {
  try {
    const filesDB = path.join(DATA_DIR, 'uploaded_files.json');
    
    if (await fs.pathExists(filesDB)) {
      const files = await fs.readJson(filesDB);
      res.json({ files });
    } else {
      res.json({ files: [] });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch files',
      message: error.message 
    });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Blockchain info
app.get('/api/blockchain/info', async (req, res) => {
  try {
    if (!provider) {
      return res.status(503).json({ 
        error: 'Blockchain not connected' 
      });
    }

    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();

    res.json({
      network: {
        name: network.name,
        chainId: Number(network.chainId)
      },
      blockNumber,
      contractAddress: process.env.CONTRACT_ADDRESS,
      rpcUrl: process.env.RPC_URL,
      connected: true
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Blockchain query failed',
      message: error.message 
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`,
    availableEndpoints: ['/health', '/api', '/api/upload', '/api/files', '/api/blockchain/info']
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
async function startServer() {
  try {
    // Initialize blockchain connection
    await initBlockchain();
    
    app.listen(PORT, () => {
      console.log('��� Invoice DApp Backend Started!');
      console.log('═══════════════════════════════════');
      console.log(`��� Server: http://localhost:${PORT}`);
      console.log(`��� Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`��� Contract: ${process.env.CONTRACT_ADDRESS || 'Not configured'}`);
      console.log(`��� RPC: ${process.env.RPC_URL || 'Not configured'}`);
      console.log(`��� Data Directory: ${DATA_DIR}`);
      console.log(`��� Uploads Directory: ${UPLOADS_DIR}`);
      console.log('═══════════════════════════════════');
      console.log('✅ Backend ready for connections!');
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('��� Received SIGTERM. Graceful shutdown...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n��� Received SIGINT. Graceful shutdown...');
  process.exit(0);
});
