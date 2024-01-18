const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const db = require("../models");
const { addRowLocksOnFlights } = require("./queries");
class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    as: 'airplaneDetail',
                    required: true,
                },
                {
                    model: Airport,
                    as: 'departureAirport',
                    required: true,
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code")),
                    },
                    include : {
                        model: City,
                        required: true,
                    },
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                    required: true,
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code")),
                    },
                    include : {
                        model: City,
                        required: true,
                    },
                },

            ]
        });
        return response;
    }

    async updateRemainingSeats (flightId, seats, dec = true){
        await db.sequelize.query(addRowLocksOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)){
         const response = await flight.decrement('totalSeats', {by: seats});
         return response;
       }
       else{
        const response = await flight.increment('totalSeats', {by: seats});
         return response;
       } 
    }
}

module.exports = FlightRepository;