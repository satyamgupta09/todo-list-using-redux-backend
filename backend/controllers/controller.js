const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../model/user');
const Todo = require('../model/todo');
const base64 = require('base-64');
const bcrypt = require('bcryptjs');
const authenticator = require('../middleware/authenticator');

const register = async(req, res) => {
    try{
        const { name, email, password } = req.body;
        console.log(name,' ',email,' ',password)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, password:hashedPassword
        });
        await newUser.save();
        res.status(200).json({status:'success', message:'User registered successfully!'});
    }
    catch(error){
        console.log(error);
    }
}

const login = async(req, res) => {
    console.log('Hitting Login API');
    try{
        const { email, password } = req.body;
        console.log(email,' ',password,' ',req.userId);
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({status:'failure', message:'Unable to login, please try again later'});
        }
        console.log(user.name, ' ', user.email);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({status:'failure', message:'wrong password, please try with correct password'});
        }
        else{
            const token = base64.encode(email,':',password);
            res.status(201).json({status:'success', message:'Login successfully!', token:token, user:user.name})
        }
    }
    catch(error){
        console.log(error);
    }
}

const addTodo = async(req, res) => {
    try{
        const {name, status, priority} = req.body;
        let newTodo = new Todo({
            name:name,
            status:status,
            priority:priority,
            userID: req.userId
        })

        // newTodo.userID.push(req.userId);

        const result = await newTodo.save();
        console.log(result);
        res.status(200).json({status:'success', message:'Todo added successfully!'});
    }
    catch(error){
        console.log(error);
    }
}

const getTodos = async(req, res) => {
    try{
        console.log(req.userId,'getTodos');
        const todos = await Todo.find({userID: req.userId});
        if(!todos){
            return res.status(404).json({status:'failure', message:'Unable to get Todos, please try again later.'});
        }
        res.status(200).json({status:'success', message:'Todo retrived successfully!', data:todos}); 
    }
    catch(error){
        console.log(error);
    }
}

const deleteTodo = async(req, res) => {
    console.log('Hitting Delete')
    try{
        const { id } = req.params;
        console.log(id)
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({status:'failure', message:'Unable to delete Todo, please try again later.'});
        }
        else{
            res.status(200).json({status:'success', message:'Todo deleted successfully!'})
        }
    }
    catch(error){
        console.log(error);
    }
}

const updateTodo = async(req, res) => {
    try{
        const { id } = req.params;
        const { name, status, priority } = req.body;
        // console.log('updateTodos from backend',name,' ',status,' ',priority);
        const newTodo = {};

        if(name != undefined || name != null) newTodo.name = name;
        if(status != undefined || status != null) newTodo.status = status;
        if(priority != undefined || priority != null) newTodo.priority = priority

        const todo = await Todo.findByIdAndUpdate(id, newTodo);
        if(!todo){
            return res.status(401).json({status:'failure', message:'Unable to update Todo, please try again later.'});
        }
        else{
            res.status(200).json({status:'success', message:'Todo updated successfully!'})
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    register,
    login,
    addTodo,
    deleteTodo,
    updateTodo,
    getTodos
};