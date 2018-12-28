'use strinc'
var mongoose = require('mongoose');
var TaskSchema = mongoose.Schema(
    {
        username:String,
        tasks:
        [
            {
                name:String, 
                description:String, 
                state:String
            }
        ]
    }
);

TaskSchema.methods.add = function(){
    
}

module.exports = mongoose.model('Task',TaskSchema);
