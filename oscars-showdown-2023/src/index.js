import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const PROJECT_ID = "d2cpdrm6";
const DATASET = "production";
const API_PATH = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=`;

const QUERY_PETS = encodeURIComponent('*[_type == "pet"]');

const petsPromise = fetch(`${API_PATH}${QUERY_PETS}`);

function SelectBestPicture(hello) {
    console.log('hi sab 👋', hello);
    return (
        <div>
            <label htmlFor="bestPicture">Please select Best Picture:</label>
            <select id="bestPicture">
                <option>Hello!</option>
                <option>Goodbye!</option>
            </select>
        </div>
    );
}

function App() {
    const [pets, setPets] = useState(null);

    useEffect(() => {
        Promise
            .all([petsPromise])
            .then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response.json();
                }))
            })
            .then((data) => {
                console.log('data:', data[0].result);
                setPets(data[0].result);
            })
            .catch((error) => {
                console.error('Error!', error);
            })
    }, []);
    
    return (
        <div>
            <h1>Hello!</h1>
            <p>Welcome to Oscars Showdown 2023!</p>
            {pets && <SelectBestPicture hello={pets} />}
        </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
