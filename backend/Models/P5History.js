const mongoose = require("mongoose");

const p5HistorySchema = new mongoose.Schema({
    userId: {
        type: String
    },
    timeStamp : {
        type: Date,
        default: () => Date.now()
    },
    amount: {
        type: Number
    },
    givenTo: {
        type: String
    }
});

module.exports = mongoose.model("P5History", p5HistorySchema);