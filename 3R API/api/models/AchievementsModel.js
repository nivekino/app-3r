const mongoose = require('mongoose');

const AchievementsModel = mongoose.model('Achievements', {
    title: String,
    points: Number,
    quantity: Number,
    image: String,
});


module.exports = AchievementsModel;
