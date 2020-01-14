const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xpwyy.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json()); //precisa vir antes das rotas (routes)
app.use(routes);

app.listen(3333);