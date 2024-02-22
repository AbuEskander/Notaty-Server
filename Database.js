const mongoose = require("mongoose");
const Note = require("./schemas/note");
const { query } = require("express");

class Database {
  constructor() {
    this.Url = "mongodb://127.0.0.1:27017/notaty";
  }
  connect() {
    mongoose
      .connect(this.Url)
      .then(() => {
        console.log("Database has been connected Successfully");
      })
      .catch((err) => console.log("Error in connecting " + err));
  }
  addNote(note) {
    return new Promise((resolve, reject) => {
      note["createdDate"] = new Date();
      note["updatedDate"] = new Date();

      let newNote = Note(note);
      newNote
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNotes() {
    return new Promise((resolve, reject) => {
      Note.find({})
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
  getOneNote(id) {
    return new Promise((resolve, reject) => {
      Note.findById(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateNote(note) {
    return new Promise((resolve, reject) => {
      note["updatedDate"] = new Date();
      Note.findByIdAndUpdate(note["_id"], note)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  deleteNote(id) {
    return new Promise((resolve, reject) => {
      Note.findByIdAndDelete(id)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  getNoteByTitle(title) {
    return new Promise((resolve, reject) => {
      const query = { title: { $regex: new RegExp(title, "i") } };
      Note.find(query)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = Database;
