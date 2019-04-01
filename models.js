"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// this is our schema to represent a restaurant
const blogPostSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { firstName: String, lastName: String },
  content: { type: String },
  created: { type: Date, default: Date.now }
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
blogPostSchema.virtual("authorString").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.authorString,
    content: this.content,
    created: this.created
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = { BlogPost };