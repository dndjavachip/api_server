var express = require('express')
var dbInstance = require('../dao')

exports.login = function(req,res,next) {
    var id = req.body.id,
        pw = req.body.pw,
        account_type = req.body.account_type;

    console.log(id,pw,account_type);
    if(account_type == "manager") {
        dbInstance.dbConnection.query('SELECT * from USER_MANAGER WHERE manager_id=? AND manager_pw=?',[id,pw],function(err,rows,fields) {
                    // compare id & pw
                    if(rows.length==0) {
                        res.status(200).json({
                            "status":"fail"

                        });
                    }
                    else {
                        res.status(200).json({
                            "status":"success",
                            "JWT":"empty"
                        });
                    }
                    
        })
    }

    else if(account_type == "user") {
        dbInstance.dbConnection.query('SELECT * FROM USER_ACCOUNT WHERE user_id=? AND user_pw=?',[id,pw],function(err,rows,fields) {
                    // compare id & pw
                    console.log(rows);
                    if(rows.length==0) {
                        res.status(200).json({
                            "status":"fail"

                        });
                    }
                    else {
                        res.status(200).json({
                            "status":"success",
                            "JWT":"empty"
                        });
                    }


        })    
    }
}


// res.send -> JWT Access Token 
