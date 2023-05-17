import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function NewReward() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [p5Balance, setP5Balance] = useState(0);
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);
  
  useEffect(() => {
    loadCurrentUserData();
  }, [id]);

  const loadUserData = async () => {
    try {
      const URL = `${process.env.REACT_APP_BASE_URL}/api/users`;
      const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      });

      let data = await response.json();

      setUsers(data.filter((user) => user.id !== id));

    } catch (error) {
      console.log(error);
    }
  }

  const loadCurrentUserData = async () => {
    try {
      const URL = `${process.env.REACT_APP_BASE_URL}/api/users/${id}`;
      const response = await fetch(URL, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      });

      let data = await response.json();

      setP5Balance(data[0].p5.balance);

    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = () => {
    if (amount > 0 && amount <= 100 && amount <= p5Balance) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}/p5`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ amount, givenTo: selectedUser })
      })
        .then(response => response.json())
        .then(() => navigate(`/${id}/p5`));
    }
  };

  console.log(users);

  return (
    <div className="container">
      <h2>Create New Reward</h2>
      <label htmlFor="user">User:</label>
      <select id="user" onChange={e => setSelectedUser(e.target.value)}>
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <label htmlFor="amount">Amount:</label>
      <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <p>P5 Balance: {p5Balance}</p>
      <button onClick={handleSave} disabled={amount <= 0 || amount > 100 || amount > p5Balance}>Submit</button>
      <Link to={`/${id}/p5`}><button>Cancel</button></Link>
    </div>
  );
}

export default NewReward;