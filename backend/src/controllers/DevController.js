const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);

    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        /*
            Caso um dev já esteja cadastrado, não fará o cadastro novamente.
        */
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data; //igual do name seria um if para pegar o valor padrao de login

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //Filtrar as conexões
            /*
                Passar em cada uma das conexões que está no socket
                e procurará por aquelas que satisfaçam as condições de geolocalização e tecnologias
            */
            const sendSocketMessageTo = findConnections(
                { longitude, longitude },
                techsArray,
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
            
        }


        return response.json(dev);
    } //,
    //async update(){} atualizar  -> nome, avatar, bio, localização e techs
    //async destroy () deletar o banco de dados 

};