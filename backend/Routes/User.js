const express = require("express");
const User = require("../Models/User.js");
const P5History = require("../Models/P5History.js");
const RewardHistory = require("../Models/RewardHistory.js");
const generateId = require("../utils/generateId.js");

const userRouter = express.Router();


// "/user" -> User Level Activites

userRouter.get('/users', async (req, res) => {

    // Get User Data
    // This will be used to display all the users to our frontend by sending an array of users as resonse

    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }

});


userRouter.post('/users', async (req, res) => {

    // Create a New User
    // This will be used to create a new user and store it inside out database

    try {
        const { name } = req.body;
        const id = generateId();

        const newUser = await User.create({
            id: id,
            name: name,
            p5: {
                balance: 100,
                history: []
            },
            reward: {
                balance: 0,
                history: []
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
    }
});


// "/user/:id" -> Particular User Related Activites


userRouter.get('/users/:id', async (req, res) => {

    // Get a particular user data
    // This is used to send a particular user data based on the user id

    try {
        const { id } = req.params;
        const user = await User.find({ id: id });

        if (user.length !== 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.log(error);
    }
});


userRouter.post('/users/:id/p5', async (req, res) => {

    // This route is to handle gifting p5 reward from one user to another

    try {
        const { id } = req.params;
        const { amount, givenTo } = req.body;

        const user = await User.find({ id: id });
        const giftedUser = await User.find({ id: givenTo });

        // console.log(user);
        // console.log(giftedUser);

        if (user.length !== 0) {
            // Check to make sure it is a valid transaction
            if (user[0].p5.balance >= amount) {

                user[0].p5.balance -= Number(amount);
                giftedUser[0].reward.balance += Number(amount);

                user[0].p5.history.push({
                    timeStamp: new Date(),
                    amount: amount,
                    givenTo: givenTo
                });

                giftedUser[0].reward.history.push({
                    timeStamp: new Date(),
                    amount: amount,
                    givenBy: id
                });

                user[0].save();
                giftedUser[0].save();

                await P5History.create({
                    userId: id,
                    timeStamp: new Date(),
                    amount: amount,
                    givenTo: givenTo
                });

                await RewardHistory.create({
                    userId: givenTo,
                    timestamp: new Date(),
                    amount: amount,
                    givenBy: id
                });

                res.status(201).json(user);
            } else {
                res.status(400).json({ error: 'Insufficient P5 balance' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log(error);
    }
});


userRouter.get('/users/:id/rewards', async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.find({ id: id });
        console.log(user);

        if (user.length > 0) {
            res.status(200).json(user[0].reward.history);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log(error);
    }
});


// Need To work on this functionality of reverting back the transaction if the user tries to delete it
userRouter.delete('/users/:id/p5/:historyId', async (req, res) => {

    try {
        console.log(req.params);
        const { id, historyId } = req.params;
        const user = await User.find({ id: id });

        let d = new Date(historyId);

        user[0].p5.history.filter((his) => {
            return console.log(his.timeStamp)
        });

        console.log(typeof (d));

        const p5History = await P5History.find({ timeStamp: d });

        console.log(p5History);

        // if (user) {
        //     // console.log(user[0].p5.history.map((h) => console.log(h.timeStamp)));
        //     const historyIndex = user[0].p5.history.findIndex(history => history.timeStamp === historyId);
        //     console.log(historyIndex);

        //     const p5Record = await P5History.find({ timeStamp: d });
        //     console.log(p5Record);

        //     if (historyIndex !== -1) {
        //         const { amount, givenTo } = user.p5.history[historyIndex];
        //         user[0].p5.balance += amount;
        //         user[0].p5.history.splice(historyIndex, 1);

        //         const p5HistoryIndex = P5History.findIndex(history => history.timestamp === parseInt(historyId));
        //         p5Histories.splice(p5HistoryIndex, 1);
        //         res.status(204).end();
        //     } else {
        //         res.status(404).json({ error: 'P5 history not found' });
        //     }
        // } else {
        //     res.status(404).json({ error: 'User not found' });
        // }
    } catch (error) {
        console.log(error);
    }


});


module.exports = userRouter;