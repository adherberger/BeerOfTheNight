import React, {useState}  from 'react';
import { FaBeer} from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';

import {
    MainButton
} from '../components/components';

const Lobby = () => {
    const gameContext = useGameContext();
    const navigate = useNavigate();

    function handleClick() {
        navigate("/addBeer");
      }    
    return (
        <>
            <div className="main-page">
            <div className="logo"><FaBeer/></div>
                <h4>Waiting for voting to begin</h4>

            </div>
            <MainButton
                text={"Add Your Entry"}
                onClick={handleClick}
            />
        </>

    );
}

export default Lobby;