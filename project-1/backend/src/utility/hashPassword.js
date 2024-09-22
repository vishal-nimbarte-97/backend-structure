const bcrypt = require('bcrypt');

// Function to hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = { hashPassword };
