const express = require('express')
const Reservation_Route = express.Router();
const Res_Func = require('../Modules/Reservation')
const Reservation = new Res_Func();

Reservation_Route.post('/Reservation/:action', function (req, res) {
    Reservation.Res_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })
})
module.exports = Reservation_Route;