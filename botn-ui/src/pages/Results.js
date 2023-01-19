import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { BOTN_GET_RESULTS_FOR_GAME } from '../utilities/constants';
import { FaMedal } from 'react-icons/fa';

const Result = ({result, index, isOwnEntry}) => {
    let place;

    switch(index) {
        case 0: place = 'first';
        break;
        case 1: place = 'second';
        break;
        case 2: place = 'third';
        break;
    }

    return (
        <div
            id={"result-" + result.entryId}
            className={"result" + (place ? ` ${place}` : "") + (isOwnEntry ? " own-entry" : "")}
        >
            <div className="result-text">
                {
                    place ?
                    <FaMedal className="medal-icon"/> : <></>
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
    );
}

const ResultsList = ({results}) => {
    const gameContext = useGameContext();

    return (
        <div className="results-list">
        {
            results.length > 0 ?
            results.map((result, index) =>
                <Result index={index} result={result} isOwnEntry={gameContext.game?.gameId === result.entryId}/>
            ) :
            <></>
        }
        </div>
    )
}

const Results = () => {
    const gameContext = useGameContext();
    const [ results, setResults ] = useState([]);
    const [ resultsShown, setResultsShown ] = useState(gameContext?.game?.isAdmin);
    
    useEffect(() => {
        axios.get(BOTN_GET_RESULTS_FOR_GAME(gameContext?.game?.gameId ? gameContext.game.gameId : 100)).then(response => {
            console.log(response);
            setResults(response.data.resultsList);
        });
    }, []);

    return (
        <div className="main-page">
            <ResultsList results={results}/>
        </div>
    )
}

export default Results;