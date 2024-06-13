import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Counter from "./components/Counter";
import { Provider } from 'react-redux';
import store from './store/store';
import './index.scss';

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
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

const path = window.location.pathname;

// ******************************************************************************************************************************************************

const PlayerNoms = (props) => {
    const playerNameOriginal = path.split('/')[4];
    const playerName = playerNameOriginal.charAt(0).toUpperCase() + playerNameOriginal.slice(1); // all this just to capitalize the first letter! 😡
    
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
                Authorization: `Bearer skI0d4xskBFHNAirGclytO5ECIOZSyER87pRUSDHeEtw75M5diC5e3PZtugpWJwRqjcsq8huDkn3AY3gUrqG1ddJIEBIjiyE6vPr3F3IC3GV3goG752aKMJg5AeQZNJ9GfZPzcH9uL0NgNYzkedEmmqAEF684akIYc2Seya3bMNVsHEdExV6`
            },
            body: JSON.stringify({mutations})
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))
    }

    const authCheck = () => {
        const authCode = path.split('/')[5];

		// https://www.random.org/strings/
        
        if (playerName === 'Alyssa' && authCode === process.env.REACT_APP_PLAYER_TOKEN_ALYSSA) {
            return true;
        } else if (playerName === 'Bianca' && authCode === process.env.REACT_APP_PLAYER_TOKEN_BIANCA) {
            return true;
		} else if (playerName === 'Brett' && authCode === process.env.REACT_APP_PLAYER_TOKEN_BRETT) {
            return true;
        } else if (playerName === 'Dave' && authCode === process.env.REACT_APP_PLAYER_TOKEN_DAVE) {
            return true;
        } else if (playerName === 'Dom' && authCode === process.env.REACT_APP_PLAYER_TOKEN_DOM) {
            return true;
		} else if (playerName === 'Lee' && authCode === process.env.REACT_APP_PLAYER_TOKEN_LEE) {
            return true;
        } else if (playerName === 'Sam' && authCode === process.env.REACT_APP_PLAYER_TOKEN_SAM) {
            return true;
        } else if (playerName === 'Sissel' && authCode === process.env.REACT_APP_PLAYER_TOKEN_SISSEL) {
            return true;
        } else {
            return false;
        }
    }

    const testFunc = (e) => {
        e.preventDefault();
        const noms = e.target.elements;
        let unselectedNoms = false;

        for (const nom of noms) {
            if (nom.value === '-- Please select a nominee!') {
                unselectedNoms = true;
            }
        }

        if (unselectedNoms) {
            alert('Please make sure you select a nomination in every category!')
        } else {
            if (window.confirm('Thanks for playing! You can make changes to your nominations up until the day of the Oscars. Check out the results here!')) {
                console.log('huh?');
                window.location.href = "/oscars-showdown/2024/results";
            }
        }
    }
    
	var deadlineDate = new Date('2024-03-10');
	let deadlineExpired = false;

	Date.now() > deadlineDate.getTime() ? deadlineExpired = true : deadlineExpired = false;
	
	if (!authCheck()) {
        return (
            <div className="nedry-block"><div><img src="https://coolmoviemerch.com/oscars-showdown/2024/nedry.webp" /></div></div>
        );
    }
    
    return (
        <div>
            <h2>Nominations for <strong>{playerName}</strong></h2>
            <div className="nom-wrapper">
                <form onSubmit={testFunc}>
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
                        <input type="submit" />
                    </div>
                </form>
            </div>
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
                Authorization: `Bearer skI0d4xskBFHNAirGclytO5ECIOZSyER87pRUSDHeEtw75M5diC5e3PZtugpWJwRqjcsq8huDkn3AY3gUrqG1ddJIEBIjiyE6vPr3F3IC3GV3goG752aKMJg5AeQZNJ9GfZPzcH9uL0NgNYzkedEmmqAEF684akIYc2Seya3bMNVsHEdExV6`
            },
            body: JSON.stringify({mutations})
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))
    }
    
    return (
        <div>
            <h2><strong>Winners!</strong></h2>
            <div className="nom-wrapper">
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
                </form>
            </div>
        </div>
    );
}

// ******************************************************************************************************************************************************

