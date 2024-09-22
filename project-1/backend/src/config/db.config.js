const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_NAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'Test_1234',
    port: process.env.DATABASE_PORT || 5432,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

module.exports = {
    pool,
    connectDB,
};


