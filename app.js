// archivo de partida
'use strict';
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

// Require passport
var passport = require('passport');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');

var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(passport.initialize());

// inicializando un objeto express
var rutasAgenda = require('./Rutas/rutas');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/api/',rutasAgenda); 

const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise; //global pertenece al kernel de NodeJS
// mongoose.connect('mongodb://localhost:27017/Agenda')
// mongoose.connect('mongodb://user:usuario1@ds151508.mlab.com:51508/db_its-tasks-manager')
mongoose.connect('mongodb://user:usuario1@ds119113.mlab.com:19113/db-its')
.then(()=>{
    console.log("Conexion a la base de datos 'Agenda' exitosa");
    app.set('port', PORT);
    
    // app.use(express.static(path.join(__dirname, 'dist')));
    app.listen(app.get('port'),()=>{ // listen es propio de express
        console.log(`El servidor corriendo correctamente: Puerto => ${app.get('port')}`);
    });
}).catch(error=>{
    console.log(error);
});

module.exports = app;