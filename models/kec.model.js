var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var KecSchema = new Schema({
    "_id": String,
    "kec": {
        'kode': String,
        'nama': String
    },
    "kab": {
        'kode': String,
        'nama': String
    },
    "waktu_tempuh": Number
}, { collection: 'kec' });

module.exports = mongoose.model('Kec', KecSchema);