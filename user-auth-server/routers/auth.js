const express = require('express');
const route = express.Router();

route.get('/google', googleOAuth);

module.exports = route;