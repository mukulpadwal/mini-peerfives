import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UserList/UserList';
import NewUser from './components/NewUser/NewUser';
import ViewUser from './components/ViewUser/ViewUser';
import NewReward from './components/NewReward/NewReward';
import RewardHistory from './components/RewardHistory/RewardHistory';
import P5History from './components/P5History/P5History';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<UsersList />} />
          <Route exact path="/new" element={<NewUser />} />
          <Route exact path="/:id" element={<ViewUser />} />
          <Route exact path="/:id/p5" element={<P5History />} />
          <Route exact path="/:id/rewards" element={<RewardHistory />} />
          <Route exact path="/:id/rewards/new" element={<NewReward />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
