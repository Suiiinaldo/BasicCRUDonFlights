const { FlightService } = require("../services");
const { StatusCodes} = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common")


/*
 * POST : /airports 
 * req-body : {
 * flightNumber: 'UK 808' ,
 * airplaneId : 'a380',
 * departureAirportId : 12,
 * arrivalAirportId : 3,
 * arrivalTime : '11:10:00',
 * departureTime : '9:20:00',
 * price : 3450,
 * boardingGate : '3A',
 * totalSeats : 120,
 * }
 */
async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        SuccessResponse.data = flight;
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

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
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


/**
  *  POST: v1/flights/:id
  *  req-body: {}
*/
async function getFlight(req,res){
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
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

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,

    
}