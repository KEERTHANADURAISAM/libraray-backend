const express = require("express");
const app = express();
const cors = require("cors");
const dotenv=require("dotenv").config()
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const DB = "library";
const user = [];

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/home", function (req, res) {
  res.json("listening port 3001");
});

app.post("/user", async function (req, res) {
  //connect a Db
  try {
    // step1:Create a connection bwt Nodejs and MongoDb
    const connection = await mongoClient.connect(URL);
    // step2:select the DB
    const db = connection.db(DB);
    // step3:select the Collection
    // step4:Do the Operation (CRUD)
    await db.collection("Books").insertOne(req.body);
    // step5:Close the Connection
    await connection.close();
    res.json("Data Inserted");
  } catch (error) {
    // if any error throw error
    console.log(error);
    res.status(500).json({ message: "something Went Wrong" });
  }
});

app.get("/users", async function (req, res) {
  try {
    // step 1 : Create a connection Nodejs and mongodb
    const Connection = await mongoClient.connect(URL);
    // step 2 : Select the db
    const db = Connection.db(DB);
    // step 3 : Select the Collection
    // Step 4 : Do the operation (CRUD);
    const resUser = await db.collection("Books").find().toArray();
    // Step 5 : Close the connection
    await Connection.close();
    res.json(resUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
});

app.get("/user/:id", async function (req, res) {
  try {
    // step 1 : Create a connection Nodejs and mongodb
    const Connection = await mongoClient.connect(URL);
    // step 2 : Select the db
    const db = Connection.db(DB);
    // step 3 : Select the Collection
    // Step 4 : Do the operation (CRUD);
    const user = await db.collection('Books').findOne({_id : new mongodb.ObjectId(req.params.id)})
    // Step 5 : Close the connection
    await Connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
});

app.put("/user/:id",async function (req, res) {
  try {
    // step 1 : Create a connection Nodejs and mongodb
    const Connection = await mongoClient.connect(URL);
    // step 2 : Select the db
    const db = Connection.db(DB);
    // step 3 : Select the Collection
    // Step 4 : Do the operation (CRUD);
    const user = await db.collection('Books').findOneAndUpdate({_id : new mongodb.ObjectId(req.params.id)},{$set:req.body})
    // Step 5 : Close the connection
    await Connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
});

app.delete("/user/:id",async function (req, res) {
  try {
    // step 1 : Create a connection Nodejs and mongodb
    const Connection = await mongoClient.connect(URL);
    // step 2 : Select the db
    const db = Connection.db(DB);
    // step 3 : Select the Collection
    // Step 4 : Do the operation (CRUD);
    const user = await db.collection('Books').findOneAndDelete({_id : new mongodb.ObjectId(req.params.id)})
    // Step 5 : Close the connection
    await Connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
});

app.get("/user", function (req, res) {
  const qparams = req.query;
  const resUser = [];
  for (
    let index = parseInt(req.query.offset);
    index < parseInt(req.query.offset) + parseInt(req.query.limit);
    index++
  ) {
    resUser.push(user[index]);
  }
  res.json(resUser);
});

app.listen(3001);
