var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "billy",
    password: "Abc12345"
});
var sqlState = -1;
var error = null;
con.connect(function (err) {
    sqlState = err ? 0 : 1;
    error = err
});
/* GET home page. */
router.get('/', function (req, res, next) {
    if (sqlState === -1) {
        res.send("Waiting for connection");
        return;
    }
    if (sqlState === 0) {
        res.send({error: error});
        return;
    }
    con.query("select * from User", function (err, result) {
        if (err) {
            res.send(result);
            return;
        }
        res.send(result);
    });
});

module.exports = router;
