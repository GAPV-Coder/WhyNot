const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['professional', 'amateur'],
        default: 'professional'
    },
    location: {
        type: String,
        required: true
    }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;