const express = require("express");

const { FlightController } = require("../../controller");
const { FlightMiddlewares } = require("../../middlewares")

const router = express.Router();

// /api/v1/flights POST
router.post("/",
            FlightMiddlewares.validateCreateRequest,
            FlightController.createFlight);

// /api/v1/flights?trips=DEL-MUM GET
router.get("/",
            FlightController.getAllFlights);

// /api/v1/flights/2 GET
router.get("/:id",
            FlightController.getFlight);


module.exports = router;