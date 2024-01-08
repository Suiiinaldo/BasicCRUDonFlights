const { CityService } = require("../services");
const { StatusCodes} = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common")


/*
 * POST : /cities 
 * req-body : { name : Gorakhpur }
 */
async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name : req.body.name,
        });
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);   
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCodes)
                .json(ErrorResponse);
    }
}

/*
 * DELETE : /cities/:id
 * req-body : {}
 */
async function destroyCity(req,res){
    try {
        const response = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCodes)
                .json(ErrorResponse);
    }
}

/*
 * PATCH : /airplanes/:id
 * req-body : {name : Gorakhpur }
 */
async function updateCity(req,res){
    try {
        const response = await CityService.updateCity({
                name: req.body.name,
            },req.params.id,);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCodes)
                .json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity,
    
}