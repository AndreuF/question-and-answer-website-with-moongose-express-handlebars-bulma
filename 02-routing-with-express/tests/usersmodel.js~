'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('Running mongoose version %s', mongoose.version);

mongoose.connect('mongodb://localhost/questions', { useCreateIndex: true, useNewUrlParser: true }, function(err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData();
  //done();
});

const User = require("../models/user");

function createData() {
  const users = [];
  users.push(
    {
      username: 'mickey',
      password: '1234',
      displayName: 'Mickey',
      bio: 'I am a teacher'
    }
  );
  users.push(
     {
      username: 'minnie',
      password: '1234',
      displayName: 'Minnie',
      bio: 'I am a teacher too'
     }
  );
  User.create(users, function(err) {
        if (err) return done(err);
        example();
    }
  );
}

function example() {
  User
    .find({})
    .lean() // just return plain objects, not documents wrapped by mongoose
    .exec(function(err, users) {
      if (err) return done(err);
      console.log(users);
      done();
    });
}

function done(err) {
  if (err) console.error(err);
  User.deleteMany(function() {
      mongoose.disconnect();
  });
}
