const dotenv = require('dotenv');

const variaveis = dotenv.config();

if(variaveis.error){
    throw variaveis.error;
}

const { parsed : envs } = variaveis;

module.exports = envs;