import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { BOTN_GET_RESULTS_FOR_GAME, BOTN_GAME_STATE_TOPIC, GAME_STATE } from '../utilities/constants';
import { FaMedal, FaBeer } from 'react-icons/fa';
import { BigIconWithMessage, MainButton } from '../components/components';

const Vote = ({vote}) => {

}

const VoteList = ({votes}) => {
    return (
        <div className="result-votes">Hello</div>
    )
}

const Result = ({result, index, isOwnEntry, isAdmin}) => {
    const [ showVotes, setShowVotes ] = useState(false);
    let place;

    switch(index) {
        case 0: place = 'first';
        break;
        case 1: place = 'second';
        break;
        case 2: place = 'third';
        break;
    }

    const onClick = isAdmin ? () => {
        setShowVotes(!showVotes);
    } : () => {}

    if(isOwnEntry && place === 'first') {
        // show confetti
    }

    return (
        <div
            id={"result-" + result.entryId}
            className="result"
            onClick={onClick}
        >
            <div className={"result-item" + (place ? ` ${place}` : "") + (isOwnEntry ? " own-entry" : "") + (isAdmin ? " admin" : "") + (showVotes ? " votes-shown" : "")}>
                <div className="result-text">
                    {
                        place ?
                        <FaMedal className="medal-icon"/>
                        : <></>
                    }
                    <div className="result-name">
                        <div className="result-description">
                            {`${result.brewer}'s ${result.beerStyle}`}
                        </div>
                        {
                            result.beerName ?
                            <div className="result-given-name">
                                {`"${result.beerName}"`}
                            </div> :
                            <></>
                        }
                    </div>
                </div>
                <div className="result-score">
                    {`${result.score}`}
                </div>
            </div>
            {
                showVotes ?
                <VoteList/> :
                <></>
            }
        </div>
    );
}

const ResultsList = ({results}) => {
    const gameContext = useGameContext();

    return (
        <div className="results-list">
        {
            results.length > 0 ?
            results.map((result, index) =>
                <Result index={index} result={result} isOwnEntry={gameContext.game?.gameId === result.entryId} isAdmin={gameContext.game?.isAdmin}/>
            ) :
            <></>
        }
        </div>
    )
}

const Results = ({sendMessage, useSubscription}) => {
    const gameContext = useGameContext();
    const [ results, setResults ] = useState([]);
    const [ resultsShown, setResultsShown ] = useState(false);

    const gameState = useSubscription(BOTN_GAME_STATE_TOPIC);

    useEffect(() => {
        if(gameState === GAME_STATE.COMPLETE) {
            setResultsShown(true);
        }
    }, [gameState]);
    
    useEffect(() => {
        axios.get(BOTN_GET_RESULTS_FOR_GAME(gameContext?.game?.gameId ? gameContext.game.gameId : 100)).then(response => {
            console.log(response);
            setResults(response.data.resultsList);
        });
    }, []);

    const revealResults = () => {
        sendMessage("/revealResults", gameContext.game.gameId);
    }

    return (
        <>
            <div className="main-page">
                {
                    resultsShown || gameContext.game?.isAdmin ?
                    <ResultsList results={results}/> :
                    <BigIconWithMessage
                        title="The results are in!"
                        subtitle="Waiting for admin to share results."
                        icon={<FaBeer/>}
                    />
                }
                
            </div>
            {
                gameContext.game?.isAdmin && !resultsShown ?
                    <MainButton
                    text={"Reveal Results"}
                    onClick={revealResults}
                    disabled={false}
                /> :
                <></>
            }
        </>
    )
}

export default Results;