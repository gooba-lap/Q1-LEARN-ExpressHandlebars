const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    task : {
        type:String
    },
    description:{
        type:String
    }
})

mongoose.model('Task',taskSchema);

// module.exports = mongoose.model('Task',taskSchema);