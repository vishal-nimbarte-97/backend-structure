const { pool } = require('../config/db.config');
const { hashPassword } = require('../utility/hashPassword');
const path = require('path');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    const { name, email, phone, gender, date_of_birth, password } = userData;

    const hashedPassword = await hashPassword(password);

    try {
        const query = `
            INSERT INTO users (name, email, phone, gender, date_of_birth, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [name, email, phone, gender, date_of_birth, hashedPassword];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error inserting user into the database: ' + error.message);
    }
};


const fileUploadService = async (file, req) => {
    try {

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

        const fileInfo = {
            originalName: file.originalname,
            fileName: file.filename,
            mimeType: file.mimetype,
            size: file.size,
            path: fileUrl
        };

        return fileInfo;
    } catch (error) {
        throw new Error('Error processing the uploaded file');
    }
};

const loginUser = async ({ email, password }) => {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        const result = await pool.query(query, values);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return user;
    } catch (error) {
        throw new Error('Error during login: ' + error.message);
    }
};





module.exports = { registerUser,loginUser, fileUploadService };
