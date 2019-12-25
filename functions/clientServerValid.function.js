const moment = require('moment');
moment.locale('id')
const config = require('../config/env.config')

module.exports = {
  getReadableKec: (kec_string) => {
    return `${/Kota|Kec/.test(kec_string) ? '' : 'Kec. '}${kec_string}`;
  },
  getNomorSPD: (spd) => {
    if (!spd) return '-'
    return spd.nomor ? `${spd.nomor}/${config.kode_kab}1/${moment(spd.tgl_buat_spd).format('MM')}/${moment(spd.tgl_buat_spd).format('YYYY')}` : '-';
  },
  safeQuery: (q) => {
    if (typeof q === 'string') return q.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")
    else return q
  },
  getMoment: (d) => {
    return moment.isMoment(d) ? d : (/\d{2}\/\d{2}\/\d{4}/.test(d) ? moment(d, 'DD/MM/YYYY') : (d ? moment(d) : undefined))
  },
  getDateRange: (waktu) => {
    if (moment(waktu.kembali).diff(moment(waktu.berangkat), 'days') < 1) {
      return moment(waktu.berangkat).format('DD MMMM YYYY')
    } else if (moment(waktu.kembali).month() === moment(waktu.berangkat).month()) {
      return `${moment(waktu.berangkat).format('DD')} - ${moment(waktu.kembali).format('DD MMMM YYYY')}`
    } else {
      return `${moment(waktu.berangkat).format('DD MMMM YYYY')} s/d ${moment(waktu.kembali).format('DD MMMM YYYY')}`
    }
  },
  setTujuanInput: (record) => {
    let tujuan_input = []
    if (record.tujuan1) record.tujuan1.lokasi && tujuan_input.push(record.tujuan1.lokasi.kec.nama)
    if (record.tujuan2) record.tujuan2.lokasi && tujuan_input.push(record.tujuan2.lokasi.kec.nama)
    if (record.tujuan3) record.tujuan3.lokasi && tujuan_input.push(record.tujuan3.lokasi.kec.nama)
    return tujuan_input.join(', ')
  },
  formatUang: (angka) => {
    let number_string = angka.toString()
    number_string = number_string.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah
  },
  getTerbilang: (bilangan) => {
    bilangan = String(bilangan);
    var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
    var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

    var panjang_bilangan = bilangan.length;

    /* pengujian panjang bilangan */
    if (panjang_bilangan > 15) {
      kaLimat = "Diluar Batas";
      return kaLimat;
    }

    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-(i), 1);
    }

    i = 1;
    j = 0;
    kaLimat = "";


    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {

      subkaLimat = "";
      kata1 = "";
      kata2 = "";
      kata3 = "";

      /* untuk Ratusan */
      if (angka[i + 2] != "0") {
        if (angka[i + 2] == "1") {
          kata1 = "Seratus";
        } else {
          kata1 = kata[angka[i + 2]] + " Ratus";
        }
      }

      /* untuk Puluhan atau Belasan */
      if (angka[i + 1] != "0") {
        if (angka[i + 1] == "1") {
          if (angka[i] == "0") {
            kata2 = "Sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "Sebelas";
          } else {
            kata2 = kata[angka[i]] + " Belas";
          }
        } else {
          kata2 = kata[angka[i + 1]] + " Puluh";
        }
      }

      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i + 1] != "1") {
          kata3 = kata[angka[i]];
        }
      }

      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
      }

      /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;

    }

    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if ((angka[5] == "0") && (angka[6] == "0")) {
      kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
    }
    kaLimat = kaLimat.replace(/\s+/g, " ") + "Rupiah";

    return kaLimat.replace(/^\s/g, "");
  }
}