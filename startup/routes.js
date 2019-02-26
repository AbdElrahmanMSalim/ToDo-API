const express = require("express");
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const todo = require('../routes/toDoList');
const home = require('../routes/home');


module.exports = function(app){
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static('Public'));
    
    // app.use('/', home);
    app.use('/api/users', users); 
    app.use('/api/auth', auth);
    app.use('/api/todo', todo);
    app.use('/', home)
    app.use(error);
}
