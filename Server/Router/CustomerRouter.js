const express = require('express')
const Customer_Route = express.Router();
const Cus_Func = require('../Modules/Customer')
const Customer = new Cus_Func();

Customer_Route.post('/Customer/:action', function (req, res) {
    Customer.Cus_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Customer_Route;