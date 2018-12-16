var mongoose = require("mongoose");

var corridaSchema = mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    pontos: {type: Number, required: true},
    fase: {type: String},
    cliente: {type: Schema.Types.ObjectId, ref: 'User'},
    motorista: {type: Schema.Types.ObjectId, ref: 'User'},
    logista: {type: Schema.Types.ObjectId, ref: 'User'}
});

//===================================================
// Attaches the schema to the model
//===================================================
var Corrida = mongoose.model("Corrida", corridaSchema);
module.exports = Corrida;
