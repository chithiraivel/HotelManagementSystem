const db = require('./DB/index');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparse = require('body-parser');

app.use(cors());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(bodyparse.json());


const {Employee_Route,Customer_Route,Room_Route,Reservation_Route,Transaction_Route,Reports_Route } = require('./Router/commonRouter')
app.use('/',Employee_Route,Customer_Route,Room_Route,Reservation_Route,Transaction_Route,Reports_Route)

db.connect(function (err, result) {
    if (err) {
        console.log("not connected " +err);
    } else {
        console.log("DataBase Connected.");
    }
});

app.listen(8000, () => {
    console.log('Backend server is Running');
})