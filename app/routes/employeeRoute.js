const express = require('express')
const router=express.Router();
const EmployeeController = require('../../app/controller/employee/EmployeeController')
const validate = require('../../app/middleware/validate')
const employeeValidate = require('../../app/utils/employeeValidate')

router.post('/create/employee',validate(employeeValidate),EmployeeController.createEmployee)

module.exports = router