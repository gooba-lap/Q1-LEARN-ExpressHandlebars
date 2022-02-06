const mongoose = require('mongoose');
// for change
const url = "mongodb+srv://admin:8A6BNUEVk7GZvF5u@cluster0.wydy7.mongodb.net/task";

mongoose.connect(url, {useNewUrlParser:true}, (err) => {
    if(!err) { console.log("MongoDB Connection Succeeded") ; }
    else{
        console.log("An Error Occured");
    }
})

require('./task.model');

//8A6BNUEVk7GZvF5u