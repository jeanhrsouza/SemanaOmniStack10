const express = require('express'); //importa a biblioteca express
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express(); //habilita o uso da biblioteca

const server = http.Server(app); //instanciando servidor

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xpwyy.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); //precisa vir antes das rotas (routes)
app.use(routes);

//app.listen(3333) passou a ser server.listen(3333);
server.listen(3333); //porta do servidor