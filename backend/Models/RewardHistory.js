const mongoose = require("mongoose");

const rewardHistorySchema = new mongoose.Schema({
    userId: String,
    timeStamp : {
        type: Date,
        default: () => Date.now()
    },
    amount: {
        type: Number
    },
    givenBy: {
        type: String
    }
});

module.exports = mongoose.model("RewardHistory", rewardHistorySchema);