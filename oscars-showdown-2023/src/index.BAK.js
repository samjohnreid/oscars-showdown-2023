import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const PROJECT_ID = "nkto1d41";
const DATASET = "production";
const API_PATH = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=`;

const QUERY_CATEGORIES = encodeURIComponent('*[_type == "category"]');
const QUERY_ITEMS = encodeURIComponent('*[_type == "item"]');
const QUERY_LICENSES = encodeURIComponent('*[_type == "license"]');
const QUERY_MOVIES = encodeURIComponent('*[_type == "movie"]');

const categoriesPromise = fetch(`${API_PATH}${QUERY_CATEGORIES}`);
const itemsPromise = fetch(`${API_PATH}${QUERY_ITEMS}`);
const licensesPromise = fetch(`${API_PATH}${QUERY_LICENSES}`);
const moviesPromise = fetch(`${API_PATH}${QUERY_MOVIES}`);

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
    const [categories, setCategories] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        Promise
            .all([categoriesPromise, itemsPromise])
            .then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response.json();
                }))
            })
            .then((data) => {
                console.log('data:', data[0].result);
                setCategories(data[0].result);
            })
    }, []);
    
    return (
        <div>
            <h1>Hello!</h1>
            <p>Welcome to Oscars Showdown 2023!</p>
            {categories && <SelectBestPicture hello={categories} />}
        </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
