const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req,res) => {
    res.render("employee/addOrEdit",{
        viewTitle : "Insert Employee"
    });
});

router.post('/',(req, res) => {
    console.log(req.body);  
    //
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            console.log('Error during record insertion : ' + err);
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                })
            }
        }
    })
}

// ----------------------------------------------------- -----------------------------------------------------

// new

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            //  Solved! Handlebars: Access has been denied to resolve the property "name" 
            //  because it is not an "own property" of its parent Fixed
            docs = docs.map(item => item.toObject())
            // 
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retreieving employee list :' + err);
        }
    })
});

//old

// router.get('/list', (req,res) => {
//     Employee.find((err, docs) => {
//         if (!err) {
//             res.render("employee/list", {
//                 list: docs
//             });
//         }
//         else {
//             console.log('Error in retrienving employee list :' + err);
//         }
//     })
// })

// ----------------------------------------------------- -----------------------------------------------------

function handleValidationError(err,body){
    for(field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;    
                break;
            default:
                break;
        }
    }
};

// -------------------------------------------------------------------------

// this > old > data don't show

// (node:74014) Warning: Accessing non-existent property 'count' of module exports inside circular dependency

// router.get('/:id', (req,res) => {
//     Employee.findById(req.params.id, (err,doc) => {
//         if (!err) {
//             res.render("employee/addOrEdit", { 
//                 viewTitle: "Update Employee",
//                 employee: doc   
//             });
//         }
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(doc)
//         }

//     });
// });

// this fix show data from mongoDB
 
router.get('/:id', function(req,res) {
    Employee.findById(req.params.id, async (err,doc) => {
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc._doc
            })
        }
    })
})

// -------------------------------------------------------------------------

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    })
})


module.exports = router;