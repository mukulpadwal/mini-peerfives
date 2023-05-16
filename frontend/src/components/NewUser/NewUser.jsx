import { Link, useNavigate } from "react-router-dom";
import "./NewUser.css";

function NewUser() {
    const navigate = useNavigate();

    const handleSave = () => {
        const name = document.getElementById('name').value;
        fetch('http://localhost:5000/api/users', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(() => navigate('/'))
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <h2>Create New User</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
            <button onClick={handleSave}>Save</button>
            <Link to="/"><button>Cancel</button></Link>
        </div>
    );
}

export default NewUser;