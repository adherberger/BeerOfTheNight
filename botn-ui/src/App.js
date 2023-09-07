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
  BOTN_GET_GAME_STATE
} from './utilities/constants';

function App() {
  const [ showRejoinGame, setShowRejoinGame ] = useState(false);
  const gameContext = useGameContext();
  const newContextJson = useRef();

  const router = createBrowserRouter([
    {
      path: "/create-room",
      element: <CreateRoom/>
    },
    {
      path: "/",
      element: <Game/>
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

  return (
    <div className="App">
      <RouterProvider router={router}/>
      <Modal title="Rejoin Game" show={showRejoinGame} setShow={setShowRejoinGame}>
          <RejoinGame setShow={setShowRejoinGame}/>
      </Modal>
    </div>
  );
}

export default App;
