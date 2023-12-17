const express = require("express");

const { InfoController } = require("../../controller");

const AirplaneRoutes = require("./airplane-routes");

const router = express.Router();

console.log("inside v1 routes");

router.use("/airplanes", AirplaneRoutes);

router.get("/info", InfoController.info);

module.exports = router;
