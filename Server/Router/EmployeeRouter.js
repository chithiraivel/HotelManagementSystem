const express = require('express')
const Employee_Route = express.Router();
const Emp_Func = require('../Modules/Employee')
const Employee = new Emp_Func();

Employee_Route.post('/Employee/:action', function (req, res) {
    Employee.Emp_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Employee_Route;