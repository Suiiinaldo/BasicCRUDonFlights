const { CityRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError(" The city you requested to delete is not present ", error.statusCodes);
        }
        throw new AppError('Cannot destroy data of the requested City',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(data,id)
{
    try {
        const response = await cityRepository.update(data,id);
        return response;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested to update is not present ", error.statusCodes);
        }
        throw new AppError('Cannot update data of the requested airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createCity,
    destroyCity,
    updateCity,

}