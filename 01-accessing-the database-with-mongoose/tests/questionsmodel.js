'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

console.log('Running mongoose version %s', mongoose.version);

mongoose.connect('mongodb://localhost/questions', { useCreateIndex: true, useNewUrlParser: true }, function(err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData();
  //done();
});

const User = require("../models/user");
const Question = require("../models/question");

function createData() {
	
  const userIds = [new ObjectId, new ObjectId, new ObjectId];
  const users = [];
  users.push(
    {
      _id: userIds[0],
      username: 'bob',
      password: '1234',
    }
  );
  users.push(
     {
     	_id: userIds[1],
      username: 'mary',
      password: '1234',
     }
  );  
  User.create(users, function(err) {
      if (err) return done(err);
      const questions = [];
      questions.push({
          data: 'How much computing power could we achieve if the entire world population stopped whatever we are doing right now and started doing calculations?',
          tags: ['Human computer'],
          author: userIds[0]
        }
      );
      questions.push(
        {
          data: 'When -if ever- will the bandwidth of the Internet surpass that of FedEx?',
          tags: ['FedEx Bandwith'],
          author: userIds[0]
        }
      );
      questions.push({
          data: "What country is going to win the Worldcup?",
          tags: ['Football', 'Sports'],
          author: userIds[1]
        }
      );
      questions.push(
        {
          data: "What's the best frontend framework?",
          tags: ['Programming', 'Internet'],
          author: userIds[1]
        }
      );
      Question.create(questions, function(err) {
          if (err) return done(err);
          example();
        }
      );
    }
  );
}

function example() {
  Question
    .find({})
    .populate("author")
    .exec(function(err, questions) {
        		if (err) return done(err);
            console.log(questions);
     			done();
  });
}

function done(err) {
  if (err) console.error(err);
  Question.deleteMany(function() {
  	User.deleteMany(function() {
      mongoose.disconnect();
  	});
  });
}
