import React, { useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_ADD_ENTRY_FOR, PAGES } from '../utilities/constants';

import {
    StateInput,
    MainButton,
    SecondaryButton
} from '../components/components';

// Member enters their beer name and style.  Then addEntry is called on backened.
// The entryId along with beerName and beerStyle stored in game context.
const AddBeerFor = ({setShow}) => {
    const [brewerName, setBrewerName] = useState("");
    const [beerName, setBeerName] = useState("");
    const [beerStyle, setBeerStyle] = useState("");
    const gameContext = useGameContext();

    const addEntry = () => {
        axios.post(
            BOTN_ADD_ENTRY_FOR,
            {
                gameId: gameContext.game.gameId,
                brewerName: brewerName,
                beerName: beerName,
                beerStyle: beerStyle
            }
        ).then((response) => {
            if (response.status === 200) {
                // show notification!
            } else if (response.status === 404) {
            }

            setShow(false);
        })
    }

    return (
        <>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <div className="logo"><FaBeer /></div>
                <p>Enter member and beer info:</p>
                <StateInput
                    id="brewer-name-input"
                    title="Brewer Name"
                    stateVar={brewerName}
                    setStateVar={setBrewerName}
                    autoFocus
                />
                <StateInput
                    id="beer-name-input"
                    title="Beer Name"
                    stateVar={beerName}
                    setStateVar={setBeerName}
                />
                <StateInput
                    id="beer-style-input"
                    title="Beer Style"
                    stateVar={beerStyle}
                    setStateVar={setBeerStyle}
                />
                <SecondaryButton
                    onClick={addEntry}
                    text="Submit"
                />
            </div>
        </>

    );
}

export default AddBeerFor;