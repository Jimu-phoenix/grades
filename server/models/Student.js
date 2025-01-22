const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    studentname: String,
    indexnum: Number,
    math: Number,
    eng: Number,
    ps: Number,
    chich: Number,
    arts: Number,
    social: Number,
    total: Number,
})

const StudentModel = mongoose.model("grades", StudentSchema)

module.exports = StudentModel