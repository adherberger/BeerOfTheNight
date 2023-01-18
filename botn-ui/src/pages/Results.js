import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { BOTN_GET_RESULTS_FOR_GAME } from '../utilities/constants';

const Result = (result) => {
    return (
        <div className="result">
            {`${result.brewer}'s ${result.beerStyle}`}
        </div>
    );
}

const ResultsList = (results) => {
    return (
        <div className="results-list">
        {
            results.length > 0 ?
            results.map(result =>
                <Result data={result}/>
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
        axios.get(BOTN_GET_RESULTS_FOR_GAME(gameContext.game.gameId)).then(response => {
            setResults(response);
        });
    });

    return (
        <div className="main-page">
            <ResultsList results={results}/>
        </div>
    )
}

export default Results;