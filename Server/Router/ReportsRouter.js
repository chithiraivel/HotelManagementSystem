const express = require('express')
const Reports_Route = express.Router();
const Rep_Func = require('../Modules/Reports')
const Reports = new Rep_Func();

Reports_Route.post('/Reports/:action', function (req, res) {
    Reports.Rep_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Reports_Route;