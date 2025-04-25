const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;