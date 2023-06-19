const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");

require("dotenv").config();
const {  BookRoute } = require("./routes/Dealers.route");


let app = express();
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  try {
    

    res.status(200).json(`Welcome to Book app.`);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.use("/book", BookRoute);














app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
