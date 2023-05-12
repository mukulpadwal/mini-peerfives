import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function P5History() {
    const { id } = useParams();
    const [p5History, setP5History] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => response.json())
            .then(data => setP5History(data.p5.history));
    }, [id]);

    const handleDelete = (historyId) => {
        fetch(`http://localhost:5000/api/users/${id}/p5/${historyId}`, { method: 'DELETE' })
            .then(() => {
                setP5History(p5History.filter(history => history.timestamp !== historyId));
            });
    };

    console.log(p5History);

    return (
        <div className="container">
            <h2>P5 History</h2>
            <Link to={`/${id}/rewards/new`}><button>Create New Reward</button></Link>
            {user !== null && <p>P5 Balance: {user.p5.balance}</p>}
            <div className="table-div">

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date-Time</th>
                            <th>P5 given</th>
                            <th>User Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {p5History.map((history, index) => (
                            <tr key={history.timestamp}>
                                <td>{index + 1}</td>
                                <td>{history.timestamp}</td>
                                <td>{history.amount}</td>
                                <td>{history.givenTo}</td>
                                <td>
                                    <button onClick={() => handleDelete(history.timestamp)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default P5History;