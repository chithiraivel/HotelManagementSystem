const schema = require('../Commonquerry');
const Reports_schema = new schema();

function Reports() {

    Reports.prototype.Rep_Func = function (req, cbk) {
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

    Reports.prototype.View = function (req, cbk) {
        let query = 'select * from Reports'
        Reports_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Reports.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Reports SET ? `
        Reports_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Reports.prototype.Delete = function (req, cbk) {
        let query = `delete from Reports where Reports_id=?`
        Reports_schema.delete(query, req.body.Reports_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Reports.prototype.update = function (req, cbk) {
        console.log(req.body.Reports_id);
        let Reports_id = req.body.Reports_id
        let query = `update  Reports set ? where Reports_id=?`
        Reports_schema.update(query, [req.body, Reports_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Reports.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.Reports where Reports_id=?`
        Reports_schema.viewbyid(query, req.body.Reports_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Reports;