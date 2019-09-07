var express = require('express')
var dbInstance = require('../dao')
var jwt = require("jsonwebtoken");
var secretObj = require("../jwt_token");


/* 

accessToken이 만료되더라도 refreshToken이 있으면 accessToken을 다시 발급합니다.
refreshToken이 만료되면 accessToken을 재발급하지 않습니다.
refreshToken의 만료 7일 전부터 만료일사이에 로그인하면 refreshToken을 발급합니다.
이렇게 하면 한 번 로그인하면 한 달간은 자동 로그인할 수 있습니다. 또 매일 로그인한다면 계속 자동 로그인이 유지됩니다.

*/

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
                            "token":"empty"
                        });

                    }
                    else {
                        var token = jwt.sign({
                            "id":id,
                            "account_type":"manager"
                        },secretObj.secret,
                        {
                            expiresIn :'1d'
                        })

                        res.cookie("user",token);
                        res.status(200).json({
                            "token":token

                        });

                    }
                    
        })
    }

    else if(account_type == "user") {
        dbInstance.dbConnection.query('SELECT * FROM USER_ACCOUNT WHERE user_id=? AND user_pw=?',[id,pw],function(err,rows,fields) {
                    // compare id & pw
                    if(rows.length==0) {

                        res.status(200).json({
                            "token":"empty"
                        });

                    }
                    else {
                        var token = jwt.sign({
                            "id":id,
                            "account_type":"user"
                        },secretObj.secret,
                        {
                            expiresIn :'5m'
                        })

                        res.cookie("user",token);
                        res.status(200).json({
                            "token":token

                        });

                    }


        })    
    }
}

exports.refresh = function(req,res,next) {

        var token = req.get('x-access-token');
    
        if(typeof token !== 'undefined'){
            var decoded = jwt.verify(token, secretObj.secret);
            res.json(decoded)
           
          
        }else{
            res.sendStatus(403);
        }
    };




// res.send -> JWT Access Token 
