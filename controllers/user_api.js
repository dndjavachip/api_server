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

exports.createUser = function(req, res, next) { // POST Method(CREATE)
    var users = req.body;
    console.log(users);
    
    dbInstance.dbConnection.query('INSERT INTO USER_ACCOUNT SET ?',users,function(error,results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred" 
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully" // send id & encrypt password.
            });
        }

    });

};
