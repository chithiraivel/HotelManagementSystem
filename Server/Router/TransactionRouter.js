const express = require('express')
const Transaction_Route = express.Router();
const Transaction_Func = require('../Modules/Transaction')
const Transaction = new Transaction_Func();

Transaction_Route.post('/Transaction/:action', function (req, res) {
    Transaction.Transaction_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })  
})
module.exports = Transaction_Route;