const mongoose = require('mongoose');

mongoose.connect(' mongodb+srv://admin:i6OT9stVFlrsU8aX@cluster0.wydy7.mongodb.net/EmployeeDB ', { useNewUrlParser: true }, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');