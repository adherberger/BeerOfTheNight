import { React, useEffect, useRef, useState } from 'react';
import './styles/App.css';

import axios from 'axios';
import { useGameContext } from './utilities/game-context';

import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import {
  Modal,
  SecondaryButton
} from './components/components';
import CreateRoom from './pages/CreateRoom';
import Game from './pages/Game';
import {
  BOTN_GET_GAME_STATE, BOTN_RESTART_API, BOTN_SET_GAME_STATE, BOTN_WEBSOCKET_BASE, GAME_STATE
} from './utilities/constants';
import { useWebSocket } from './utilities/use-websocket';
import { FaBeer } from 'react-icons/fa';
import { MdClose, MdPerson } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import AddBeerFor from './pages/AddBeerFor';

function App() {
  const { sendMessage, useSubscription } = useWebSocket(BOTN_WEBSOCKET_BASE);
  const [ showRejoinGame, setShowRejoinGame ] = useState(false);
  const [ showGameStateModal, setShowGameStateModal ] = useState(false);
  const [ showAddEntryModal, setShowAddEntryModal ] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const gameContext = useGameContext();
  const newContextJson = useRef();

  const router = createBrowserRouter([
    {
      path: "/create-room",
      element: <CreateRoom/>
    },
    {
      path: "/",
      element: <Game sendMessage={sendMessage} useSubscription={useSubscription}/>
    }
  ])

  // Check if there is game context already in localStorage. If so, try to rejoin the game
  useEffect(() => {
    const contextFromStorage = localStorage.getItem("gameContext");
    if(contextFromStorage) {
      const contextJson = JSON.parse(contextFromStorage);
      axios.get(BOTN_GET_GAME_STATE(contextJson.game.gameId)).then(response => { 
        if(response.status === 404) {
          // If 404, game was not found, don't show the message to rejoin
        } else {
          newContextJson.current = {...contextJson, game: {...contextJson.game, gameState: response.data}};
          setShowRejoinGame(true);
        }
      })
    }
  }, []);

  const RejoinGame = ({setShow}) => {
    const rejoinGame = () => {
      gameContext.setContext(newContextJson.current);
      setShow(false);
    }

    const decline = () => {
      gameContext.clear();
      setShow(false);
    }

    return (
      <div className="rejoin-game">
        {`It looks like you were previously in a game (as ${newContextJson?.current?.game?.brewerName}). Would you like to rejoin?`}
        <div className="button-row">
          <SecondaryButton text="Yes" onClick={rejoinGame}/>
          <SecondaryButton text="No" onClick={decline}/>
        </div>
      </div>
    )
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

  // TODO I think we will want to accomplish the AddEntryFor functionality as a modal the pops over the screen, so it's not bound to go to a specific page when 
  function addEntryFor() {
    setNavbarOpen(false);
    setShowAddEntryModal(true);
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
    <div className="App">
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
      <RouterProvider router={router}/>
      <Modal title="Set Game State" show={showGameStateModal} setShow={setShowGameStateModal}>
          <SetGameState sendMessage={sendMessage} setShow={setShowGameStateModal}/>
      </Modal>
      <Modal title="Rejoin Game" show={showRejoinGame} setShow={setShowRejoinGame}>
          <RejoinGame setShow={setShowRejoinGame}/>
      </Modal>
      <Modal title="Add Beer For" show={showAddEntryModal} setShow={setShowAddEntryModal}>
          <AddBeerFor sendMessage={sendMessage} setShow={setShowAddEntryModal}/>
      </Modal>
    </div>
  );
}

export default App;
