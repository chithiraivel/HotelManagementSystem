const express = require('express')
const Room_Route = express.Router();
const Room_Func = require('../Modules/Room')
const Room = new Room_Func();

Room_Route.post('/Room/:action', function (req, res) {
    Room.Room_Func(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'message': err })
        }
        else {
            res.json({ 'status': true, 'message': result })
        }
    })  
})
module.exports = Room_Route;