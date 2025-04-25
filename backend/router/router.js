const express = require('express');
const router = express.Router();
const constrollers = require('../controllers/controller');
const authenticator = require('../middleware/authenticator');

router.get('/getTodos',authenticator ,constrollers.getTodos);

router.post('/addTodo',authenticator, constrollers.addTodo);

router.delete('/deleteTodo/:id', authenticator, constrollers.deleteTodo);

router.put('/updateTodo/:id', authenticator, constrollers.updateTodo);

router.post('/login', constrollers.login);

router.post('/register', constrollers.register);

module.exports = router;