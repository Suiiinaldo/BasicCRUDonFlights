const express = require("express");

const { CityController } = require("../../controller");

const router = express.Router();

// /api/v1/cities POST
router.post("/",
            CityController.createCity);

module.exports = router;