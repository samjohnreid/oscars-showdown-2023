import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const PROJECT_ID = "d2cpdrm6";
const DATASET = "production";
const API_PATH = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=`;

const QUERY_PLAYER = encodeURIComponent('*[_type == "player"]');
const QUERY_DIRECTOR = encodeURIComponent('*[_type == "director"]');
const QUERY_PICTURE = encodeURIComponent('*[_type == "picture"]');

const playerPromise = fetch(`${API_PATH}${QUERY_PLAYER}`);
const directorPromise = fetch(`${API_PATH}${QUERY_DIRECTOR}`);
const picturePromise = fetch(`${API_PATH}${QUERY_PICTURE}`);

const playerName = 'Dom';

const PlayerNoms = (props) => {
    const nomOptions = (noms) => {
        return noms.map((nom, index) => (
            <option value={nom.title ? nom.title : nom.name} key={index}>{nom.title ? nom.title : nom.name}</option>
        ));
    }

    const findCurrentNom = (catArr, catName) => {
        // 1. find out *who* the player is ✅
        // 2. find out what category is ✅
        // 3. find out if they voted yet, and if so what the nom is
        // 4. default to the first one if no nom; add selected to nom if one
        
        const playerData = props.player.find(el => el.name.includes(playerName));
        const playerNom = catArr.find(item => item._id === playerData[catName]._ref);

        return playerNom.title ? playerNom.title : playerNom.name;
    }
    
    return (
        <div>
            <h2>Nominations for [player]!</h2>
            <br />
            <form>
                <div>
                    <label>Best Picture: </label>
                    <select defaultValue={findCurrentNom(props.picture, 'picture')}>
                        {nomOptions(props.picture)}
                    </select>
                </div>
                <div>
                    <label>Best Director: </label>
                    <select defaultValue={findCurrentNom(props.director, 'director')}>
                        {nomOptions(props.director)}
                    </select>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

function App() {
    const [player, setPlayer] = useState(null);
    const [director, setDirector] = useState(null);
    const [picture, setPicture] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        Promise
            .all([
                playerPromise,
                directorPromise,
                picturePromise
            ])
            .then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response.json();
                }))
            })
            .then((data) => {
                setPlayer(data.find(el => el.query.includes('"player"]')).result);
                setDirector(data.find(el => el.query.includes('"director"]')).result);
                setPicture(data.find(el => el.query.includes('"picture"]')).result);
            })
            .then(() => {
                setDataFetched(true);
            })
            .catch((error) => {
                console.error('Error! Something went wrong 😬', error);
            })
    }, []);
    
    return (
        <div>
            <h1>Hello!</h1>
            <p>Welcome to Oscars Showdown 2023!</p>
            <hr style={{margin: '50px 0'}} />
            {dataFetched && <PlayerNoms player={player} director={director} picture={picture} />}
        </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
