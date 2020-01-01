var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProgramSchema = new Schema({
    "_id": String,
    "kode": String,
    "uraian": String,
    "tahun_anggaran": Number
}, { collection: 'program' });

module.exports = mongoose.model('Program', ProgramSchema);