const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user');
const Todo = require('./model/todo');
const base64 = require('base-64');
const bcrypt = require('bcryptjs');
const router = require('./router/router');
const cors = require('cors');

app.use(cors());
app.use(express.json()) //middleware for parsing all data to json format

mongoose.connect('mongodb+srv://satyam86300:XTqprngTQBuPNroj@cluster0.laki2n1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(data => console.log('DataBase connected successfully'))
.catch(error => {
    console.log('Problem in connecting Database')
})

app.use('/', router);


app.listen(5000, () => {
    console.log('Listening to port 3000');
})


//password:-XTqprngTQBuPNroj
//link:-mongodb+srv://satyam86300:<db_password>@cluster0.laki2n1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
