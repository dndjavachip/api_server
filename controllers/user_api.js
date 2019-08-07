var express =  require('express');
var dbInstance = require('../dao');

exports.checkUser = function(req, res) { // GET Method(Read)

    var user_id = req.params.user_id;
    console.log(user_id);
    dbInstance.dbConnection.query('SELECT user_id from USER_ACCOUNT where user_id=?',[user_id],function(err,rows,fields) {

        if(rows[0] == undefined)
            res.status(200).json(
                {
                "user_check": "false"
                }
            );
        else
           res.status(200).json({
               "user_check": "true"
           });

    });
};