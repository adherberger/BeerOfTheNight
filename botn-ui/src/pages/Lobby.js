import React, { useEffect } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_ATTENDEES_TOPIC,
} from '../utilities/constants';
import {
    MainButton,
    SecondaryButton,
} from '../components/components';

const Attendee = ({name, hasEntry, idx}) => {
    return (
        <div className={"attendee" + (idx % 2 === 0 ? " even" : " odd")}>
            <div className="attendee-name">{name}</div>
            <div className="flex-spacer"/>
            {
                hasEntry ?
                <div className="entry-indicator"><FaBeer/></div> :
                <></>
            }
        </div>
    )
}

const AttendeeList = ({attendees}) => {
    return (
        <div className="attendee-list-wrapper">
            <div className="attendee-list-title">{"Attendees (" + attendees?.length + "):"}</div>
            <div className="attendee-list">
            {
                attendees ? attendees.map((att, index) => (
                    <Attendee idx={index} name={att.name} hasEntry={att.hasEntry}/>
                )) : <></>
            }
            </div>
        </div>
    )
}

// Waiting room until voting begins.  
// Member may click to add their beer entry.
const Lobby = ({sendMessage, useSubscription}) => {
    const gameContext = useGameContext();

    const gameState = useSubscription(BOTN_GAME_STATE_TOPIC+gameContext.game.gameId);
    const attendees = useSubscription(BOTN_ATTENDEES_TOPIC+gameContext.game.gameId, () => {
        sendMessage("/updateAttendees/"+gameContext.game.gameId);
    });
    const navigate = useNavigate();

    //Quick hack to allow Admin role for seeded game data
    //Join one of the static games with name Admin!
    if (gameContext.game?.brewerName === "Admin") {
        gameContext.game.isAdmin = true;
    }

    useEffect(() => {
        if(gameState === "IN_PROGRESS") {
            navigate("/voting");
        }
    }, [gameState]);

    function addMyBeer() {
        navigate("/addBeer");
    }

    function beginVoting() {
        sendMessage("/startVoting/"+gameContext.game.gameId);
    }

    return (
        <>
            <div className="main-page">
                <div>
                    <div className="logo"><FaBeer /></div>
                    <h3>Waiting for voting to begin</h3>
                    <AttendeeList attendees={attendees}/>

                    {
                    gameContext.entry ?
                        <>
                            <p>Hey now, we have recorded your entry!</p>
                            <p>{gameContext.game.brewerName}'s {gameContext.entry.beerName}<br/>(an expertly brewed {gameContext.entry.beerStyle})<br/>has been added!</p>
                        </>
                        :
                        <>
                            <p>Click the button below if you have a beer to enter!</p>
                            <SecondaryButton
                                text="Add Your Entry"
                                onClick={addMyBeer}
                                disabled={!!gameContext.entry}
                            />
                        </>
                    }
                </div>
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