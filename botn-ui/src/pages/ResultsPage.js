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
        results.map(result =>
            <Result data={result}/>
        )
    )
}

const ResultsPage = () => {
    const gameContext = useGameContext();
    const [ results, setResults ] = useState([]);
    
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

export default ResultsPage