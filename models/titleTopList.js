/**
 * Created by HAL3000 on 11-02-17.
 */
var mongoose = require("mongoose");

var topListSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    date: String,
    lists:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
});

module.exports = mongoose.model("topListSchema", topListSchema);