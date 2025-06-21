import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { BOTN_GET_RESULTS_FOR_GAME} from '../utilities/constants';
import { FaMedal } from 'react-icons/fa';
import { BeerCard, MainButton, MainPage } from '../components/components';

const Voter = ({name, place, index, last}) => {
    return (
        <div key={index} className={"voter" + (index % 2 === 0 ? " even" : " odd") + (last ? " last" : "")}>
            <div className="voter-name">
                {name}
            </div>
            <div className="voter-place">
                {place}
            </div>
        </div>
    );
}

const VoterList = ({voters}) => {
    return (
        <div className="result-votes">
        {
            voters.map((voter, index) => (
                <Voter name={voter.name} place={voter.place} index={index} last={index === voters.length - 1}/>
            ))
        }
        </div>
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
        default:
    }

    const onClick = isAdmin ? () => {
        setShowVotes(!showVotes);
    } : () => {}

    if(isOwnEntry && place === 'first') {
        // show confetti
    }

    return (
        <BeerCard
            id={"result-" + result.entryId}
            badge={place ? <FaMedal className="medal-icon"/> : <></>}
            title={`${result.brewer}'s ${result.beerStyle} ${isOwnEntry ? "(Your Entry)" : ""}`}
            description={`${result.beerName ? "\"" + result.beerName + "\"" : ""}`}
            tail={<div className="beer-score">{result.score}</div>}
            className={(place ? ` ${place}` : "") + (showVotes ? " votes-shown" : "") + (isOwnEntry ? " own-entry" : "")}
            onClick={onClick}
            footer={showVotes ? <VoterList voters={result.voters}/> : <></>}
        />
    );
}

const ResultsList = ({results}) => {

    const gameContext = useGameContext();
    const votesString = gameContext.userVotes[0].brewer + " 1st,  " + gameContext.userVotes[1].brewer + " 2nd,  " + gameContext.userVotes[2].brewer + " 3rd";

    return (
        <div className="results-list">
        <div className="attendee-list-title">{"Your votes: " + votesString }</div>
        {
            results.length > 0 ?
            results.map((result, index) =>
                <Result index={index} result={result} isOwnEntry={gameContext.entry?.entryId === result.entryId} isAdmin={gameContext.game?.isAdmin}/>
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
    
    useEffect(() => {
        axios.get(BOTN_GET_RESULTS_FOR_GAME(gameContext?.game?.gameId ? gameContext.game.gameId : 100)).then(response => {
            console.log(response);
            setResults(response.data);
        });
    });

    // updates game state so that everyone in the game gets brought to results page
    const revealResults = () => {
        setResultsShown(true);
        sendMessage("/revealResults/"+gameContext.game.gameId);
    }

    return (
        <>
            <MainPage>
                
                <ResultsList results={results}/>
            </MainPage>
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