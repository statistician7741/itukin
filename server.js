//error handling

process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(400, ' Start Error Message: ', err)
  // send email

});

//SIPEDE Server
const express = require('express')
const http = require('http')
const next = require('next')
const socketServer = require('socket.io')

let runServer = () => {
  //https
  var https = require('https');
  var fs = require('fs');
  var privateKey = fs.readFileSync(__dirname + '/cert/www.bpskolaka.com-key.pem', 'utf8');
  var certificate = fs.readFileSync(__dirname + '/cert/www.bpskolaka.com-crt.pem', 'utf8');
  var credentials = { key: privateKey, cert: certificate };

  const port = process.env.PORT || 80
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()

  app.prepare()
    .then(() => {
      const server = express()
      const cookieParser = require("cookie-parser");
      const bodyParser = require("body-parser");
      var session = require('express-session')({
        resave: true,
        saveUninitialized: true,
        secret: "ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="
      });
      var sharedsession = require("express-socket.io-session");
      server.use(session);
      server.use(cookieParser("ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg=="));
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json())
      server.use('/.well-known', express.static(__dirname + '/public/static/.well-known'));

      //socket.io
      const serve = http.createServer(server);

      server.use('/api/login', require("./api/login.api"));

      //cek login, urutan harus di bawah route login

      //Kompresi gzip
      const compression = require('compression');
      server.use(compression());

      server.get('*', (req, res) => {
        return handle(req, res)
      })
      serve.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on https://localhost:${port}`)
      })
      //https
      var httpsServer = https.createServer(credentials, server);
      httpsServer.listen(443);

      const io = socketServer(httpsServer);
      const all_connected_clients = require('./SocketConnections')
      io.use(sharedsession(session, cookieParser("ID==&&%^&A&SHBJSAsjhbJGhUGkbKiUvii^%^#$%^&98G8UIugg==")));
      io.on('connection', function (client) {
        console.log("Hey, someone connected");
        // if (client.handshake.cookies.organik_id) {
        //   if (!all_connected_clients[client.handshake.cookies.organik_id]) {
        //     all_connected_clients[client.handshake.cookies.organik_id] = {}
        //   }
        //   all_connected_clients[client.handshake.cookies.organik_id][client.handshake.cookies.io] = client
        require('./api/socket/penilaian.api.socket')(client, all_connected_clients)
        //   require('./api/socket/maksud.socket.api')(client, all_connected_clients)
        //   require('./api/socket/organik.socket.api')(client, all_connected_clients)
        // require('./api/socket/spd.socket.api')(client, all_connected_clients)
        // }
        // require('./api/socket/pok.socket.api')(client, all_connected_clients)
        client.on('disconnect', () => {
          console.log("Hey, someone disconnected");
          // if (client.handshake.cookies.organik_id) {
          //   console.log('disconnect', client.handshake.cookies.organik_id + '(' + client.handshake.cookies.io + ')' + ' disconnected.');
          //   delete all_connected_clients[client.handshake.cookies.organik_id][client.handshake.cookies.io];
          // }
        })
      })
    })
}

//modul mongodb utk koneksi mongo db database
var url = 'mongodb://127.0.0.1:27017/bps';
var mongoose = require('mongoose');
const { exec } = require('child_process');

let start = () => {
  mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
      exec(`powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c net start MongoDB'"`, (err, stdout, stderr) => {
        console.log('Trying to start MongoDB service...');
        setTimeout(start, 15000)
      })
    } else {
      runServer();
    }
  });
}

start();