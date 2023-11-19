const { Router } = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const tournamentRoutes = require('./tournament.routes');

const routerApi = Router();

routerApi.use('/auth', authRoutes);

routerApi.use('/users', userRoutes);

routerApi.use('/tournament', tournamentRoutes);

module.exports = { routerApi };