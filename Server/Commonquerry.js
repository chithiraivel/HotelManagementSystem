const db = require('./DB/index');

const common = function () {
    this.table = db;
};

common.prototype.Retrive = function (query, cbk) {
    var self = this;
    self.table.query(query, (err, result) => {
        if (err) {
            cbk({ 'status': false, 'message': err })

        } else {
            cbk({ 'status': true, 'message': result })
        }
    });
};

common.prototype.create = function (query, body, cbk) {

    var self = this;
    self.table.query(query, body, function (err, result) {

        if (err) {
            cbk({ 'status': false, 'message': err })

        } else {
            cbk({ 'status': true, 'message': result })

        }
    });
};



common.prototype.delete = function (query, id, cbk) {
    // console.log(id);
    var self = this;
    self.table.query(query, id, function (err, result) {
        if (err) {
            cbk({ 'status': false, 'message': err })


        } else {
            cbk({ 'status': true, 'message': result })
        }
    });
};

common.prototype.update = function (query, content, id, cbk) {
    var self = this;
    self.table.query(query, content, id, function (err, result) {
        console.log(result);
        if (err) {
            cbk({ 'status': false, 'message': err })

        } else {
            console.log(result);
            cbk({ 'status': true, 'message': result })
        }
    });
};

common.prototype.viewbyid = function (query, id, cbk) {
    var self = this;
    self.table.query(query, id, function (err, result) {
        if (err) {
            cbk({ 'status': false, 'message': err })

        } else {
            cbk({ 'status': true, 'message': result })
        }
    });
};

module.exports = common;