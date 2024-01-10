const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers")

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        // console.log(data);
        if(!compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        //Departure and arrival airport cannot be same
        else if(data.departureAirportId == data.arrivalAirportId){
            throw new AppError('Departure and arrival airport reference cannot be same', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        else if(error.name == "SequelizeForeignKeyConstraintError" || error.name == "SequelizeDatabaseError" || error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
}