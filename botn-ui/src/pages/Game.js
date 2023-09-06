import { React, useEffect, useState } from 'react';
import '../styles/App.css';
import AddBeer from './AddBeer';
import AddBeerFor from './AddBeerFor';
import JoinRoom from './JoinRoom';
import Lobby from './Lobby';
import Results from './Results';
import VotingPage from './VotingPage';
import Waiting from './Waiting';
import WaitingForResults from './WaitingForResults';

import { useGameContext } from '../utilities/game-context';
import { useWebSocket } from '../utilities/use-websocket';

import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_WEBSOCKET_BASE,
    GAME_STATE,
    PAGES
} from '../utilities/constants';

function Game({gameState, sendMessage, useSubscription}) {
    const [currentPage, setCurrentPage] = useState(<JoinRoom navigate={navigate}/>);
    // const { sendMessage, useSubscription } = useWebSocket(BOTN_WEBSOCKET_BASE);
    const gameContext = useGameContext();

    // Subscribe to game state updates, but only after game is established (game is in deps)
    // const gameState = useSubscription({
    //     topic: BOTN_GAME_STATE_TOPIC(gameContext.game),
    //     deps: [gameContext.game],
    //     retry: [gameContext],
    // });

    function goToPageForGameState(gameState) {
        switch(gameState) {
            case GAME_STATE.INIT:
                navigate(PAGES.LOBBY);
                break;
            case GAME_STATE.VOTING:
                navigate(PAGES.VOTING);
                break;
            case GAME_STATE.RESULTS_RECEIVED:
                if(gameContext.game.isAdmin) {
                    navigate(PAGES.RESULTS);
                } else {
                    navigate(PAGES.WAITING_FOR_RESULTS);
                }
                break;
            case GAME_STATE.COMPLETE:
                navigate(PAGES.RESULTS);
                break;
        }
    }

    useEffect(() => {
        goToPageForGameState(gameState);
    }, [gameState]);

    function navigate(page) {
        switch(page) {
            case PAGES.LOBBY:
            setCurrentPage(<Lobby navigate={navigate} sendMessage={sendMessage} useSubscription={useSubscription}/>);
            break;
            case PAGES.ADD_BEER:
            setCurrentPage(<AddBeer navigate={navigate}/>)
            break;
            case PAGES.ADD_BEER_FOR:
            setCurrentPage(<AddBeerFor navigate={navigate}/>);
            break;
            case PAGES.VOTING:
            setCurrentPage(<VotingPage navigate={navigate} sendMessage={sendMessage} useSubscription={useSubscription}/>);
            break;
            case PAGES.WAITING:
            setCurrentPage(<Waiting navigate={navigate} sendMessage={sendMessage} useSubscription={useSubscription} />);
            break;
            case PAGES.WAITING_FOR_RESULTS:
            setCurrentPage(<WaitingForResults/>);
            break;
            case PAGES.RESULTS:
            setCurrentPage(<Results sendMessage={sendMessage} useSubscription={useSubscription} />);
            break;
        }
    }

    return (
        <>{currentPage}</>
    )
}

export default Game;