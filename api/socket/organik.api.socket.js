const Organik = require('../../models/organik.model');

function applyToClient(client) {
    client.on('api.socket.organik/s/getActiveUser', (cb) => {
        // console.log('api.socket.organik/s/getActiveUser', client.handshake.cookies);
        Organik.findOne({ '_id': client.handshake.cookies.organik_id }).exec((err, result) => {
            if (!err) cb(Object.assign({}, result._doc, { 'tahun_anggaran': client.handshake.cookies.tahun_anggaran, 'seksi': client.handshake.cookies.seksi }))
            else cb({});
        })
    });
}

module.exports = applyToClient