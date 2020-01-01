const Program = require('../../models/program.model');
const _ = require('lodash')

function applyToClient(client) {
    client.on('api.socket.pok/s/getTahunAnggaran', (cb) => {
        Program.find({}).distinct('tahun_anggaran', (error, ta_arr) => {
            let tahun_anggaran = _.orderBy(ta_arr);
            if (!ta_arr.length) {
                tahun_anggaran = [new Date().getFullYear()];
            } else {
                tahun_anggaran.push(tahun_anggaran[tahun_anggaran.length - 1] + 1)
            }
            cb({ type: 200, data: tahun_anggaran })
        })
    });
}

module.exports = applyToClient