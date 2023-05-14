import React, { useState, useEffect } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_ATTENDEES_TOPIC,
    PAGES,
    BOTN_SET_GAME_STATE,
    GAME_STATE,
} from '../utilities/constants';
import {
    MainButton,
    MainPage,
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
                    <Attendee key={index} idx={index} name={att.name} hasEntry={att.hasEntry}/>
                )) : <></>
            }
            </div>
        </div>
    )
}

// Waiting room until voting begins.  
// Member may click to add their beer entry.
const Lobby = ({navigate, sendMessage, useSubscription}) => {
    const gameContext = useGameContext();

    const attendees = useSubscription({
        topic: BOTN_ATTENDEES_TOPIC + gameContext.game.gameId,
        callback: () => {
            sendMessage("/updateAttendees/" + gameContext.game.gameId);
        }
    });

    useEffect(() => {
        console.log(attendees);
    }, [attendees])

    function addMyBeer() {
        navigate(PAGES.ADD_BEER);
    }

    function beginVoting() {
        sendMessage(BOTN_SET_GAME_STATE(gameContext.game.gameId), {
            gameState: GAME_STATE.VOTING,
        });
    }

    return (
        <>
            <MainPage title="Waiting for voting to begin">
                <div>
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
            </MainPage>
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