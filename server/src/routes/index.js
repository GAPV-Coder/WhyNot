const { Router } = require('express');
const authRoutes = require('./auth.routes');

const routerApi = Router();

routerApi.use('/auth', authRoutes);

module.exports = { routerApi };