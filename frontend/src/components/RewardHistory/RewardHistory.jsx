import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RewardHistory() {
  const { id } = useParams();
  const [rewardHistory, setRewardHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [id]);

  useEffect(() => {
    fetch(`/api/users/${id}/rewards`)
      .then(response => response.json())
      .then(data => setRewardHistory(data));
  }, [id]);

  return (
    <div className="container">
      <h2>Reward History</h2>
      <p>Reward Balance: {user !== null && user.reward.balance}</p>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date-Time</th>
              <th>Rewards received</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {rewardHistory.map((reward, index) => (
              <tr key={reward.timestamp}>
                <td>{index + 1}</td>
                <td>{reward.timestamp}</td>
                <td>{reward.amount}</td>
                <td>{reward.givenBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RewardHistory;