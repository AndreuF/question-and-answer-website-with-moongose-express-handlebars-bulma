var express = require("express");
var passport = require("passport");
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = require("./models/user");
var Question = require("./models/question");
var Response = require("./models/response");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
  }
}

router.use(function(req, res, next) {
  //some sessions variables
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/questions", function(req, res, next) {
  Question
    .find()
    .sort({
      createdAt: "descending"
    })
    .populate("author")
    .exec(function(err, questions) {
      if (err) {
        return next(err);
      }
      //res.send("You're watching a list of questions");
      res.render("questions", {
        questions: questions
      });
    });
});

router.get("/", function(req, res, next) {
  User.find()
    .sort({
      createdAt: "descending"
    })
    .exec(function(err, users) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        users: users
      });
    });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }, function(err, user) {

    if (err) {
      return next(err);
    }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);

  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
  User.findOne({
    username: req.params.username
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("profile", {
      user: user
    });
  });
});

router.get("/questions/:questionid", function(req, res, next) {
  if (!ObjectId.isValid(req.params.questionid)) return next(404);
  //This queries are async. The code has to be changed
  //This code needs improvement with promises, async, etc.
  Question
    .findOne({
      _id: req.params.questionid
    })
    .exec(function(err, question) {
      if (err) return next(err);
      if (!question) return next(404);
      Response
        .find({
          question: req.params.questionid
        })
        .sort({ createdAt: "descending" })
        .populate("author")
        .populate("question")
        .exec(function(err, responses) {
          if (err) return next(err);
          //res.send("You are watching a question title");
          res.render("question", {
            question: question,
            responses: responses
          });
        });
    });
});

router.get("/edit", ensureAuthenticated, function(req, res) {
  res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
  req.user.displayName = req.body.displayName;
  req.user.bio = req.body.bio;
  req.user.save(function(err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});

module.exports = router;
