import { React, useEffect, useState } from 'react';
import './styles/App.css';
import { FaBeer } from 'react-icons/fa';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';
import AddBeer from './pages/AddBeer';
import AddBeerFor from './pages/AddBeerFor';
import VotingPage from './pages/VotingPage';
import Waiting from './pages/Waiting';
import Results from './pages/Results';
import WaitingForResults from './pages/WaitingForResults';

import { useGameContext } from './utilities/game-context';
import { useWebSocket } from './utilities/use-websocket';
import axios from 'axios';

import {
  BOTN_WEBSOCKET_BASE,
  BOTN_RESTART_API,
  BOTN_GAME_STATE_TOPIC,
  PAGES,
  GAME_STATE
} from './utilities/constants';

function App() {
  const [game, setGame] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { sendMessage, useSubscription } = useWebSocket(BOTN_WEBSOCKET_BASE);
  const gameContext = useGameContext();
  const gameState = useSubscription(BOTN_GAME_STATE_TOPIC(game), () => {}, game);

  const landingPage = (
    <JoinRoom
      onJoin={(game) => {
        setGame(game);
        navigate(PAGES.LOBBY);
      }}
    />
  );

  useEffect(() => {
    switch(gameState) {
      case GAME_STATE.IN_PROGRESS:
        navigate(PAGES.VOTING);
        break;
      case GAME_STATE.RESULTS_RECEIVED:
        if(gameContext.game.isAdmin) {
          navigate(PAGES.RESULTS);
        } else {
          navigate(PAGES.WAITING_FOR_RESULTS);
        }
        // Need to make this a separate page that just has the icon + message. Right now 
        // navigate(PAGES.RESULTS_RECEIVED);
        break;
      case GAME_STATE.COMPLETE:
        navigate(PAGES.RESULTS);
        break;
    }
  }, [gameState])

  const [currentPage, setCurrentPage] = useState(landingPage);

  const navigate = (page) => {
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

  function handleToggle() {
    setNavbarOpen(prev => !prev)
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

  // function addEntryFor() {
  //   router.navigate("/addBeerFor")
  //   setNavbarOpen(prev => !prev)
  // }

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
        <div className="top-bar-menu">
          {
            gameContext.game?.isAdmin ?
              <>
                <div className="burger-menu" onClick={handleToggle} >
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
                  {
                    !gameContext.votingComplete ?
                      <>
                        <div className="menuNav-item" onClick={() => {}}>
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
      {currentPage}
    </div>
  );
}

export default App;
