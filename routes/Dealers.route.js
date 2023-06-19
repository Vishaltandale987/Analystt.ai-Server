const BookModel = require("../model/Dealers.modal");
const express = require("express");
const BookRoute = express.Router();


//get all post from BookModel

BookRoute.get("/:color/:pri/:mi", async (req, res) => {
  const Genres = req.params.color;
  const price = req.params.pri;
  const max = +price+500 
 
  const Publisher = req.params.mi;



  if(Genres === "all" && price === "all" && Publisher === "all" ){
    try {
      const notes = await BookModel.find();
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(Genres !== "all" && price === "all" && Publisher === "all"){
    try {
      const notes = await BookModel.find({Genres:Genres});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(Genres === "all" && price !== "all" && Publisher === "all"){
    try {

      if(price === "2000"){

        const notes = await BookModel.find({ price:{ $gt: price } });
        res.send(notes.reverse());
      }else{

        const notes = await BookModel.find({ price:{ $gt: price, $lt: max } });
        res.send(notes.reverse());
      }



    } catch (error) {
      console.log(error)
    }
  }else if(Genres === "all" && price === "all" && Publisher !== "all"){
    try {
      const notes = await BookModel.find({ Publisher });
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(Genres !== "all" && price !== "all" && Publisher === "all"){
    try {

      if(price === "2000"){

        const notes = await BookModel.find({Genres:Genres, price:{ $gt: price } });
        res.send(notes.reverse());
      }else{

        const notes = await BookModel.find({ Genres:Genres,price:{ $gt: price, $lt: max } });
        res.send(notes.reverse());
      }


   


    } catch (error) {
      console.log(error)
    }
  }else if(Genres === "all" && price !== "all" && Publisher !== "all"){
    try {

      if(price === "2000"){

        const notes = await BookModel.find({Publisher, price:{ $gt: price } });
        res.send(notes.reverse());
      }else{

        const notes = await BookModel.find({ Publisher,price:{ $gt: price, $lt: max } });
        res.send(notes.reverse());
      }


    } catch (error) {
      console.log(error)
    }
  }else if(Genres !== "all" && price === "all" && Publisher !== "all"){
    try {
      const notes = await BookModel.find({Publisher,Genres:Genres});
      res.send(notes.reverse());
    } catch (error) {
      console.log(error)
    }
  }else if(Genres !== "all" && price !== "all" && Publisher !== "all"){
    try {

      if(price === "2000"){

        const notes = await BookModel.find({Publisher,Genres:Genres, price:{ $gt: price } });
        res.send(notes.reverse());
      }else{

        const notes = await BookModel.find({ Publisher, Genres:Genres, price:{ $gt: price, $lt: max } });
        res.send(notes.reverse());
      }
   
    } catch (error) {
      console.log(error)
    }
  }
  
  
  });




//create a post

BookRoute.post("/", async (req, res) => {
  const newPost = new BookModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json("Book has been added successfully.")
  } catch (err) {
    res.status(500).json(err);
  }
});


// get post by id

BookRoute.get("/:id", async (req, res) => {
  try {
    const post = await BookModel.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete
BookRoute.delete("/:id", async (req, res) => {
    try {
      await BookModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Post has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

// update


BookRoute.put("/:id", async (req, res) => {

  let post_id = req.params.id
  let obj = req.body

  // console.log(post_id, obj)
    try {
      const user = await BookModel.findByIdAndUpdate(post_id, {
        $set: obj,
      });
      res.status(200).json("Book has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  });


// search 


BookRoute.get("/search/:q", async (req, res) => {
  const data = req.params.q;
  console.log(data)


  try {
    const user = await BookModel.find(  { title: { $regex: data || "", $options: 'i' } });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = {
    BookRoute,
  };
