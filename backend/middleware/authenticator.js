const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../model/user');
const Todo = require('../model/todo');
const base64 = require('base-64');
const bcrypt = require('bcryptjs');

const authenticator = async(req, res, next) => {
    console.log("👉 Authenticator middleware triggered");
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({status:'failure', message:'Unable to login, please try again later'});
    }
    const decodedeHeader = base64.decode(authHeader);
    const [email, password] = decodedeHeader.split(':');
    const user = await User.findOne({email});
    if(user){
        req.userId = user._id;
        next();
    }
    else{
        res.status(401).json({status:'failure', message:'Unable to login, please try again later'});
    }
}

module.exports = authenticator;