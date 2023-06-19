const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {


    title:String,
    author:String,
    description:String,
    cover_image:String,
    img:String,
    price:Number,
    Genres:String,
    Publisher:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookAppModel", BookSchema);
