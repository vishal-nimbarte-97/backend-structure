const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define where files should be stored
        cb(null, './src/uploads');  // You can change this path as per your project structure
    },
    filename: (req, file, cb) => {
        // Create a unique filename for each file
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];  // Define allowed mime types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'), false);
    }
};

// Initialize multer upload object with limits and filters
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
    },
    fileFilter
});

module.exports = upload;
