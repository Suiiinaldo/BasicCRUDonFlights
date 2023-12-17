const express = require("express");

const v1routes = require("./v1");

const router = express.Router();

console.log("inside api routes");

router.use("/v1", v1routes);

module.exports = router;