const Results = (props) => {
    const winners = props.winners[0];

    const playerScore = (player) => {
        const playerData = props.player.find(el => el.name.includes(player));
        let score = 0;

        for (const playerNom in playerData) {
            if (playerData[playerNom] !== '-- Please select a nominee!' && playerData[playerNom] === winners[playerNom]) {
                score++;
            }
        }

        return score;
    }

    const verdict = (player, category) => {
        const playerData = props.player.find(el => el.name.includes(player));
        const playerNom = playerData[category];
        const winner = winners[category];

        if (winner === '-- Please select a nominee!') {
            return '🙈';
        }

        switch(playerNom) {
            case '-- Please select a nominee!':
                return '🙈';
            case winner:
                return '✅';
            default:
                return '❌';
        }
    }
    
    return (
        <div>
            <h2>And the award goes to...</h2>
            <div className="results-wrapper">
                <div className="results-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Alyssa</th>
								<th>Bianca</th>
                                <th>Brett</th>
                                <th>Dave</th>
                                <th>Dom</th>
								<th>Lee</th>
                                <th>Sam</th>
                                <th>Sissel</th>
                                <th>Oscar Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Best Picture</td>
                                <td>{verdict('Alyssa', 'picture')}</td>
								<td>{verdict('Bianca', 'picture')}</td>
                                <td>{verdict('Brett', 'picture')}</td>
                                <td>{verdict('Dave', 'picture')}</td>
                                <td>{verdict('Dom', 'picture')}</td>
								<td>{verdict('Lee', 'picture')}</td>
                                <td>{verdict('Sam', 'picture')}</td>
                                <td>{verdict('Sissel', 'picture')}</td>
                                <td>{winners['picture'] === '-- Please select a nominee!' ? '🙈' : winners['picture']}</td>
                            </tr>
                            <tr>
                                <td>Best Director</td>
                                <td>{verdict('Alyssa', 'director')}</td>
								<td>{verdict('Bianca', 'director')}</td>
                                <td>{verdict('Brett', 'director')}</td>
                                <td>{verdict('Dave', 'director')}</td>
                                <td>{verdict('Dom', 'director')}</td>
								<td>{verdict('Lee', 'director')}</td>
                                <td>{verdict('Sam', 'director')}</td>
                                <td>{verdict('Sissel', 'director')}</td>
                                <td>{winners['director'] === '-- Please select a nominee!' ? '🙈' : winners['director']}</td>
                            </tr>
                            <tr>
                                <td>Best Actor</td>
                                <td>{verdict('Alyssa', 'actor')}</td>
								<td>{verdict('Bianca', 'actor')}</td>
                                <td>{verdict('Brett', 'actor')}</td>
                                <td>{verdict('Dave', 'actor')}</td>
                                <td>{verdict('Dom', 'actor')}</td>
								<td>{verdict('Lee', 'actor')}</td>
                                <td>{verdict('Sam', 'actor')}</td>
                                <td>{verdict('Sissel', 'actor')}</td>
                                <td>{winners['actor'] === '-- Please select a nominee!' ? '🙈' : winners['actor']}</td>
                            </tr>
                            <tr>
                                <td>Best Actress</td>
                                <td>{verdict('Alyssa', 'actress')}</td>
								<td>{verdict('Bianca', 'actress')}</td>
                                <td>{verdict('Brett', 'actress')}</td>
                                <td>{verdict('Dave', 'actress')}</td>
                                <td>{verdict('Dom', 'actress')}</td>
								<td>{verdict('Lee', 'actress')}</td>
                                <td>{verdict('Sam', 'actress')}</td>
                                <td>{verdict('Sissel', 'actress')}</td>
                                <td>{winners['actress'] === '-- Please select a nominee!' ? '🙈' : winners['actress']}</td>
                            </tr>
                            <tr>
                                <td>Best Supporting Actor</td>
                                <td>{verdict('Alyssa', 'supportingActor')}</td>
								<td>{verdict('Bianca', 'supportingActor')}</td>
                                <td>{verdict('Brett', 'supportingActor')}</td>
                                <td>{verdict('Dave', 'supportingActor')}</td>
                                <td>{verdict('Dom', 'supportingActor')}</td>
								<td>{verdict('Lee', 'supportingActor')}</td>
                                <td>{verdict('Sam', 'supportingActor')}</td>
                                <td>{verdict('Sissel', 'supportingActor')}</td>
                                <td>{winners['supportingActor'] === '-- Please select a nominee!' ? '🙈' : winners['supportingActor']}</td>
                            </tr>
                            <tr>
                                <td>Best Supporting Actress</td>
                                <td>{verdict('Alyssa', 'supportingActress')}</td>
								<td>{verdict('Bianca', 'supportingActress')}</td>
                                <td>{verdict('Brett', 'supportingActress')}</td>
                                <td>{verdict('Dave', 'supportingActress')}</td>
                                <td>{verdict('Dom', 'supportingActress')}</td>
								<td>{verdict('Lee', 'supportingActress')}</td>
                                <td>{verdict('Sam', 'supportingActress')}</td>
                                <td>{verdict('Sissel', 'supportingActress')}</td>
                                <td>{winners['supportingActress'] === '-- Please select a nominee!' ? '🙈' : winners['supportingActress']}</td>
                            </tr>
                            <tr>
                                <td>Best Adapted Screenplay</td>
                                <td>{verdict('Alyssa', 'adaptedScreenplay')}</td>
								<td>{verdict('Bianca', 'adaptedScreenplay')}</td>
                                <td>{verdict('Brett', 'adaptedScreenplay')}</td>
                                <td>{verdict('Dave', 'adaptedScreenplay')}</td>
                                <td>{verdict('Dom', 'adaptedScreenplay')}</td>
								<td>{verdict('Lee', 'adaptedScreenplay')}</td>
                                <td>{verdict('Sam', 'adaptedScreenplay')}</td>
                                <td>{verdict('Sissel', 'adaptedScreenplay')}</td>
                                <td>{winners['adaptedScreenplay'] === '-- Please select a nominee!' ? '🙈' : winners['adaptedScreenplay']}</td>
                            </tr>
                            <tr>
                                <td>Best Original Screenplay</td>
                                <td>{verdict('Alyssa', 'originalScreenplay')}</td>
								<td>{verdict('Bianca', 'originalScreenplay')}</td>
                                <td>{verdict('Brett', 'originalScreenplay')}</td>
                                <td>{verdict('Dave', 'originalScreenplay')}</td>
                                <td>{verdict('Dom', 'originalScreenplay')}</td>
								<td>{verdict('Lee', 'originalScreenplay')}</td>
                                <td>{verdict('Sam', 'originalScreenplay')}</td>
                                <td>{verdict('Sissel', 'originalScreenplay')}</td>
                                <td>{winners['originalScreenplay'] === '-- Please select a nominee!' ? '🙈' : winners['originalScreenplay']}</td>
                            </tr>
                            <tr>
                                <td>Best Animated Feature Film</td>
                                <td>{verdict('Alyssa', 'animatedFeatureFilm')}</td>
								<td>{verdict('Bianca', 'animatedFeatureFilm')}</td>
                                <td>{verdict('Brett', 'animatedFeatureFilm')}</td>
                                <td>{verdict('Dave', 'animatedFeatureFilm')}</td>
                                <td>{verdict('Dom', 'animatedFeatureFilm')}</td>
								<td>{verdict('Lee', 'animatedFeatureFilm')}</td>
                                <td>{verdict('Sam', 'animatedFeatureFilm')}</td>
                                <td>{verdict('Sissel', 'animatedFeatureFilm')}</td>
                                <td>{winners['animatedFeatureFilm'] === '-- Please select a nominee!' ? '🙈' : winners['animatedFeatureFilm']}</td>
                            </tr>
                            <tr>
                                <td>Best Cinematography</td>
                                <td>{verdict('Alyssa', 'cinematography')}</td>
								<td>{verdict('Bianca', 'cinematography')}</td>
                                <td>{verdict('Brett', 'cinematography')}</td>
                                <td>{verdict('Dave', 'cinematography')}</td>
                                <td>{verdict('Dom', 'cinematography')}</td>
								<td>{verdict('Lee', 'cinematography')}</td>
                                <td>{verdict('Sam', 'cinematography')}</td>
                                <td>{verdict('Sissel', 'cinematography')}</td>
                                <td>{winners['cinematography'] === '-- Please select a nominee!' ? '🙈' : winners['cinematography']}</td>
                            </tr>
                            <tr>
                                <td>Best Makeup and Hairstyling</td>
                                <td>{verdict('Alyssa', 'makeupAndHairstyling')}</td>
								<td>{verdict('Bianca', 'makeupAndHairstyling')}</td>
                                <td>{verdict('Brett', 'makeupAndHairstyling')}</td>
                                <td>{verdict('Dave', 'makeupAndHairstyling')}</td>
                                <td>{verdict('Dom', 'makeupAndHairstyling')}</td>
								<td>{verdict('Lee', 'makeupAndHairstyling')}</td>
                                <td>{verdict('Sam', 'makeupAndHairstyling')}</td>
                                <td>{verdict('Sissel', 'makeupAndHairstyling')}</td>
                                <td>{winners['makeupAndHairstyling'] === '-- Please select a nominee!' ? '🙈' : winners['makeupAndHairstyling']}</td>
                            </tr>
                            <tr>
                                <td>Best Visual Effects</td>
                                <td>{verdict('Alyssa', 'visualEffects')}</td>
								<td>{verdict('Bianca', 'visualEffects')}</td>
                                <td>{verdict('Brett', 'visualEffects')}</td>
                                <td>{verdict('Dave', 'visualEffects')}</td>
                                <td>{verdict('Dom', 'visualEffects')}</td>
								<td>{verdict('Lee', 'visualEffects')}</td>
                                <td>{verdict('Sam', 'visualEffects')}</td>
                                <td>{verdict('Sissel', 'visualEffects')}</td>
                                <td>{winners['visualEffects'] === '-- Please select a nominee!' ? '🙈' : winners['visualEffects']}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total Wins</td>
                                <td>{playerScore('Alyssa')}</td>
								<td>{playerScore('Bianca')}</td>
                                <td>{playerScore('Brett')}</td>
                                <td>{playerScore('Dave')}</td>
                                <td>{playerScore('Dom')}</td>
								<td>{playerScore('Lee')}</td>
                                <td>{playerScore('Sam')}</td>
                                <td>{playerScore('Sissel')}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
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
            <Counter />
			<h1>Oscars Showdown 2024</h1>
                        
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
const rootInstance = root;
rootInstance.render(
  <Provider store={store}>
    <App />
  </Provider>
);
