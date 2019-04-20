const express = require("express");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const axios = require("axios");

const app = express();
const databaseUrl ="truCrime";
const collections =  ["truCrime"];
// var db = mongojs(databaseUrl, collections);

app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// // Connect to the Mongo DB
mongoose.connect("mongodb://localhost/truCrime", { useNewUrlParser: true });
const db= mongoose.connection;
db.on("error", function(error){
    console.log("Database Error: error");
});
db.once("open", ( )=> {
    console.log("Mongod connected")
})

app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// // Routes
app.get("/", function( req, res){
console.log("yoyo");
})

// Start the server
app.listen(PORT, ()=> {
  console.log("App running on port " + PORT + "!");
});
