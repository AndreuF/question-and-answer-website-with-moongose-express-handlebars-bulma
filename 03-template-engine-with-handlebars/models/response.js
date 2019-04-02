
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;
var User = require("./user")
var Question = require("./question")

var responseSchema = mongoose.Schema({
	data: String,
	question: { type: Schema.ObjectId, ref: Question },
	author: { type: Schema.ObjectId, ref: User },
   createdAt: { type: Date, default: Date.now },
});

var Response = mongoose.model("Response", responseSchema);

module.exports = Response;
