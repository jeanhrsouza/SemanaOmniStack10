const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    /*
    Toda vez que um usuário se conectar via websocket
    receberá um objeto chamado socket
    */
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    //Percorrendo todas as conexões e realizando um filtro
    return connections.filter(connection => {
        /*
            Comparando as coordenadas do novo dev cadastrado (coordinates)
            com as coordenadas de cada uma das conexões do websocket e ver se
            a distância é menor que 10 (connection.coordinates) 
                                &&
            Percorre as tecnologias e compara, caso seja igual as tecnologias, aparecem os devs
                
        */
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}