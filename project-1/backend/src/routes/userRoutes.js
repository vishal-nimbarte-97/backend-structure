const express = require('express');
const { signUp,login,uploadFile } = require('../controllers/userController');
const upload = require('../utility/fileUpload');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
