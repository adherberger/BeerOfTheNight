import React, { useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_ADD_ENTRY } from '../utilities/constants';

import {
    StateInput,
    MainButton
} from '../components/components';

// Member enters their beer name and style.  Then addEntry is called on backened.
// The entryId along with beerName and beerStyle stored in game context.
const AddBeer = () => {
    const [beerName, setBeerName] = useState("");
    const [beerStyle, setBeerStyle] = useState("");
    const gameContext = useGameContext();
    const navigate = useNavigate();

    const addEntry = () => {
        axios.post(
            BOTN_ADD_ENTRY,
            { gameId: gameContext.game.gameId, memberId: gameContext.game.memberId, beerName: beerName, beerStyle: beerStyle }
        ).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                gameContext.setValue("entry", { entryId: response.data.entryId, beerName: beerName, beerStyle: beerStyle })
                console.log(gameContext)
                navigate("/lobby");
            } else if (response.status === 404) {
            }
        })
    }

    return (
        <>
            <div className="main-page">
                <div className="logo"><FaBeer /></div>
                <p>Please tell us about your beer:</p>
                <StateInput
                    id="beer-name-input"
                    title="Beer Name"
                    stateVar={beerName}
                    setStateVar={setBeerName}
                    autoFocus
                />
                <StateInput
                    id="beer-style-input"
                    title="Beer Style"
                    stateVar={beerStyle}
                    setStateVar={setBeerStyle}
                />
            </div>
            <MainButton
                text={"Submit Entry"}
                onClick={addEntry}
                disabled={!beerName || !beerStyle}
            />
        </>

    );
}

export default AddBeer;