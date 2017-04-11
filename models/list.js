/**
 * Created by HAL3000 on 11-02-17.
 */

var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({

    position: Number,
    posTitle: String,
    posImage: String,
    posDescription: String,
    author: String

});

module.exports = mongoose.model("List", listSchema);