var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "billy",
    password: "Abc12345"
});
var sqlState = -1;
con.connect(function (err) {
    sqlState = err ? 0 : 1
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (sqlState === -1) {
        req.send("Waiting for connection");
        return;
    }
    if (sqlState === 0) {
        req.send("Connect to database fail");
        return;
    }
    con.query("select * from User", function (err, result) {
        if (err) {
            req.send("Connect to database fail");
            return;
        }
        req.send(result);
    });
});

module.exports = router;
