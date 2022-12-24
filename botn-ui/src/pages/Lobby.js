import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../utilities/use-websocket';

import {
    MainButton
} from '../components/components';

const Attendee = ({name, hasEntry}) => {
    return (
        <div className="attendee">
            <div className="attendee-name">{name}</div>
            {
                hasEntry ?
                <div className="entry-indicator"><FaBeer/></div> :
                <></>
            }
        </div>
    )
}

const AttendeeList = () => {
    const { lastMessage } = useWebSocket("http://localhost:8080/game", "/botn/attendees");

    return (
        <div>
            <div>Last message:</div>
            {lastMessage}
        </div>
    )
}

// Waiting room until voting begins.  
// Member may click to add their been entry.
const Lobby = () => {
    const gameContext = useGameContext();
    const navigate = useNavigate();

    function handleClick() {
        navigate("/addBeer");
    }

    // THis is the initial Lobby page
    function welcomeToLobby() {
        return (
            <>
                <div className="main-page">
                    <AttendeeList/>
                    <div className="logo"><FaBeer /></div>
                    <h3>Waiting for voting to begin</h3>
                    <p>Click the button below if you have a beer to enter!</p>
                </div>

                <MainButton
                    text={"Add Your Entry"}
                    onClick={handleClick}
                    disabled={gameContext.entry}
                />
            </>

        );

    }

    // This will display when the user has added their beer information
    function entryAdded() {
        return (
            <>
                <div className="main-page">
                    <div className="logo"><FaBeer /></div>
                    <h3>Waiting for voting to begin</h3>
                    <p>Hey now, we have recorded your entry!</p>
                    <p>{gameContext.game.brewerName}'s {gameContext.entry.beerName}<br/>(an expertly brewed {gameContext.entry.beerStyle})<br/>has been added!</p>

                </div>
            </>

        );

    }

    // Determine which html to render based on whether the user's beer has been added
    if (gameContext.entry) {
        return entryAdded()
    } else {
        return welcomeToLobby()
    }
}

export default Lobby;