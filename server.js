const express = require("express");
const cheerio = require("cheerio");
const logger= require("morgan");
const bodyParser= require ("body-parser");
const request = require ('request');
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
//const mongojs = require("mongojs");


const app = express();

const databaseUrl ="truCrime";
const collections =  ["truCrime"];
// var db = mongojs(databaseUrl, collections);

app.use(express.static(process.cwd() + "/public"));

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);


// // Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/truecrime";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Mongod Connected!");
});




app.engine("handlebars", exphbs({
    defaultLayout: "main"
})
);
app.set("view engine", "handlebars");

// // Routes
const routes= require("./Controller/controller.js");
app.use("/", routes);

//app.get("/", function( req, res){
//res.render("index");
//})

// Start the server
app.listen(PORT, ()=> {
  console.log("App running on port " + PORT + "!");
});
