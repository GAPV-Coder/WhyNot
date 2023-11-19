const { catchAsync } = require('../helpers/catchAsync');
const { success } = require('../helpers/responses');
const TournamentServices = require('../services/tournament.services');

const getTournaments = catchAsync(async (req, res) => {
    const tournaments = await TournamentServices.getAllTournaments();
    success({
        res,
        message: 'Tournaments retrieved successfully',
        data: tournaments
    });
});

const createTournament = catchAsync(async (req, res) => {
    const { name, category, location } = req.body;
    const tournament = await TournamentServices.createTournament(
        name,
        category,
        location,
    );
    success({
        res,
        message: 'Tournament create successfully',
        data: tournament,
    });
});

const updateTournament = catchAsync(async (req, res) => {
    const { tournamentId } = req.params;
    const { name, category, location } = req.body;
    const updatedTournament = await TournamentServices.updateTournament(
        tournamentId,
        name,
        category,
        location,
    );
    success({
        res,
        message: 'Tournament updated successfully',
        data: updatedTournament,
    });
});

const deleteTournament = catchAsync(async (req, res) => {
    const { tournamentId } = req.params;
    const deletedTournament =
        await TournamentServices.deleteTournament(tournamentId);
    success({
        res,
        message: 'Tournament deleted successfully',
        data: deletedTournament,
    });
});

const enrollInTournament = catchAsync(async (req, res) => {
    const { tournamentId } = req.params;
    const user = req.user;
    console.log('UserID:', user);
    const enrolledUser = await TournamentServices.enrollInTournament(
        tournamentId,
        user,
    );
    success({
        res,
        message: 'You have been enrolled in the tournament',
        data: enrolledUser,
    });
});

module.exports = {
    getTournaments,
    createTournament,
    updateTournament,
    deleteTournament,
    enrollInTournament
};
