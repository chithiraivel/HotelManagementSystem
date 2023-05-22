const schema = require('../Commonquerry');
const Room_schema = new schema();

function Room() {

    Room.prototype.Room_Func = function (req, cbk) {
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

    Room.prototype.View = function (req, cbk) {
        let query = 'select * from Room'
        Room_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Room.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Room SET ? `
        Room_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Room.prototype.Delete = function (req, cbk) {
        let query = `delete from Room where Room_id=?`
        Room_schema.delete(query, req.body.Room_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Room.prototype.update = function (req, cbk) {
        console.log(req.body.Room_id);
        let Room_id = req.body.Room_id
        let query = `update  Room set ? where Room_id=?`
        Room_schema.update(query, [req.body, Room_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Room.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.Room where Room_id=?`
        Room_schema.viewbyid(query, req.body.Room_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Room;