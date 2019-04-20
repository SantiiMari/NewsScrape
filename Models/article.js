const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.export = mongoose.model(
    "Artile",
    new Schema({
        title:{
            type: String,
            required: true
        },
        saved: {
            type: Boolean,
            required: true,
        }
    })
)