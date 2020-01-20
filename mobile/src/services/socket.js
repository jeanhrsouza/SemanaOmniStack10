//Configuração do websocket 
import socketio from 'socket.io-client';

//deve utilizar o mesmo endereço da chama da './services/api.js'
const socket = socketio('http://192.168.0.16:3333', {
    autoConnect: false,
});


function subscribeToNewDevs(subscribeFunction) {
    socket.on('newDev', subscribeFunction);
}

//função com parâmetros que serão enviados a partir do connect
function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();
}

function disconnect() {
    if (socket.connect) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};


