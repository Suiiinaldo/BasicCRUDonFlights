const express = require("express");

const { ServerConfig, Logger } = require("./config");

const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", { msg: "something" });
  //Testing Purpose
  // const { City, Airport } = require('./models');
  // // const newDelhi = await City.findByPk(3);
  // // console.log(newDelhi);
  // // const airport = await newDelhi.createAirport({name : 'Delhi airport',code : 'NDLS'});
  // // console.log(airport);
  // // const indira = await Airport.findByPk(1);
  // // await newDelhi.removeAirports(indira);
  // await City.destroy({
  //   where:{
  //     id:3
  //   }
  // });
});
