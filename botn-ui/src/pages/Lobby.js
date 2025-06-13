import React, { useState, useEffect } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_ATTENDEES_TOPIC,
    PAGES,
    BOTN_SET_GAME_STATE,
    GAME_STATE,
    BOTN_UPDATE_ATTENDEES,
} from '../utilities/constants';
import {
    MainButton,
    MainPage,
    SecondaryButton,
} from '../components/components';

const Attendee = ({name, present, hasEntry, idx}) => {
    return (
        <div className={"attendee" + (idx % 2 === 0 ? " even" : " odd")}>
            <div className={`attendee-name${!present ? " not-present" : ""}`}>{(!present ? "*" : "") + name}</div>
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
        <div className="attendee-list center">
            <div>
            {
                attendees ? attendees.map((att, index) => (
                    <Attendee key={index} idx={index} name={att.name} hasEntry={att.hasEntry} present={att.present}/>
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
        topic: BOTN_ATTENDEES_TOPIC + gameContext.game.gameId
    });

    const canBeginVoting = attendees && attendees.every(att => !att.present || att.hasEntry);

    useEffect(() => {
        sendMessage(BOTN_UPDATE_ATTENDEES(gameContext.game.gameId));
    }, [])

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
            <MainPage>
                <div>
                    <div className="attendee-list-title">
                        {`Attendees (${attendees?.length}):`}
                    </div>
                    <AttendeeList attendees={attendees}/>
                </div>
                {
                    gameContext.entry ?
                    <>
                        <p>Hey now, we have recorded your entry!</p>
                        <p>{gameContext.game.brewerName}'s {gameContext.entry.beerName}<br/>(an expertly brewed {gameContext.entry.beerStyle})<br/>has been added!</p>
                        <SecondaryButton
                            text="Edit Entry"
                            onClick={addMyBeer}
                        />
                    </>
                    :
                    <SecondaryButton
                        text="Add Your Entry"
                        onClick={addMyBeer}
                    />
                }
            </MainPage>
            {
                gameContext.game?.isAdmin ?
                <MainButton
                text={"Begin Voting"}
                onClick={() => beginVoting()}
                disabled={!canBeginVoting}
                /> :
                <></>
            }
        </>
    )
}

export default Lobby;
