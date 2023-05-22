const schema = require('../Commonquerry');
const Transaction_schema = new schema();

function Transaction() {

    Transaction.prototype.Transaction_Func = function (req, cbk) {
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

    Transaction.prototype.View = function (req, cbk) {
        let query = 'select * from Transaction'
        Transaction_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Transaction.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Transaction SET ? `
        Transaction_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Transaction.prototype.Delete = function (req, cbk) {
        let query = `delete from Transaction where Transaction_id=?`
        Transaction_schema.delete(query, req.body.Transaction_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Transaction.prototype.update = function (req, cbk) {
        console.log(req.body.Transaction_id);
        let Transaction_id = req.body.Transaction_id
        let query = `update  Transaction set ? where Transaction_id=?`
        Transaction_schema.update(query, [req.body, Transaction_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Transaction.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.Transaction where Transaction_id=?`
        Transaction_schema.viewbyid(query, req.body.Transaction_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Transaction;