import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RewardHistory() {
  const { id } = useParams();
  const [rewardHistory, setRewardHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${id}/rewards`)
      .then(response => response.json())
      .then(data => setRewardHistory(data));
  }, [id]);

  console.log(user);
  console.log(rewardHistory);

  return (
    <div className="container">
      <h2>Reward History</h2>
      <p>Reward Balance: {user !== null && user[0].reward.balance}</p>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date-Time</th>
              <th>Rewards received</th>
              <th>User Name(Given By)</th>
            </tr>
          </thead>
          <tbody>
            {rewardHistory.map((reward, index) => (
              <tr key={reward.timestamp}>
                <td>{index + 1}</td>
                <td>{reward.timeStamp}</td>
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