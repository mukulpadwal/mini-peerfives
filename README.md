# mini-peerfives
Assignment for Solvative

# Getting Started

### after cloning the repo

```
cd backend
npm i
nodemon index.js
```
### new terminal
```
cd frontend
npm i
npm start
```

# Problem Statement
Mini Peerfives allows users to reward other people with peerfives (P5) points.

# Completed

### Users List View
```
- A button to create new user - clicking on which user will be redirected to /new/ route
- Basic Table layout with all users
Table should have 6 columns: #, Name, P5 balance, Reward balance, Login
# - Static count number starting with 1
Name - User's name
P5 balance - self explanatory
Reward balance - self explanatory
Login - a edit button, clicking on which user will be redirected to /:id route
- Show each user in separate row
```

### New User
```
- 1 input for name
- Save button - saves the user, and redirects user back to list view, i.e. route /
- Cancel button - redirects user back to list view, i.e. route /
```

### View User
```
- Show a form with user details
Re-use the same component from New User
Pre-fill the name from the existing user
Save button - saves the user
- a button with text which shows logged in user's P5 balance, click on which user will be redirected to /:id/p5 route
- a button with text which shows logged in user's Reward balance, click on which user will be redirected to /:id/rewards route
```

### P5 History
```
A button to create new reward - clicking on which user will be redirected to /:id/rewards/new route
Show P5 balance
Basic Table layout with all P5 history
Table should have 6 columns: #, Date-Time, P5 given, User Name, Delete
# - Static count number starting with 1
Date-Time - self explanatory
P5 given - self explanatory
User Name - name of user to whom P5 were given
Delete - a delete button which will reverse the P5 given
Show each P5 in separate row
```

### Reward History 
```
Show Rewards balance
Basic Table layout with all Rewards history
Table should have 6 columns: #, Date-Time, Rewards received, User Name
# - Static count number starting with 1
Date-Time - self explanatory
Rewards received - self explanatory
User Name - name of user who gave rewards
Show each Reward in separate row
```
