const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber || !req.body.capacity ){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError([ "Model Number or capacity not found in the oncoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(isNaN(req.query.capacity) || !req.query.capacity){
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError([ "Capaity is not found or is not Integer in the oncoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};