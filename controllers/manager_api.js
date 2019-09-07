var express =  require('express');
var dbInstance = require('../dao');
var jwt = require('jsonwebtoken');
var jwt_token = require('../jwt_token')

exports.checkManager = function(req, res) { // GET Method(Read)

    var manager_id = req.params.manager_id;
    console.log(manager_id);
    dbInstance.dbConnection.query('SELECT manager_id from USER_MANAGER where manager_id=?',[manager_id],function(err,rows,fields) {

        if(rows.length==0)
            res.status(200).json(
                {
                "manager_check": "false"
                }
            );
        else
           res.status(200).json({
               "manager_check": "true"
           });

    });
};

exports.createManager = function(req, res, next) { // POST Method(CREATE)
    var managers = req.body;
    console.log(managers);
    
    dbInstance.dbConnection.query('INSERT INTO USER_MANAGER SET ?',managers,function(error,results, fields) {
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
                "success": "manager registered sucessfully" // send id & encrypt password.
            });
        }

    });

};

exports.createCafe = function(req, res, next) {
    var token = req.get('x-access-token');
    var bodys = req.body;
    var token_decoded = jwt.verify(token,jwt_token.secret);
    if(token_decoded){

        dbInstance.dbConnection.query('INSERT INTO CAFE_LISTS SET ?',bodys,function(error,results, fields) {
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
                    "success": "manager registered sucessfully" // send id & encrypt password.
                });
            }
    
        });
    }
};

exports.listCafe = function(req,res,next) {
    var token = req.get('x-access-token');
    var token_decoded = jwt.verify(token,jwt_token.secret);
    if(token_decoded) {
        var manager_id = token_decoded['id'];
        console.log(manager_id);
        dbInstance.dbConnection.query('SELECT cafe_id from CAFE_LISTS where manager_id=?',[manager_id],function(err,rows,fields) {
            console.log(rows);

            if(token_decoded)
                res.status(200).json(
                    {
                        "cafe_list": rows  
                    }
                );
            else
               res.status(200).json({
                "manager_check": "false"
               });
    
        });


    }
}


// 메뉴 생성
exports.createMenu = function(req, res, next) {
    var token = req.get('x-access-token');
    var cafe_id = req.body.cafe_id;
    var category = req.body.category;
    var price = req.body.price;
    var menu_description = req.body.menu_description;
    var menu_name = req.body.menu_name;
    var token_decoded = jwt.verify(token,jwt_token.secret);
    
    if(token_decoded){

        dbInstance.dbConnection.query('INSERT INTO MENU(cafe_id,manager_id,category,price,menu_description,menu_name) VALUES (?,?,?,?,?,?)',[cafe_id,token_decoded['id'],category,price,menu_description,menu_name],function(error,results, fields) {
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
                    "success": "menu registered sucessfully" // send id & encrypt password.
                });
            }
    
        });
    }
};


// 메뉴 리스트 반환

exports.listMenu = function(req,res,next) {
    var token = req.get('x-access-token');
    var cafe_id = req.params.cafe_id;
    console.log(cafe_id);
    var token_decoded = jwt.verify(token,jwt_token.secret);
    if(token_decoded) {

        dbInstance.dbConnection.query('SELECT * from MENU where cafe_id=?',[cafe_id],function(err,rows,fields) {
            console.log(rows);

            if(token_decoded)
                res.status(200).json(
                    {
                        "menu_list": rows  
                    }
                );
            else
               res.status(200).json({
                "manager_check": "false"
               });
    
        });


    }
}

exports.createOrder = function(req, res, next) { // POST Method(CREATE)
    var menu_id = req.body.menu_id;
    var cafe_id = req.body.cafe_id;
    var token = req.get('x-access-token');
    var token_decoded = jwt.verify(token,jwt_token.secret);
    var user_id = token_decoded['id'];

    if(token_decoded) {
    dbInstance.dbConnection.query('INSERT INTO ORDER_LIST(user_id,menu_id,cafe_id) VALUES(?,?,?)',[user_id,menu_id,cafe_id],function(error,results, fields) {
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
                "success": "order registered sucessfully" // send id & encrypt password.
            });
        }

    });
}

};
// 주문 생성

