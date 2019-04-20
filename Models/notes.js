const mongoose = require(mongoose);
const Schema = mongoose.Schema
const userNotes = new.Schema({
 title: notes,
 type: string,
 required: ["Take your notes here..."]
});

var Note = mongoose.model("Note", userNotes);
module.exports = Note;

