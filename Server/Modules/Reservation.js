const schema = require('../Commonquerry');
const Reservation_schema = new schema();

function Reservation() {

    Reservation.prototype.Res_Func = function (req, cbk) {
        const action = req.params.action;
        const self = this;
        console.log(action);
        switch (action) {
            case 'view':
                self.View(req, cbk)
                break;
            case 'viewbyid':
                self.Viewbyid(req, cbk)
                break;
            case 'create':
                self.Create(req, cbk)
                break;
            case 'delete':
                self.Delete(req, cbk)
                break;
            case 'update':
                self.update(req, cbk)
                break;
            default:
                cbk(Status = 'false', err = 'not uploaded')
        }
    }

    Reservation.prototype.View = function (req, cbk) {
        let query = 'select hotel.reservation.*, hotel.room.RoomName, hotel.customer.CustomerFirstName FROM hotel.reservation INNER JOIN hotel.room ON hotel.reservation.Room_id = hotel.room.Room_id INNER JOIN hotel.customer ON hotel.reservation.Customer_id = hotel.customer.Customer_id'
        Reservation_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Reservation.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Reservation SET ? `
        Reservation_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Reservation.prototype.Delete = function (req, cbk) {
        let query = `delete from Reservation where Reservation_id=?`
        Reservation_schema.delete(query, req.body.Reservation_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Reservation.prototype.update = function (req, cbk) {
        console.log(req.body.Reservation_id);
        let Reservation_id = req.body.Reservation_id
        let query = `update  Reservation set ? where Reservation_id=?`
        Reservation_schema.update(query, [req.body, Reservation_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Reservation.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select hotel.reservation.*, hotel.room.RoomName, hotel.customer.CustomerFirstName FROM hotel.reservation INNER JOIN hotel.room ON hotel.reservation.Room_id = hotel.room.Room_id INNER JOIN hotel.customer ON hotel.reservation.Customer_id = hotel.customer.Customer_id where Reservation_id=?`
        Reservation_schema.viewbyid(query, req.body.Reservation_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Reservation;