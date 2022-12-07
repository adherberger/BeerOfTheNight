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

const AddBeer = () => {
    const [beerName, setBeerName] = useState("");
    const [beerStyle, setBeerStyle] = useState("");
    const gameContext = useGameContext();
    const navigate = useNavigate();

    const addEntry = () => {
        console.log(gameContext)
        axios.post(
            BOTN_ADD_ENTRY,
            { gameId:gameContext.gameId,memberId:gameContext.memberId,beerName: beerName, beerStyle: beerStyle }
        ).then((response) => {
            if (response.status === 200) {
                navigate("/lobby");
            } else if (response.status === 404) {
            }
        })
    }
    
    return (
        <>
            <div className="main-page">
            <div className="logo"><FaBeer/></div>
                <p>Please tell us about your beer:</p>
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
            </div>
            <MainButton
                text={"Submit Entry"}
                onClick={addEntry}
            />
        </>

    );
}

export default AddBeer;