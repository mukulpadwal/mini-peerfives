import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);

  const loadUserData = async () => {
    try {
      const URL = "http://localhost:5000/api/users";
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

      let jsonData = await response.json();
      setUsers(jsonData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  console.log(users);

  return (
    <div className="container">
      <h2>Users List</h2>
      <Link to="/new"><button>Create New User</button></Link>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>P5 balance</th>
              <th>Reward balance</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.p5.balance}</td>
                <td>{user.reward.balance}</td>
                <td>
                  <Link to={`/${user.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default UsersList;