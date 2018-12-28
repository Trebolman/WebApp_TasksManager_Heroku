'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var Usuario = require("../modelos/Usuario");
var Task = require("../modelos/Task");
// crearemos con su controlador
var controller = {
    register: function(req, res){
      console.log(req.body.username);
      console.log(req.body.email);
      
      var user = new Usuario();
      user.username = req.body.username;
      user.email = req.body.email;
      user.setPassword(req.body.password);

      var task = new Task();
      task.username = req.body.username;
      task.tasks.name = '';
      task.tasks.description = '';
      task.tasks.state = ''

      user.save((err,usuarioRegistrado)=>{
        task.save((err)=>{
          if(err){
            console.log(err);
          }
          // res.status(200);
          // res.json({
          //   "token" : token,
          //   "task" : res
          // });
        });
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
        "token" : token
        });
      
    });

    },

    login: function(req, res){
        passport.authenticate('local', function(err, user, info){
            var token;
        
            // If Passport throws/catches an error
            if (err) {
              res.status(404).json(err);
              return;
            }
        
            // If a user is found
            if(user){
              token = user.generateJwt();
              res.status(200);
              res.json({
                "token" : token
              });
            } else {
              // If user is not found
              res.status(401).json(info);
            }
          })(req, res);
    },

    testUsername: function(req,res){
      Usuario.findOne({username:req.body.username},(err,usuario)=>{
          if(err){
            return res.status(500).send({Error: "Error 500 probar username"});
          }
          if(usuario){
            return res.status(200).send({disponible: false});

          }else{
            console.log("[testUsername|findOne] usuarioEncontrado:");
            console.log(usuario);
            return res.status(200).send({disponible: true});

          }
        })
    },

    readPerfil: function(req,res){
        if (!req.payload._id) {
            res.status(401).json({
              "message" : "UnauthorizedError: private profile"
            });
          } else {
            User
              .findById(req.payload._id)
              .exec(function(err, user) {
                res.status(200).json(user);
              });
          }
    }
}

module.exports = controller;