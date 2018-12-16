var mongoose = require("mongoose");

var premioSchema = mongoose.Schema({
    name: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    logista: {type: Schema.Types.ObjectId, ref: 'User'},
    pontos: {type: Number}
});

//===================================================
// Attaches the schema to the model
//===================================================
var Premio = mongoose.model("Premio", premioSchema);
module.exports = Premio;
