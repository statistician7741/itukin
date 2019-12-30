var mongoose = require('mongoose');
const crypto = require('crypto');

var Schema = mongoose.Schema;

var OrganikSchema = new Schema({
    "_id": String,
    "username": String,
    "password": {
        type: String,
        set: (pass)=>(crypto.createHmac('sha256', pass).digest('hex'))
    },
    "niplama": String,
    "nama" : String,
    "pangkat": {
        type: String,
        default: 'Penata Muda'
    },
    "nmjab" : String,
    "nmgol" : String,
    "kendaraan": {
        type: String,
        default: 'Motor Dinas'
    },
    "pensiun": {
    	type: Boolean,
    	default: false
    },
    "pindah": {
    	type: Boolean,
    	default: false
    },
    "isProv": {
    	type: Boolean,
    	default: false
    },
    "tl": [{
        _id: String,
        absensi_committed: {
            type: Boolean,
            default: false
        },
        tl1: {
            type: Number,
            default: 0
        },
        tl2: {
            type: Number,
            default: 0
        },
        tl3: {
            type: Number,
            default: 0
        },
        tl4: {
            type: Number,
            default: 0
        },
    }],
    "psw": [{
        _id: String,
        absensi_committed: {
            type: Boolean,
            default: false
        },
        psw1: {
            type: Number,
            default: 0
        },
        psw2: {
            type: Number,
            default: 0
        },
        psw3: {
            type: Number,
            default: 0
        },
        psw4: {
            type: Number,
            default: 0
        }
    }],
    "daily_cuti": [{
        _id: String,
        d_c_committed: {
            type: Boolean,
            default: false,
        },
        daily: {
            type: Number,
            default: 0
        },
        cb: {
            type: Number,
            default: 0
        },
        cp: {
            type: Number,
            default: 0
        },
        cm: {
            type: Number,
            default: 0
        },
        cs: {
            type: Number,
            default: 0
        },
        ct: {
            type: Number,
            default: 0
        }
    }]
}, { collection: 'organik' });

module.exports = mongoose.model('Organik', OrganikSchema);