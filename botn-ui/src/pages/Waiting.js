import React, { useEffect } from 'react';
import { FaCheck, FaBeer } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_VOTES_TOPIC,
    PAGES,
} from '../utilities/constants';
import {
    MainButton
} from '../components/components';

const Vote = ({ name, didVote, idx }) => {
    return (
        <div className={"attendee" + (idx % 2 === 0 ? " even" : " odd")}>
            <div className="attendee-name">{name}</div>
            <div className="flex-spacer" />
            {
                didVote ?
                    <div className="entry-indicator"><FaCheck /></div> :
                    <></>
            }
        </div>
    )
}

const VoteList = ({ votes }) => {
    return (
        <div className="attendee-list-wrapper">
            <div className="attendee-list-title">{"Voters (" + votes?.voteList.length + "):"}</div>
            <div className="attendee-list">
                {
                    votes ? votes.voteList.map((vote, index) => (
                        <Vote idx={index} name={vote.name} didVote={vote.didVote} />
                    )) : <></>
                }
            </div>
        </div>
    )
}

const Waiting = ({ navigate, sendMessage, useSubscription }) => {
    const gameContext = useGameContext();
    const gameState = useSubscription(BOTN_GAME_STATE_TOPIC+gameContext.game.gameId);
    const votes = useSubscription(BOTN_VOTES_TOPIC+gameContext.game.gameId, () => {
        sendMessage("/updateVotes/"+gameContext.game.gameId);
    });

    function goToResults() {
        sendMessage("/votingComplete/"+gameContext.game.gameId);
        navigate(PAGES.RESULTS);
    }

    return (
        <>
            <div className="main-page">
                <div className="logo"><FaBeer /></div>
                {
                votes?.allVotesIn ?
                <>
                    <h2>All votes are in!</h2>
                </>
                :
                <>
                    <h3>Waiting for voting to end</h3>
                </>
                }
                <VoteList votes={votes} />
                {
                }
            </div>
            {
                gameContext.game?.isAdmin ?
                    <MainButton
                        text={"Go to Results"}
                        onClick={() => goToResults()}
                        disabled={!votes?.allVotesIn}
                    /> :
                    <></>
            }
        </>
    )
}

export default Waiting;