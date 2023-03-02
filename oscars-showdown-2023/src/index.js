import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const PROJECT_ID = "d2cpdrm6";
const DATASET = "production";
const API_PATH = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=`;

const QUERY_PLAYER = encodeURIComponent('*[_type == "player"]');
const QUERY_PICTURE = encodeURIComponent('*[_type == "picture"]');
const QUERY_DIRECTOR = encodeURIComponent('*[_type == "director"]');
const QUERY_ACTOR = encodeURIComponent('*[_type == "actor"]');
const QUERY_ACTRESS = encodeURIComponent('*[_type == "actress"]');
const QUERY_SUPPORTING_ACTOR = encodeURIComponent('*[_type == "supportingActor"]');
const QUERY_SUPPORTING_ACTRESS = encodeURIComponent('*[_type == "supportingActress"]');
const QUERY_ADAPTED_SCREENPLAY = encodeURIComponent('*[_type == "adaptedScreenplay"]');
const QUERY_ORIGINAL_SCREENPLAY = encodeURIComponent('*[_type == "originalScreenplay"]');
const QUERY_ANIMATED_FEATURE_FILM = encodeURIComponent('*[_type == "animatedFeatureFilm"]');
const QUERY_CINEMATOGRAPHY = encodeURIComponent('*[_type == "cinematography"]');
const QUERY_MAKEUP_AND_HAIRSTYLING = encodeURIComponent('*[_type == "makeupAndHairstyling"]');
const QUERY_VISUAL_EFFECTS = encodeURIComponent('*[_type == "visualEffects"]');
const QUERY_WINNERS = encodeURIComponent('*[_type == "winners"]');

const playerPromise = fetch(`${API_PATH}${QUERY_PLAYER}`);
const directorPromise = fetch(`${API_PATH}${QUERY_DIRECTOR}`);
const picturePromise = fetch(`${API_PATH}${QUERY_PICTURE}`);
const actorPromise = fetch(`${API_PATH}${QUERY_ACTOR}`);
const actressPromise = fetch(`${API_PATH}${QUERY_ACTRESS}`);
const supportingactorPromise = fetch(`${API_PATH}${QUERY_SUPPORTING_ACTOR}`);
const supportingactressPromise = fetch(`${API_PATH}${QUERY_SUPPORTING_ACTRESS}`);
const adaptedscreenplayPromise = fetch(`${API_PATH}${QUERY_ADAPTED_SCREENPLAY}`);
const originalscreenplayPromise = fetch(`${API_PATH}${QUERY_ORIGINAL_SCREENPLAY}`);
const animatedfeaturefilmPromise = fetch(`${API_PATH}${QUERY_ANIMATED_FEATURE_FILM}`);
const cinematographyPromise = fetch(`${API_PATH}${QUERY_CINEMATOGRAPHY}`);
const makeupandhairstylingPromise = fetch(`${API_PATH}${QUERY_MAKEUP_AND_HAIRSTYLING}`);
const visualeffectsPromise = fetch(`${API_PATH}${QUERY_VISUAL_EFFECTS}`);
const winnersPromise = fetch(`${API_PATH}${QUERY_WINNERS}`);

const playerName = 'Dave';
const path = window.location.pathname;

// ******************************************************************************************************************************************************

const testFunc = (e) => {
    e.preventDefault();
    console.log('weeeeee!');
}

const PlayerNoms = (props) => {
    const playerData = props.player.find(el => el.name.includes(playerName));
    
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
        const playerNom = category.find((item) => {
            const nom = item.title ? item.title : item.name;
            return nom === playerData[category[0]._type];
        });

        return playerNom.title ? playerNom.title : playerNom.name;
    }
    
    const updateNom = (data) => {
        const playerId = playerData._id;
        const nomCategory = data.target.name;
        const nomValue = data.target.value;
        
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

    const nomSelectOptions = {
        picture: 'Best Picture',
        director: 'Best Director',
        actor: 'Best Actor',
        actress: 'Best Actress',
        supportingActor: 'Best Supporting Actor',
        supportingActress: 'Best Supporting Actress',
        adaptedScreenplay: 'Best Adapted Screenplay',
        originalScreenplay: 'Best Original Screenplay',
        animatedFeatureFilm: 'Best Animated Feature Film',
        cinematography: 'Best Cinematography',
        makeupAndHairstyling: 'Best Makeup and Hairstyling',
        visualEffects: 'Best Visual Effects'
    };
    
    return (
        <div>
            <h2>Nominations for {playerName}!</h2>
            <br />
            <form>
                <div>
                    <label htmlFor="picture">Best Picture: </label>
                    <select name="picture" id="picture" defaultValue={findCurrentNom(props.picture)} onChange={updateNom}>
                        {nomOptions(props.picture)}
                    </select>
                </div>
                <div>
                    <label htmlFor="director">Best Director: </label>
                    <select name="director" id="director" defaultValue={findCurrentNom(props.director)} onChange={updateNom}>
                        {nomOptions(props.director)}
                    </select>
                </div>
                <div>
                    <label htmlFor="actor">Best Actor: </label>
                    <select name="actor" id="actor" defaultValue={findCurrentNom(props.actor)} onChange={updateNom}>
                        {nomOptions(props.actor)}
                    </select>
                </div>
                <div>
                    <label htmlFor="actress">Best Actress: </label>
                    <select name="actress" id="actress" defaultValue={findCurrentNom(props.actress)} onChange={updateNom}>
                        {nomOptions(props.actress)}
                    </select>
                </div>
                <div>
                    <label htmlFor="supportingActor">Best Supporting Actor: </label>
                    <select name="supportingActor" id="supportingActor" defaultValue={findCurrentNom(props.supportingActor)} onChange={updateNom}>
                        {nomOptions(props.supportingActor)}
                    </select>
                </div>
                <div>
                    <label htmlFor="supportingActress">Best Supporting Actress: </label>
                    <select name="supportingActress" id="supportingActress" defaultValue={findCurrentNom(props.supportingActress)} onChange={updateNom}>
                        {nomOptions(props.supportingActress)}
                    </select>
                </div>
                <div>
                    <label htmlFor="adaptedScreenplay">Best Adapted Screenplay: </label>
                    <select name="adaptedScreenplay" id="adaptedScreenplay" defaultValue={findCurrentNom(props.adaptedScreenplay)} onChange={updateNom}>
                        {nomOptions(props.adaptedScreenplay)}
                    </select>
                </div>
                <div>
                    <label htmlFor="originalScreenplay">Best Original Screenplay: </label>
                    <select name="originalScreenplay" id="originalScreenplay" defaultValue={findCurrentNom(props.originalScreenplay)} onChange={updateNom}>
                        {nomOptions(props.originalScreenplay)}
                    </select>
                </div>
                <div>
                    <label htmlFor="animatedFeatureFilm">Best Animated Feature Film: </label>
                    <select name="animatedFeatureFilm" id="animatedFeatureFilm" defaultValue={findCurrentNom(props.animatedFeatureFilm)} onChange={updateNom}>
                        {nomOptions(props.animatedFeatureFilm)}
                    </select>
                </div>
                <div>
                    <label htmlFor="cinematography">Best Cinematography: </label>
                    <select name="cinematography" id="cinematography" defaultValue={findCurrentNom(props.cinematography)} onChange={updateNom}>
                        {nomOptions(props.cinematography)}
                    </select>
                </div>
                <div>
                    <label htmlFor="makeupAndHairstyling">Best Makeup and Hairstyling: </label>
                    <select name="makeupAndHairstyling" id="makeupAndHairstyling" defaultValue={findCurrentNom(props.makeupAndHairstyling)} onChange={updateNom}>
                        {nomOptions(props.makeupAndHairstyling)}
                    </select>
                </div>
                <div>
                    <label htmlFor="visualEffects">Best Visual Effects: </label>
                    <select name="visualEffects" id="visualEffects" defaultValue={findCurrentNom(props.visualEffects)} onChange={updateNom}>
                        {nomOptions(props.visualEffects)}
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

const Winners = (props) => {    
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
        const winnerNom = category.find((item) => {
            const nom = item.title ? item.title : item.name;
            return nom === props.winners[0][category[0]._type];
        });

        return winnerNom.title ? winnerNom.title : winnerNom.name;
    }
    
    const updateNom = (data) => {
        const winnersId = props.winners[0]._id;
        const nomCategory = data.target.name;
        const nomValue = data.target.value;
        
        const mutations = [{
            patch: {
                id: winnersId,
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
            <h2>Winners!</h2>
            <br />
            <form>
                <div>
                    <label htmlFor="picture">Best Picture: </label>
                    <select name="picture" id="picture" defaultValue={findCurrentNom(props.picture)} onChange={updateNom}>
                        {nomOptions(props.picture)}
                    </select>
                </div>
                <div>
                    <label htmlFor="director">Best Director: </label>
                    <select name="director" id="director" defaultValue={findCurrentNom(props.director)} onChange={updateNom}>
                        {nomOptions(props.director)}
                    </select>
                </div>
                <div>
                    <label htmlFor="actor">Best Actor: </label>
                    <select name="actor" id="actor" defaultValue={findCurrentNom(props.actor)} onChange={updateNom}>
                        {nomOptions(props.actor)}
                    </select>
                </div>
                <div>
                    <label htmlFor="actress">Best Actress: </label>
                    <select name="actress" id="actress" defaultValue={findCurrentNom(props.actress)} onChange={updateNom}>
                        {nomOptions(props.actress)}
                    </select>
                </div>
                <div>
                    <label htmlFor="supportingActor">Best Supporting Actor: </label>
                    <select name="supportingActor" id="supportingActor" defaultValue={findCurrentNom(props.supportingActor)} onChange={updateNom}>
                        {nomOptions(props.supportingActor)}
                    </select>
                </div>
                <div>
                    <label htmlFor="supportingActress">Best Supporting Actress: </label>
                    <select name="supportingActress" id="supportingActress" defaultValue={findCurrentNom(props.supportingActress)} onChange={updateNom}>
                        {nomOptions(props.supportingActress)}
                    </select>
                </div>
                <div>
                    <label htmlFor="adaptedScreenplay">Best Adapted Screenplay: </label>
                    <select name="adaptedScreenplay" id="adaptedScreenplay" defaultValue={findCurrentNom(props.adaptedScreenplay)} onChange={updateNom}>
                        {nomOptions(props.adaptedScreenplay)}
                    </select>
                </div>
                <div>
                    <label htmlFor="originalScreenplay">Best Original Screenplay: </label>
                    <select name="originalScreenplay" id="originalScreenplay" defaultValue={findCurrentNom(props.originalScreenplay)} onChange={updateNom}>
                        {nomOptions(props.originalScreenplay)}
                    </select>
                </div>
                <div>
                    <label htmlFor="animatedFeatureFilm">Best Animated Feature Film: </label>
                    <select name="animatedFeatureFilm" id="animatedFeatureFilm" defaultValue={findCurrentNom(props.animatedFeatureFilm)} onChange={updateNom}>
                        {nomOptions(props.animatedFeatureFilm)}
                    </select>
                </div>
                <div>
                    <label htmlFor="cinematography">Best Cinematography: </label>
                    <select name="cinematography" id="cinematography" defaultValue={findCurrentNom(props.cinematography)} onChange={updateNom}>
                        {nomOptions(props.cinematography)}
                    </select>
                </div>
                <div>
                    <label htmlFor="makeupAndHairstyling">Best Makeup and Hairstyling: </label>
                    <select name="makeupAndHairstyling" id="makeupAndHairstyling" defaultValue={findCurrentNom(props.makeupAndHairstyling)} onChange={updateNom}>
                        {nomOptions(props.makeupAndHairstyling)}
                    </select>
                </div>
                <div>
                    <label htmlFor="visualEffects">Best Visual Effects: </label>
                    <select name="visualEffects" id="visualEffects" defaultValue={findCurrentNom(props.visualEffects)} onChange={updateNom}>
                        {nomOptions(props.visualEffects)}
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

const Results = () => {
    console.log('hi sab!');
    
    return (
        <div className="results-table">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Bianca</th>
                        <th>Brett</th>
                        <th>Dave</th>
                        <th>Dom</th>
                        <th>Sam</th>
                        <th>Sissel</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Best Picture</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Director</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Actor</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Actress</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Supporting Actor</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Supporting Actress</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Adapted Screenplay</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Original Screenplay</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Animated Feature Film</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Cinematography</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Makeup and Hairstyling</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                    <tr>
                        <td>Best Visual Effects</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total Wins</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td>🙈</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

// ******************************************************************************************************************************************************

function App() {
    const [player, setPlayer] = useState(null);
    const [director, setDirector] = useState(null);
    const [picture, setPicture] = useState(null);
    const [actor, setActor] = useState(null);
    const [actress, setActress] = useState(null);
    const [supportingActor, setSupportingActor] = useState(null);
    const [supportingActress, setSupportingActress] = useState(null);
    const [adaptedScreenplay, setAdaptedScreenplay] = useState(null);
    const [originalScreenplay, setOriginalScreenplay] = useState(null);
    const [animatedFeatureFilm, setAnimatedFeatureFilm] = useState(null);
    const [cinematography, setCinematography] = useState(null);
    const [makeupAndHairstyling, setMakeupAndHairstyling] = useState(null);
    const [visualEffects, setVisualEffects] = useState(null);
    const [winners, setWinners] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        Promise
            .all([
                playerPromise,
                directorPromise,
                picturePromise,
                actorPromise,
                actressPromise,
                supportingactorPromise,
                supportingactressPromise,
                adaptedscreenplayPromise,
                originalscreenplayPromise,
                animatedfeaturefilmPromise,
                cinematographyPromise,
                makeupandhairstylingPromise,
                winnersPromise,
                visualeffectsPromise
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
                setActress(data.find(el => el.query.includes('"actress"]')).result);
                setSupportingActor(data.find(el => el.query.includes('"supportingActor"]')).result);
                setSupportingActress(data.find(el => el.query.includes('"supportingActress"]')).result);
                setAdaptedScreenplay(data.find(el => el.query.includes('"adaptedScreenplay"]')).result);
                setOriginalScreenplay(data.find(el => el.query.includes('"originalScreenplay"]')).result);
                setAnimatedFeatureFilm(data.find(el => el.query.includes('"animatedFeatureFilm"]')).result);
                setCinematography(data.find(el => el.query.includes('"cinematography"]')).result);
                setMakeupAndHairstyling(data.find(el => el.query.includes('"makeupAndHairstyling"]')).result);
                setWinners(data.find(el => el.query.includes('"winners"]')).result);
                setVisualEffects(data.find(el => el.query.includes('"visualEffects"]')).result);
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
            
            {dataFetched && path.includes('player') && <PlayerNoms
                player={player}
                director={director}
                picture={picture}
                actor={actor}
                actress={actress}
                supportingActor={supportingActor}
                supportingActress={supportingActress}
                adaptedScreenplay={adaptedScreenplay}
                originalScreenplay={originalScreenplay}
                animatedFeatureFilm={animatedFeatureFilm}
                cinematography={cinematography}
                makeupAndHairstyling={makeupAndHairstyling}
                visualEffects={visualEffects}
            />}

            <hr style={{margin: '50px 0'}} />

            {dataFetched && path.includes('winners') && <Winners
                director={director}
                picture={picture}
                actor={actor}
                actress={actress}
                supportingActor={supportingActor}
                supportingActress={supportingActress}
                adaptedScreenplay={adaptedScreenplay}
                originalScreenplay={originalScreenplay}
                animatedFeatureFilm={animatedFeatureFilm}
                cinematography={cinematography}
                makeupAndHairstyling={makeupAndHairstyling}
                visualEffects={visualEffects}
                winners={winners}
            />}

            <hr style={{margin: '50px 0'}} />

            {dataFetched && path.includes('results') && <Results
                player={player}
                director={director}
                picture={picture}
                actor={actor}
                actress={actress}
                supportingActor={supportingActor}
                supportingActress={supportingActress}
                adaptedScreenplay={adaptedScreenplay}
                originalScreenplay={originalScreenplay}
                animatedFeatureFilm={animatedFeatureFilm}
                cinematography={cinematography}
                makeupAndHairstyling={makeupAndHairstyling}
                visualEffects={visualEffects}
                winners={winners}
            />}
        </div>
    );
}

// ******************************************************************************************************************************************************

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
