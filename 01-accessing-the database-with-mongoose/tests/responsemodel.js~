'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

console.log('Running mongoose version %s', mongoose.version);

mongoose.connect('mongodb://localhost/questions', {
  useCreateIndex: true,
  useNewUrlParser: true
}, function(err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData();
  //done();
});

const User = require("../models/user");
const Question = require("../models/question");
const Response = require("../models/response");

var questionId = "";

function createData() {

  const userIds = [new ObjectId, new ObjectId, new ObjectId, new ObjectId];
  const users = [];
  users.push({
    _id: userIds[0],
    username: 'emma',
    password: '1234',
    displayName: "Emma",
    bio: "I am a teacher"
  });
  users.push({
    _id: userIds[1],
    username: 'marie',
    password: '1234',
    displayName: "Marie",
    bio: "I am a teacher"
  });
  users.push({
    _id: userIds[2],
    username: 'andrew',
    password: '1234',
    displayName: "Andrew",
    bio: "I am a teacher"
  });
  users.push({
    _id: userIds[3],
    username: 'charles',
    password: '1234',
    displayName: "Charles",
    bio: "I am a teacher"
  });
  User.create(users, function(err) {
    if (err) return done(err);
    const questionIds = [new ObjectId, new ObjectId, new ObjectId, new ObjectId];
    const questions = [];
    questions.push({
      _id: questionIds[0],
      data: 'How much computing power could we could achieve if the entire world population stopped whatever we are doing right now and started doing calculations?',
      tags: ['Human computer'],
      author: userIds[0]
    });
    questions.push({
      _id: questionIds[1],
      data: 'If every person on Earth aimed a laser pointer at the Moon at the same time, would it change color?',
      tags: ['Laser pointer'],
      author: userIds[1]
    });
    questions.push({
      _id: questionIds[2],
      data: 'What would happen if a hair dryer were turned on and put in an airtight 1x1x1-meter box?',
      tags: ['Hair dryer'],
      author: userIds[2]
    });
    questions.push({
      _id: questionIds[3],
      data: 'When -if ever- will the bandwidth of the Internet surpass that of FedEx?',
      tags: ['FedEx Bandwith'],
      author: userIds[3]
    });
    Question.create(questions, function(err) {
      if (err) return done(err);
      const responses = [];
      responses.push({
        data: 'I don\'t know',
        author: userIds[1],
        question: questionIds[0]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[2],
        question: questionIds[0]
      });
      responses.push({
        data: "It's not very clever to ask that",
        author: userIds[3],
        question: questionIds[0]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[0],
        question: questionIds[1]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[1],
        question: questionIds[1]
      });
      responses.push({
        data: "It's not very clever to ask that",
        author: userIds[2],
        question: questionIds[1]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[0],
        question: questionIds[2]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[1],
        question: questionIds[2]
      });
      responses.push({
        data: "It's not very clever to ask that",
        author: userIds[3],
        question: questionIds[2]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[0],
        question: questionIds[3]
      });
      responses.push({
        data: 'I don\'t know',
        author: userIds[1],
        question: questionIds[3]
      });
      responses.push({
        data: "It's not very clever to ask that",
        author: userIds[2],
        question: questionIds[3]
      });
      Response.create(responses, function(err) {
        if (err) return done(err);
        example();
      });
    });
  });
}

function example() {
  Response
    .find({})
    .populate("author")
    .populate("question")
    .exec(function(err, responses) {
      if (err) return done(err);
      console.log(responses);
      //Umcomment to initialize the database
      //done();
    });
}

function done(err) {
  if (err) console.error(err);
  Response.deleteMany(function() {
    Question.deleteMany(function() {
      User.deleteMany(function() {
        mongoose.disconnect();
      });
    });
  });
}
