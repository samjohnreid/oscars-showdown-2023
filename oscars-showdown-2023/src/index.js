import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const PROJECT_ID = "d2cpdrm6";
const DATASET = "production";
const API_PATH = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=`;

const QUERY_PLAYER = encodeURIComponent('*[_type == "player"]');
const QUERY_DIRECTOR = encodeURIComponent('*[_type == "director"]');
const QUERY_PICTURE = encodeURIComponent('*[_type == "picture"]');
const QUERY_ACTOR = encodeURIComponent('*[_type == "actor"]');

const playerPromise = fetch(`${API_PATH}${QUERY_PLAYER}`);
const directorPromise = fetch(`${API_PATH}${QUERY_DIRECTOR}`);
const picturePromise = fetch(`${API_PATH}${QUERY_PICTURE}`);
const actorPromise = fetch(`${API_PATH}${QUERY_ACTOR}`);

const playerName = 'Dom';

const testFunc = (e) => {
    e.preventDefault();
    console.log('weeeeee!');
}

/*

1. 

*/

// ******************************************************************************************************************************************************

const PlayerNoms = (props) => {
    const playerData = props.player.find(el => el.name.includes(playerName));

    console.log('playerData:', playerData);
    
    const nomOptions = (noms) => {
        const sortedNoms = noms.sort((a, b) => {
            const nomA = a.name ? a.name.toUpperCase() : a.title.toUpperCase();
            const nomB = b.name ? b.name.toUpperCase() : b.title.toUpperCase();
            return nomA < nomB ? -1 : 1;
        });

        return sortedNoms.map((nom, index) => (
            <option value={nom.title ? nom.title : nom.name} key={index}>{nom.title ? nom.title : nom.name}</option>
        ));
    }

    const findCurrentNom = (category) => {
        // const playerNom = category.find(item => item._id === playerData[category[0]._type]._ref);

        // return playerNom.title ? playerNom.title : playerNom.name;

        return null;
    }
    
    const updateNom = (data) => {
        const playerId = playerData._id;
        const nomCategory = data.target.name;
        const nomValue = data.target.value;
        const nameOrTitle = data.target.dataset.nameOrTitle;

        console.log('playerId:', playerId);
        console.log('nomCategory:', nomCategory);
        console.log('nomValue:', nomValue);
        console.log('nameOrTitle:', nameOrTitle);
        
        const mutations = [{
            patch: {
                id: playerId,
                set: {
                    [nomCategory]: nomValue
                }
            }
        }];
        
        fetch(`https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer skAtdpfUgZo20BFZL4hLcMwGlXeGEZMKvNeIZM0C1P1AbXF2zSpUtNlLpPigHOSQeViEHhzg4xJ1hDjWU`
            },
            body: JSON.stringify({mutations})
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))
    }
    
    return (
        <div>
            <h2>Nominations for {playerName}!</h2>
            <br />
            <form>
                <div>
                    <label htmlFor="picture">Best Picture: </label>
                    <select name="picture" id="picture" defaultValue={findCurrentNom(props.picture)} onChange={updateNom} data-name-or-title="title">
                        {nomOptions(props.picture)}
                    </select>
                </div>
                <div>
                    <label htmlFor="director">Best Director: </label>
                    <select name="director" id="director" defaultValue={findCurrentNom(props.director)} onChange={updateNom} data-name-or-title="name">
                        {nomOptions(props.director)}
                    </select>
                </div>
                <div>
                    <label htmlFor="actor">Best Actor: </label>
                    <select name="actor" id="actor" defaultValue={findCurrentNom(props.actor)} onChange={updateNom} data-name-or-title="name">
                        {nomOptions(props.actor)}
                    </select>
                </div>
                <div>
                    <input type="submit" onClick={testFunc} />
                </div>
            </form>
        </div>
    );
}

// ******************************************************************************************************************************************************

function App() {
    const [player, setPlayer] = useState(null);
    const [director, setDirector] = useState(null);
    const [picture, setPicture] = useState(null);
    const [actor, setActor] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        Promise
            .all([
                playerPromise,
                directorPromise,
                picturePromise,
                actorPromise
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
                setActor(data.find(el => el.query.includes('"actor"]')).result);
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
            {dataFetched && <PlayerNoms
                player={player}
                director={director}
                picture={picture}
                actor={actor}
            />}
        </div>
    );
}

// ******************************************************************************************************************************************************

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
