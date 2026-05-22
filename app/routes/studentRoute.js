const express = require('express')
const StudentController = require('../controller/student/StudentController')


const router = express.Router()


router.post('/create/student',StudentController.createStudent)
router.get('/get/students',StudentController.readStudent)
router.get('/get/student/:id',StudentController.getsingleStudent)
router.put('/update/student/:id',StudentController.updateStudent)
router.delete('/delete/student/:id',StudentController.deleteStudent)

module.exports = router