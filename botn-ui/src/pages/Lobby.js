import React from 'react';
import { FaBeer } from 'react-icons/fa';
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

    function welcomeToLobby() {
        return (
            <>
                <div className="main-page">
                    <div className="logo"><FaBeer /></div>
                    <h4>Waiting for voting to begin</h4>

                </div>

                <MainButton
                    text={"Add Your Entry"}
                    onClick={handleClick}
                    disabled={gameContext.entry}
                />
            </>

        );

    }

    function entryAdded() {
        return (
            <>
                <div className="main-page">
                    <div className="logo"><FaBeer /></div>
                    <p>Hey now, we have recorded your entry!</p>
                    <p>{gameContext.game.brewerName}'s {gameContext.entry.beerName}<br/>(an expertly brewed {gameContext.entry.beerStyle})<br/>has been added!</p>
                    <p>Waiting for voting to begin</p>

                </div>
            </>

        );

    }


    if (gameContext.entry) {
        return entryAdded()
    } else {
        return welcomeToLobby()
    }
}

export default Lobby;