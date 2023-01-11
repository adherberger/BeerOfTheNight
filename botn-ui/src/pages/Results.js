import React, { useEffect } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_VOTES_TOPIC,
} from '../utilities/constants';
import {
    MainButton
} from '../components/components';

const Vote = ({name, didVote, idx}) => {
    return (
        <div className={"attendee" + (idx % 2 === 0 ? " even" : " odd")}>
            <div className="attendee-name">{name}</div>
            <div className="flex-spacer"/>
            {
                {didVote} ?
                <div className="entry-indicator"><FaBeer/></div> :
                <>foo</>
            }
        </div>
    )
}

const VoteList = ({votes}) => {
    return (
        <div className="attendee-list-wrapper">
            <div className="attendee-list-title">{"Voters (" + votes?.length + "):"}</div>
            <div className="attendee-list">
            {
                votes ? votes.map((vote, index) => (
                    <Vote idx={index} name={vote.name} didVote={vote.didVote}/>
                )) : <></>
            }
            </div>
        </div>
    )
}

const Results = ({sendMessage, useSubscription}) => {
    const gameState = useSubscription(BOTN_GAME_STATE_TOPIC);
    const votes = useSubscription(BOTN_VOTES_TOPIC, () => {
        sendMessage("/updateVotes", gameContext.game.gameId);
    });
    const gameContext = useGameContext();
    const navigate = useNavigate();

/*    useEffect(() => {
        if(gameState === "IN_PROGRESS") {
            navigate("/voting");
        }
    }, [gameState]);
*/

    function handleClick() {
    }

    function shareResults() {
        sendMessage("/shareResults", gameContext.game.gameId);
    }

    return (
        <>
            <div className="main-page">
                <div className="logo"><FaBeer /></div>
                <h3>Waiting for voting to end</h3>
                <VoteList votes={votes}/>
                {
                }
            </div>
            {
                gameContext.game?.isAdmin ?
                <MainButton
                text={"Share Results"}
                onClick={() => shareResults()}
                /> :
                <></>
            }
        </>
    )
}

export default Results;