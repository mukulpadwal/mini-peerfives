import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ViewUser.css";

function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/users/${id}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }, [id]);
  
    const history = useNavigate();
  
    const handleP5Click = () => {
      history(`/${id}/p5`);
    };
  
    const handleRewardClick = () => {
      history(`/${id}/rewards`);
    };
  
    return (
      <div className="container">
        {user ? (
          <div>
            <h2>User Details</h2>
            <form>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={user.name} disabled />
            </form>
            <button onClick={handleP5Click}>P5 Balance: {user.p5.balance}</button>
            <button onClick={handleRewardClick}>Reward Balance: {user.reward.balance}</button>
          </div>
        ) : (
          <div>Loading user...</div>
        )}
        <Link to="/"><button>Back</button></Link>
      </div>
    );
  }

  export default ViewUser;