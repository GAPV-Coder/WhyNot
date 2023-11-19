const { AppError } = require('../helpers/appError');
const Tournament = require('../models/tournaments.model');

class TournamentServices {
    static async getAllTournaments() {
        try {
            const tournaments = await Tournament.find();
            return tournaments;
        } catch {
            throw new AppError('Failed to fetch all tournaments', 500);
        }
    };

    static async createTournament(name, category, location) {
        try {
            const newTournament = await Tournament.create({
                name,
                category,
                location,
            });

            return newTournament;
        } catch (error) {
            throw new AppError('Error creating tournament', 400);
        }
    }

    static async updateTournament(tournamentId, name, category, location) {
        try {
            const updatedTournament = await Tournament.findByIdAndUpdate(
                tournamentId,
                {
                    name,
                    category,
                    location,
                },
                { new: true },
            );

            if (!updatedTournament) {
                throw new AppError(
                    `No tournament found with id ${tournamentId}`,
                    401,
                );
            }

            return updatedTournament;
        } catch (error) {
            throw new AppError('Error updating tournament', 500);
        }
    }

    static async deleteTournament(tournamentId) {
        try {
            const deletedTournament =
                await Tournament.findByIdAndRemove(tournamentId);

            if (!deletedTournament) {
                throw new AppError(
                    `No tournament found with id ${tournamentId}`,
                    401,
                );
            }

            return deletedTournament;
        } catch (error) {
            throw new AppError('Error deleting tournament');
        }
    }

    static async enrollInTournament(tournamentId, user) {
        try {
            const tournament = await Tournament.findById(tournamentId);

            if (!tournament) {
                throw new AppError('No tournament found', 404);
            }

            tournament.players.push(user);
            await tournament.save();

            return tournament;
        } catch (error) {
            throw new AppError('Error enrolling in tournament', 500);
        }
    }
}

module.exports = TournamentServices;
