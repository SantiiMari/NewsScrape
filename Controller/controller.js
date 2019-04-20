const express = require("express");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const axios = require("axios");

let router = express.Router();

router.get('/', function (req, res){
    res.redirect("/articles");
});

router.get("/scrape", function (req, res){
    request("http://truecrimeguy.com/", function (err, response, html){
        let $= cheerio.load(html);
    })
})