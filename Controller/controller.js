// const express = require("express");
// const cheerio = require("cheerio");
// const exphbs = require("express-handlebars");
// const mongoose = require("mongoose");
// const mongojs = require("mongojs");
// //const axios = require("axios");
// const request = require('request');
// const Article = require("../Models/article.js");
// const Comment = require("../Models/Comment.js");
// // let router = express.Router();

// const router= express.Router();

// request("https://www.washingtonpost.com/news/true-crime/?utm_term=.2bd3316447bd", (error, response, html) => {
//     if (!error && response.statusCode === 200)
//  {
     
//     const $= cheerio.load(html);
//     const storyHeadline = $('.story-headline')
//     console.log(storyHeadline.html())
//  }
// });

// router.get('/', function (req, res){
//     res.redirect("/articles");
// });

// router.get("/scrape", function (req, res){
//     request("https://www.washingtonpost.com/news/true-crime/?utm_term=.2bd3316447bd", function (err, response, html){
//         let $= cheerio.load(html);
//         let titlesArray =[];
//         $('story-body.col-xs-8.col-md-8').each(function(i, element){
//            var results= {};

//            results.title=$(this)
//            .children("a")
//            .text();
//            results.link=$(this)
//            .children("a")
//            .attr("href");
//            if (results.title !=="" && results.link !== ""){
//                if (titlesArray.indexOf(results.title)== -1){
//                   titlesArray.push(result.title);
//                   Article.count({title: result.title}, function( err, test){
//                      if (test ===0){
//                         var entry = new Article(result);
//                         entry.save(function(err, doc){
//                            if (err){
//                               console.log(err);
//                            }else {
//                               console.log(doc);
//                            }
//                         })
//                      }
//                   })
//                }else {
//                      console.log("This article already saved");
//                }
//            }else {
//               console.log("Missing data, no save completed");
//            }
//         });
//         res.redirect("/");
//     });
//    });
//    router.get("/articles", function(req, res){
//       Article.find().sort({_id:-1}).exec(function(err, doc){
//          if (err){
//             console.log(err);
//          } else {
//             const artcl = { article: doc};
//             resp.render("index", artcl)
// ;         }
//       })
//    })

//     router.get("/articles-json", function(req, res) {
//       Article.find({}, function(err, doc) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.json(doc);
//         }
//       });
//     });
    
//     router.get("/clearAll", function(req, res) {
//       Article.remove({}, function(err, doc) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("removed all scrapped articles");
//         }
//       });
//       res.redirect("/articles-json");
//     });
    
//     router.get("/readArticle/:id", function(req, res) {
//       var articleId = req.params.id;
//       var hbsObj = {
//         article: [],
//         body: []
//       };
    
//       Article.findOne({ _id: articleId })
//         .populate("comment")
//         .exec(function(err, doc) {
//           if (err) {
//             console.log("Error: " + err);
//           } else {
//             hbsObj.article = doc;
//             var link = doc.link;
//             request(link, function(error, response, html) {
//               var $ = cheerio.load(html);
    
//               $(".l-col__main").each(function(i, element) {
//                 hbsObj.body = $(this)
//                   .children(".c-entry-content")
//                   .children("p")
//                   .text();
    
//                 res.render("article", hbsObj);
//                 return false;
//               });
//             });
//           }
//         });
//     });
//     router.post("/comment/:id", function(req, res) {
//       var user = req.body.name;
//       var content = req.body.comment;
//       var articleId = req.params.id;
    
//       var commentObj = {
//         name: user,
//         body: content
//       };
    
//       var newComment = new Comment(commentObj);
    
//       newComment.save(function(err, doc) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(doc._id);
//           console.log(articleId);
    
//           Article.findOneAndUpdate(
//             { _id: req.params.id },
//             { $push: { comment: doc._id } },
//             { new: true }
//           ).exec(function(err, doc) {
//             if (err) {
//               console.log(err);
//             } else {
//               res.redirect("/readArticle/" + articleId);
//             }
//           });
//         }
//       });
//     });
    
//     module.exports = router;

// // module.exports= router;



var express = require("express");
var router = express.Router();
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../Models/comment.js");
var Article = require("../Models/article.js");

router.get("/", function(req, res) {
  res.redirect("/articles");
});

router.get("/scrape", function(req, res) {
  request("https://www.washingtonpost.com/news/true-crime/?utm_term=.2bd3316447bd", function(error, response, html) {
    var $ = cheerio.load(html);
    var titlesArray = [];

    $("story-headline").each(function(i, element) {
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      if (result.title !== "" && result.link !== "") {
        if (titlesArray.indexOf(result.title) == -1) {
          titlesArray.push(result.title);

          Article.count({ title: result.title }, function(err, test) {
            if (test === 0) {
              var entry = new Article(result);

              entry.save(function(err, doc) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(doc);
                }
              });
            }
          });
        } else {
          console.log("Article already exists.");
        }
      } else {
        console.log("Not saved to DB, missing data");
      }
    });
    res.redirect("/");
  });
});


router.get("/articles", function(req, res) {
  Article.find()
    .sort({ _id: -1 })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        var artcl = { article: doc };
        res.render("index", artcl);
      }
    });
});

router.get("/articles-json", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

router.get("/clearAll", function(req, res) {
  Article.remove({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed all articles");
    }
  });
  res.redirect("/articles-json");
});

router.get("/readArticle/:id", function(req, res) {
  var articleId = req.params.id;
  var hbsObj = {
    article: [],
    body: []
  };

  Article.findOne({ _id: articleId })
    .populate("comment")
    .exec(function(err, doc) {
      if (err) {
        console.log("Error: " + err);
      } else {
        hbsObj.article = doc;
        var link = doc.link;
        request(link, function(error, response, html) {
          var $ = cheerio.load(html);

          $(".l-col__main").each(function(i, element) {
            hbsObj.body = $(this)
              .children(".c-entry-content")
              .children("p")
              .text();

            res.render("article", hbsObj);
            return false;
          });
        });
      }
    });
});
router.post("/comment/:id", function(req, res) {
  var user = req.body.name;
  var content = req.body.comment;
  var articleId = req.params.id;

  var commentObj = {
    name: user,
    body: content
  };

  var newComment = new Comment(commentObj);

  newComment.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc._id);
      console.log(articleId);

      Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comment: doc._id } },
        { new: true }
      ).exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/readArticle/" + articleId);
        }
      });
    }
  });
});

module.exports = router;