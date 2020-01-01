var mongoose = require('mongoose');
const getMoment = require('../functions/clientServerValid.function').getMoment

var Schema = mongoose.Schema;

var SPDSchema = new Schema({
    "_id": String,
    "nomor": Number,
    "reserved": {
        "seksi": {
            'type': String,
            'default': "IPDS"
        },
        "organik_nama": String,
        "seksi": String,
        "isFinal": {
            "type": Boolean,
            "default": false,
        },
        "timestamp": {
            'type': Date,
            'default': Date.now,
        }
    },
    "yang_bepergian": {
        nama: String,
        nip: String,
        pangkat: String,
        gol: String,
        jab: String,
    },
    "tujuan1": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
        tgl_selesai: {
            type: Date,
            set: (d) => (getMoment(d).toDate())
        }
    },
    "tujuan2": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
        tgl_selesai: {
            type: Date,
            set: (d) => (getMoment(d).toDate())
        }
    },
    "tujuan3": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
    },
    "maksud": String,
    "waktu": {
        "berangkat": {
            type: Date,
            set: (d) => (getMoment(d).startOf('day').toDate())
        },
        "kembali": {
            type: Date,
            set: (d) => (getMoment(d).endOf('day').toDate())
        }
    },
    "waktu_kec1_berangkat": Date,
    "waktu_kec2_tiba": Date,
    "tgl_buat_spd": Date,
    "ka_bps": {
        "nama": String,
        "jab": String,
        "_id": String
    },
    "ppk": {
        "nama": String,
        "_id": String
    },
    "kendaraan": String,
    "anggaran": String,
    "image": String,
    "penerima": {
        'type': [{
            "seksi": String,
            "nama": String,
            "maksud": {
                type: String,
                default: 'received'
            },
            "timestamp": {
                'type': Date,
                'default': Date.now
            }
        }],
        'default': []
    },
    "visum": {
        type: String,
        default: 'Responden yang Dikunjungi'
    },
    "visum2": {
        type: String,
        default: 'Tanggal dan Jam Kunjungan'
    },
    "tabel_jlh_baris": {
        type: Number,
        default: 3
    },
    "tabel_jlh_halaman": {
        type: Number,
        default: 1
    },
    'pages': [Number],
    'komponen': {
        type: String,
        ref: 'Komponen'
    },
    "sumber_anggaran": {
        'type': String,
        'default': "kab"
    },
    'kode_anggaran': {
        program: {
            type: String,
            default: ''
        },
        kegiatan: {
            type: String,
            default: ''
        },
        output: {
            type: String,
            default: ''
        },
        komponen: {
            type: String,
            default: ''
        }
    },
    'target': {
        jumlah: Number,
        satuan: String
    },
    "progress": [{
        time: Date,
        timestamp: Date,
        jumlah: {
            type: Number,
            default: 0
        },
        catatan: {
            jenis: [],
            text: String
        },
        bukti_foto: []

    }],
    "kinerja": {
        realisasi: {
            type: Number,
            default: 100
        },
        ketepatan: {
            type: Number,
            default: 100
        },
        kualitas: {
            type: Number,
            default: 100
        },
        kesungguhan: {
            type: Number,
            default: 100
        },
        administrasi: {
            type: Number,
            default: 100
        },
        realisasi_c: String,
        ketepatan_c: String,
        kualitas_c: String,
        kesungguhan_c: String,
        administrasi_c: String,
    },
    "kinerja_committed": {
        type: Boolean,
        default: false
    },
    "kinerja_approved": {
        type: Boolean,
        default: false
    },
    "isSudahDibayar": {
        type: Boolean,
        default: false
    },
    "isSudahBuatRekap": {
        type: Boolean,
        default: false
    },
    "jenis_spd": {
        type: String,
        default: 'biasa'
    },
    "dasar": String,
    "anggota": [],
    "untuk": String,
    "no_ka": {
        type: Boolean,
        default: false
    }
}, { collection: 'spd' });

module.exports = mongoose.model('SPD', SPDSchema);