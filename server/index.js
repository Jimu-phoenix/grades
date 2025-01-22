const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Student')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://phoenix:rnC4snDcNnJMB76l@cluster0.j6sx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


app.get("/", (req, res) => {
    StudentModel.find({})
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.post("/create", (req, res) => {
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) => {
    StudentModel.findById(req.params.id)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const id = req.params.id
    StudentModel.findByIdAndUpdate({_id: id}, {
        name: req.body.studentname,
        math: req.body.math,
        eng: req.body.eng,
        chich: req.body.chich,
        ps: req.body.ps,
        arts: req.body.arts,
        social: req.body.social,
        total: req.body.total

    })
    .then(students => res.json(students))
    .catch(err => res.json(err))
    
})
app.delete("/deleteStudent/:id", (req, res) => {
    const id = req.params.id
    StudentModel.findByIdAndDelete({_id: id})
    .then(students => res.json(students))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log('Server started')
})