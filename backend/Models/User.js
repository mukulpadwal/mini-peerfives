const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    p5: {
        type: {
            balance: Number,
            history: [{
                timeStamp: {
                    type: Date,
                    default: () => Date.now()
                },
                amount: {
                    type: Number
                },
                givenTo: {
                    type: String
                }
            }]
        }
    },
    reward: {
        type: {
            balance: Number,
            history: [{
                timeStamp: {
                    type: Date,
                    default: () => Date.now()
                },
                amount: {
                    type: Number
                },
                givenBy: {
                    type: String
                }
            }]
        }
    }
}, { versionKey: false} );

module.exports = mongoose.model("User", userSchema);