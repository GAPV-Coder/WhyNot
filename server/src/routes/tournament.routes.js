const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middleware');
const TournamentController = require('../controllers/tournament.controller');
const { validateCreateTournament } = require('../middlewares/validation.middleware');

const router = express.Router();

router.get('/all-tournaments', isLoggedIn, TournamentController.getTournaments);

router.post('/create', validateCreateTournament, isLoggedIn, isAdmin, TournamentController.createTournament);

router.patch('/:tournamentId', isLoggedIn, isAdmin, TournamentController.updateTournament);

router.delete('/:tournamentId', isLoggedIn, isAdmin, TournamentController.deleteTournament);

router.post('/:tournamentId/enroll', isLoggedIn, TournamentController.enrollInTournament);

module.exports = router;