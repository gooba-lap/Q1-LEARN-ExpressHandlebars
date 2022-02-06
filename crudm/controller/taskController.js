const express = require('express');

const mongoose = require('mongoose');

const Task = mongoose.model('Task');
// const Task = require('../models/task.model')

const router = express.Router();

router.get("/", (req,res) => {
    res.render("addOrEdit", {
        viewTitle : "Task"
    })
})

router.post("/", (req,res) => {
    if(req.body._id == "")
    {
        insertRecord(req,res);
    }
    else {
        updateRecord(req,res);
    }
})

function insertRecord(req,res)
{
    var task = new Task();

    task.task = req.body.task;

    task.description = req.body.description;

    task.save((err,doc) => {
        if(!err){
            res.redirect('list');
        }
        else{

            if(err.name == "ValidationError"){
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle : "Insert Task",
                    task : req.body
                })
            }

            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req,res)
{
    Task.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err,doc) => {
        if(!err){
            res.redirect('list');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body);
                res.render("addOrEdit", {
                    viewTitle : 'Update Task',
                    task : req.body
                });
            }
            else{
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req,res) => {

    Task.find((err,docs) => {
        if(!err) {
            docs = docs.map(item => item.toObject())

            res.render("list", {
                list:docs
            })
        }
    })
})

// -----------------------------------------------------------------------------------------------

// this > ReferenceError: params is not defined

// router.get('/:id', (req,res) => {
//     Task.findById(req,params.id, (err,doc) => {
//         if(!err){
            
//             res.render("addOrEdit", {
//                 viewTitle : "update Task",
//                 task : doc._doc
//             })
//         }
//     })
// })

router.get('/:id', function(req,res) {
    Task.findById(req.params.id, async (err,doc) => {
        if(!err){
            res.render("addOrEdit" , {
                viewTitle : "Update Task",
                // fix show data from mongoDB > doc > doc._doc
                task : doc._doc
            })
        }
    });
})

// -----------------------------------------------------------------------------------------------

router.get('/delete/:id', (req,res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err);
        }
    })
})



module.exports = router;