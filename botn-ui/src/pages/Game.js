import { React, useEffect, useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { MdClose, MdPerson } from "react-icons/md";
import AddBeer from './AddBeer';
import AddBeerFor from './AddBeerFor';
import JoinRoom from './JoinRoom';
import Lobby from './Lobby';
import Results from './Results';
import VotingPage from './VotingPage';
import Waiting from './Waiting';
import WaitingForResults from './WaitingForResults';

import axios from 'axios';
import { useGameContext } from '../utilities/game-context';
import { useWebSocket } from '../utilities/use-websocket';

import {
    Modal,
    SecondaryButton
} from '../components/components';
import {
    BOTN_GAME_STATE_TOPIC,
    BOTN_RESTART_API,
    BOTN_SET_GAME_STATE,
    BOTN_WEBSOCKET_BASE,
    GAME_STATE,
    PAGES
} from '../utilities/constants';

function Game({}) {
    const [currentPage, setCurrentPage] = useState(<JoinRoom navigate={navigate}/>);
    const [showGameStateModal, setShowGameStateModal] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { sendMessage, useSubscription } = useWebSocket(BOTN_WEBSOCKET_BASE);
    const gameContext = useGameContext();

    // Subscribe to game state updates, but only after game is established (game is in deps)
    const gameState = useSubscription({
        topic: BOTN_GAME_STATE_TOPIC(gameContext.game),
        deps: [gameContext.game],
        retry: [gameContext],
    });

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

    // TODO I think we will want to accomplish the AddEntryFor functionality as a modal the pops over the screen, so it's not bound to go to a specific page when 
    function addEntryFor() {
        //navigate(PAGES.ADD_BEER_FOR)
        setNavbarOpen(prev => !prev)
    }

    const SetGameState = ({sendMessage, setShow}) => {
        const gameContext = useGameContext();
        const [gameState, setGameState] = useState(GAME_STATE.INIT);

        const options = Object.entries(GAME_STATE).map(([key, value]) => (
        <option key={key} value={key}>{key}</option>
        ));

        const applyChange = () => {
        sendMessage(BOTN_SET_GAME_STATE(gameContext.game.gameId), {
            gameState: gameState,
        });
        setShow(false);
        }

        return (
        <div className="set-game-state">
            <select
            value={gameState}
            onChange={(e) => {setGameState(e.target.value)}}
            >
            {options}
            </select>
            <SecondaryButton text="Apply" onClick={applyChange}/>
        </div>
        )
    }

    const restartBackend = () => {
        console.log(BOTN_RESTART_API)
        axios.get(
            BOTN_RESTART_API,
        ).then((response) => {
            if (response.status === 200) {
            } else if (response.status === 404) {
            }
            setNavbarOpen(prev => !prev)
        })
    }

    return (
        <>
            <div className="bar top-bar">
                <div className="logo"><FaBeer /></div>

                <div className="top-bar-item">
                {
                    gameContext.game ?
                    "Room Code: " + gameContext.game.roomCode
                    : "Beer Of The Night"
                }
                </div>
                <div className="flex-spacer" />
            
                {
                    gameContext.game?.brewerName ?
                    <div className="top-bar-item">
                    <MdPerson/>
                    {gameContext.game.brewerName}
                    </div> : <></>
                }
                <div className="top-bar-menu">
                {
                    gameContext.game?.isAdmin ?
                    <>
                        <div className="burger-menu" onClick={() => setNavbarOpen(prev => !prev)} >
                        {navbarOpen ? (
                            <MdClose/>
                        ) : (
                            <FiMenu/>
                        )}
                        </div>
                        <div className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
                        <div className="menuNav-item" onClick={restartBackend}>
                            Restart Backend
                        </div>
                        <div className="menuNav-item" onClick={() => setShowGameStateModal(true)}>
                            Set Game State
                        </div>
                        {
                            !gameContext.votingComplete ?
                            <>
                                <div className="menuNav-item" onClick={addEntryFor}>
                                Add Entry For...
                                </div>
                            </>
                            : <></>
                        }
                        </div>
                    </>
                    : <></>
                }
                </div>
            </div>
            { currentPage }
            <Modal title="Set Game State" show={showGameStateModal} setShow={setShowGameStateModal}>
                <SetGameState sendMessage={sendMessage} setShow={setShowGameStateModal}/>
            </Modal>
        </>
    )
}

export default Game;