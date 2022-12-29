import React, { useEffect } from 'react';
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

// Waiting room until voting begins.  
// Member may click to add their beer entry.
const Lobby = ({sendMessage, useSubscription}) => {
    //const { useSubscription } = useWebSocket("http://localhost:8080/game", "/botn/game-state");
    // const { sendMessage, lastMessage } = useSubscription("/botn/game-state");

    const lastMessage = useSubscription("/botn/game-state");
    const gameContext = useGameContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(lastMessage === "IN_PROGRESS") {
            navigate("/voting");
        }
    }, [lastMessage]);

    function handleClick() {
        navigate("/addBeer");
    }

    function beginVoting() {
        sendMessage("/startVoting", gameContext.game.gameId);
    }

    return (
        <>
            <div className="main-page">
                <div className="logo"><FaBeer /></div>
                <h3>Waiting for voting to begin</h3>
                {
                gameContext.entry ?
                    <>
                        <p>Hey now, we have recorded your entry!</p>
                        <p>{gameContext.game.brewerName}'s {gameContext.entry.beerName}<br/>(an expertly brewed {gameContext.entry.beerStyle})<br/>has been added!</p>
                    </>
                    :
                    <>
                        <p>Click the button below if you have a beer to enter!</p>
                        <button
                            onClick={handleClick}
                            disabled={!!gameContext.entry}
                        >
                            Add Your Entry
                        </button>
                    </>
                }
            </div>
            {
                gameContext.game?.isAdmin ?
                <MainButton
                text={"Begin Voting"}
                onClick={() => beginVoting()}
                /> :
                <></>
            }
        </>
    )
}

export default Lobby;