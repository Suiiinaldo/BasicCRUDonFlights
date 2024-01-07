const CrudRepository = require("./crud-repository");
const { City } = require("../models");

class CityRepository extends CrudRepository {
    constructor(model){
        super(City);
    }
}

module.exports = CityRepository;