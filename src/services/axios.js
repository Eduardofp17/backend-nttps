const axios = require("axios");

const api = axios.create({ baseURL: 'https://receitaws.com.br' });

module.exports = api;
