import React, { useEffect } from 'react';
import {FaVoteYea } from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import {
    BOTN_VOTES_TOPIC,
    PAGES,
} from '../utilities/constants';
import {
    MainButton, MainPage
} from '../components/components';

const Vote = ({ name, didVote, idx }) => {
    return (
        <div className={"attendee" + (idx % 2 === 0 ? " even" : " odd")}>
            <div className={`attendee-name${didVote ? "" : " vote-not-received"}`}>{name}</div>
            <div className="flex-spacer" />
            {
                didVote ?
                    <div className="entry-indicator"><FaVoteYea /></div> :
                    <></>
            }
        </div>
    )
}

const VoteList = ({ votes }) => {
    const gameContext = useGameContext();
    console.log(gameContext.userVotes[0].brewer);

    const votesString = gameContext.userVotes[0].brewer + " 1st,  " + gameContext.userVotes[1].brewer + " 2nd,  " + gameContext.userVotes[2].brewer + " 3rd";

    return (
        <div className="center">
            <div className="attendee-list-title">{"Your votes: " + votesString }</div>
            <div className="attendee-list-title">{"Voters (" + votes?.voteList.filter((vote) => (vote.didVote)).length + "/" + votes?.voteList.length + "):"}</div>
            <div className="attendee-list">
                {
                    votes ? votes.voteList.map((vote, index) => (
                        <Vote key={index} idx={index} name={vote.name} didVote={vote.didVote} />
                    )) : <></>
                }
            </div>
        </div>
    )
}

export const Waiting = ({ navigate, sendMessage, useSubscription }) => {
    const gameContext = useGameContext();

    const votes = useSubscription({
        topic: BOTN_VOTES_TOPIC+gameContext.game.gameId,
    });

    useEffect(() => {
        sendMessage("/updateVotes/" + gameContext.game.gameId);
    })

    function goToResults() {
        sendMessage("/votingComplete/" + gameContext.game.gameId);
        navigate(PAGES.RESULTS);
    }

    return (
        <>
            <MainPage title={votes?.allVotesIn ? "All votes are in!" : "Waiting for voting to end"}>
                <VoteList votes={votes} />
            </MainPage>
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
