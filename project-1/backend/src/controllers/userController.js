const { BadRequestError, Success, ApiErrorResponse, UnAuthorizedError } = require('../utility/errorHandler');
const { registerUser,loginUser ,fileUploadService } = require('../services/userService');
const { generateToken } = require('../utility/jwt');

const uploadFile = async (req, res) => {

    if (!req.file) {
        return ApiErrorResponse.send(new BadRequestError('No file uploaded'), res);
    }

    try {
        const fileInfo = await fileUploadService(req.file, req);

        const successResponse = new Success(fileInfo); 
        res.status(successResponse.StatusCode).json(successResponse); 
    } catch (error) {
        ApiErrorResponse.send(new BadRequestError(error.message), res); 
    }
};

const signUp = async (req, res) => {

    const { name, email, phone, gender, date_of_birth, password } = req.body;

    try {
        const newUser = await registerUser({ name, email, phone, gender, date_of_birth, password });
        
        const successResponse = new Success(newUser);
        res.status(successResponse.StatusCode).json(successResponse);
    } catch (error) {
        ApiErrorResponse.send(new BadRequestError(error.message), res);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUser({ email, password });
        const token = generateToken(user);

        const successResponse = new Success({ user, token });
        res.status(successResponse.StatusCode).json(successResponse);
    } catch (error) {
        ApiErrorResponse.send(new UnAuthorizedError(error.message), res);
    }
};


module.exports = {uploadFile,signUp,login};
