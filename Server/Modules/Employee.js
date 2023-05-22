const schema = require('../Commonquerry');
const Employee_schema = new schema();

function Employee() {

    Employee.prototype.Emp_Func = function (req, cbk) {
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

    Employee.prototype.View = function (req, cbk) {
        let query = 'select * from Employee'
        Employee_schema.Retrive(query, (err, result) => {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Employee.prototype.Create = function (req, cbk) {
        var query = `INSERT INTO Employee SET ? `
        Employee_schema.create(query, req.body, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            } else {
                cbk({ 'status': true, 'message': result })
                console.log(result);
            }
        });
    };

    Employee.prototype.Delete = function (req, cbk) {
        let query = `delete from Employee where Employee_id=?`
        Employee_schema.delete(query, req.body.Employee_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }

    Employee.prototype.update = function (req, cbk) {
        console.log(req.body.Employee_id);
        let Employee_id = req.body.Employee_id
        let query = `update  Employee set ? where Employee_id=?`
        Employee_schema.update(query, [req.body, Employee_id], function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
    Employee.prototype.Viewbyid = function (req, cbk) {
        console.log(req.body);
        let query = `select * from hotel.Employee where Employee_id=?`
        Employee_schema.viewbyid(query, req.body.Employee_id, function (err, result) {
            if (err) {
                cbk({ 'status': false, 'message': err })
            }
            else {
                cbk({ 'status': true, 'message': result })
            }
        })
    }
}

module.exports = Employee;