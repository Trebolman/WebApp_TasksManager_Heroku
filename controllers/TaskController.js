'use strict'
var Agenda = require("../modelos/Agenda");
var Task = require('../modelos/Task');
const PORT = process.env.PORT || 3000;
// Creamos el controlador
var controlador = {

    AddTask: function(req, res){
        // console.log("[addTask] req.body:");
        // console.log(req.body);
        var task = {
            name: req.body.name,
            description: req.body.description,
            state: 'Pendiente'
        }
        var query = Task.where({username:req.body.username});
        query.findOne().exec((err, response)=>{
            // console.log("[AddTask] query:");
            // console.log(response);
            
            var taskObject = response;
            // console.log(taskObject);
            
            taskObject.tasks.push(task);
            // console.log(taskObject);
            
            taskObject.save((err, TareaGuardada)=>{
                if(err){
                    return res.status(500).send({Error: "Error 500 al crear agenda"});
                }
                if(!TareaGuardada){
                    return res.status(404).send({Error: "Error 404 al crear agenda"});
                }
                return res.status(200).send(TareaGuardada);
            });
        });

    },

    getTasks: function(req, res){
        // console.log("[getTasks] username: "+req.body.username);
        
        // agenda.find()
        var query = Task.where({username:req.body.username});
        query.findOne().exec((err,task)=>{

            if(err){
                return res.status(500).send({Error: "Error 500 no se pudo cargar agendas"});
            }
            if(!task){
                return res.status(404).send({Error: "Error 404 no se cargaron correctamente agendas"});
            }
            return res.status(200).send(task.tasks);
        });
    },

    editTask: function(req, res){
        console.log("[editTask] data: ");
        var data = 
        {
            username: req.body.username,
            index:  req.body.index,
            name: req.body.name,
            description: req.body.description,
            state: req.body.state
        }
        console.log(data);
        
        var task = 
        {
            name: data.name,
            description: data.description,
            state: data.state
        }
        var taskUser;
        Task.findOne({username:data.username},{},{new:true,upsert:true},(err,response)=>{
            console.log("[editTask|findOne] response:");
            console.log(response);
            
            taskUser = response;
            taskUser.tasks[data.index].name = data.name;
            taskUser.tasks[data.index].description = data.description;
            taskUser.tasks[data.index].state = data.state;


            // var taskUserJSON = JSON.parse(taskUser);
            
            console.log("[editTask|findOne] taskUser:");
            console.log(response);
            
            // Task.update({username:data.username},taskUser,{upsert:true},(err,raw)=>{
            //     if(err){
            //         return res.status(500).send({Error: "Error 500 al crear agenda"});
            //     }
            //     if(!raw){
            //         return res.status(404).send({Error: "Error 404 al crear agenda"});
            //     }
            //     console.log("[editTask|query] tareaActualizada:");
            //     console.log(raw);
            //     return res.status(200).send(raw);
                
            // });
            taskUser.save((err,taskActualizado)=>{
                if(err){
                    return res.status(500).send({Error: "Error 500 al crear agenda"});
                }
                if(!taskActualizado){
                    return res.status(404).send({Error: "Error 404 al crear agenda"});
                }
                console.log("[editTask|query] tareaActualizada:");
                console.log(taskActualizado);
                return res.status(200).send(taskActualizado);
            });  
        });
    },

    getTask: function(req,res){
        Task.findOne({username:req.body.username},(err,response)=>{
            console.log("[getTask|findOne] response:");
            console.log(response);
            return res.status(200).send(response);
        })
    },

    removeTask: function(req, res){
        // console.log(req.body.index);

        var data = {
            index: req.body.index,
            username: req.body.username
        }

        var query = Task.where({username: data.username});
        query.findOne().exec((err, response)=>{
            
            var taskObject = response;
            // console.log(taskObject);
            
            taskObject.tasks.splice(data.index,1);
            // console.log(taskObject);
            
            taskObject.save((err, TareaActualizada)=>{
                if(err){
                    return res.status(500).send({Error: "Error 500 al crear agenda"});
                }
                if(!TareaActualizada){
                    return res.status(404).send({Error: "Error 404 al crear agenda"});
                }
                return res.status(200).send({Task:TareaActualizada});
            });
        });
    }
}

module.exports = controlador;