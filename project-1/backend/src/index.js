const express = require('express');
const fs = require('fs');
const path = require('path');
const { connectDB } = require('./config/db.config');
require('dotenv').config();
const routes = require('./routes/index');
const globalErrorHandler = require('./middleware/errorMiddleware');

const uploadsDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(globalErrorHandler);

app.use('/uploads', express.static(uploadsDir));

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
