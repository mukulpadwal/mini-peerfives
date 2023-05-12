const express = require("express");

const userRouter = express.Router();

// In-memory database
let users = [];
let p5Histories = [];
let rewardHistories = [];

// Helper function to generate unique IDs
function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

userRouter.get('/users', (req, res) => {
    res.json(users);
});

userRouter.post('/users', (req, res) => {
    const { name } = req.body;
    const id = generateId();
    const user = {
        id,
        name,
        p5: {
            balance: 100,
            history: []
        },
        reward: {
            balance: 0,
            history: []
        }
    };
    users.push(user);
    res.status(201).json(user);
});


userRouter.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

userRouter.post('/users/:id/p5', (req, res) => {
    const { id } = req.params;
    const { amount, givenTo } = req.body;
    const user = users.find(user => user.id === id);
    if (user) {
        if (user.p5.balance >= amount) {
            user.p5.balance -= amount;
            user.p5.history.push({
                timestamp: new Date(),
                amount,
                givenTo
            });
            p5Histories.push({
                userId: id,
                timestamp: new Date(),
                amount,
                givenTo
            });
            res.status(201).json(user);
        } else {
            res.status(400).json({ error: 'Insufficient P5 balance' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

userRouter.post('/users/:id/rewards', (req, res) => {
    const { id } = req.params;
    const { amount, givenBy } = req.body;
    const user = users.find(user => user.id === id);
    if (user) {
        user.reward.balance += amount;
        user.reward.history.push({
            timestamp: new Date(),
            amount,
            givenBy
        });
        rewardHistories.push({
            userId: id,
            timestamp: new Date(),
            amount,
            givenBy
        });
        res.status(201).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

userRouter.delete('/users/:id/p5/:historyId', (req, res) => {
    const { id, historyId } = req.params;
    const user = users.find(user => user.id === id);
    if (user) {
        const historyIndex = user.p5.history.findIndex(history => history.timestamp === parseInt(historyId));
        if (historyIndex !== -1) {
            const { amount, givenTo } = user.p5.history[historyIndex];
            user.p5.balance += amount;
            user.p5.history.splice(historyIndex, 1);
            const p5HistoryIndex = p5Histories.findIndex(history => history.timestamp === parseInt(historyId));
            p5Histories.splice(p5HistoryIndex, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'P5 history not found' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});



module.exports = userRouter;