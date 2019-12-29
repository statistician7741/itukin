const moment = require('moment');
const SPD = require('../../../models/spd.model');
const Organik = require('../../../models/organik.model');

module.exports = (query, cb) => {
    const _id = `${query.tahun}_${query.month}`
    Organik.updateMany({
        'isProv': false,
        '$and': [
            { pensiun: false },
            { pindah: false }
        ],
        'tl._id': {
            $nin: [_id]
        }
    }, {
        $push: {
            tl: {
                _id,
                absensi_committed: false,
                tl1: 0,
                tl2: 0,
                tl3: 0,
                tl4: 0
            },
            psw: {
                _id,
                absensi_committed: false,
                psw1: 0,
                psw2: 0,
                psw3: 0,
                psw4: 0
            },
            daily_cuti: {
                _id,
                d_c_committed: false,
                daily: 0,
                cuti: 0
            }
        }
    }, (e, r) => {
        Organik.aggregate([
            { $unwind: "$tl" },
            { $unwind: "$psw" },
            { $unwind: "$daily_cuti" },
            {
                $match: {
                    "tl._id": _id,
                    "psw._id": _id,
                    "daily_cuti._id": _id,
                    'isProv': false,
                    "nmjab": { $not: /Kepala BPS|Kepala Badan Pusat/ },
                    '$and': [
                        { pensiun: false },
                        { pindah: false }
                    ]

                }
            }
        ]).sort('nama').exec((e, semua_organik) => {
            if (e) {
                console.log(e);
                cb({ type: 'error', data: "Gagal mengambil data Organik. Mohon hubungi admin." });
            } else {
                cb({ type: 200, data: { semua_organik, length: semua_organik.length } });
            }
        })
        // Organik.find({
        //     isProv: false,
        //     $and: [
        //         { pensiun: false },
        //         { pindah: false }
        //     ]
        // }).sort('nama').exec((e, semua_organik) => {
        //     if (e) {
        //         console.log(e);
        //         cb({ type: 'error', data: "Gagal mengambil data Organik. Mohon hubungi admin." });
        //     } else {
        //         cb({ type: 200, data: { semua_organik, length: semua_organik.length } });
        //     }
        // })
    })
}