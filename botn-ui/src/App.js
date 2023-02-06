import { React, useEffect, useState } from 'react';
import './styles/App.css';
import { FaBeer } from 'react-icons/fa';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import {
  createBrowserRouter,
  useNavigate,
  RouterProvider,
} from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';
import AddBeer from './pages/AddBeer';
import AddBeerFor from './pages/AddBeerFor';
import VotingPage from './pages/VotingPage';
import Waiting from './pages/Waiting';
import Results from './pages/Results';

import { useGameContext } from './utilities/game-context';
import { useWebSocket } from './utilities/use-websocket';
import axios from 'axios';

import { BOTN_WEBSOCKET_BASE, BOTN_RESTART_API, BOTN_GAME_STATE_TOPIC } from './utilities/constants';

function App() {
  const [game, setGame] = useState();
  const gameContext = useGameContext();
  const { sendMessage, useSubscription } = useWebSocket(BOTN_WEBSOCKET_BASE);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const gameState = useSubscription(BOTN_GAME_STATE_TOPIC(game), () => {}, game);

  const landingPage = (
    <JoinRoom
      onJoin={(game) => {
        setGame(game);
        setCurrentPage(<Lobby game={game} sendMessage={sendMessage} useSubscription={useSubscription}/>)
      }}
    />
  );

  useEffect(() => {

  }, [gameState])

  const [currentPage, setCurrentPage] = useState(landingPage);

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <JoinRoom />,
  //   },
  //   {
  //     path: "/login",
  //     element: <CreateRoom />,
  //   },
  //   {
  //     path: "/lobby",
  //     element: <Lobby sendMessage={sendMessage} useSubscription={useSubscription} />
  //   },
  //   {
  //     path: "/addBeer",
  //     element: <AddBeer />
  //   },
  //   {
  //     path: "/addBeerFor",
  //     element: <AddBeerFor />
  //   },
  //   {
  //     path: "/voting",
  //     element: <VotingPage sendMessage={sendMessage} useSubscription={useSubscription}/>
  //   },
  //   {
  //     path: "/waiting",
  //     element: <Waiting sendMessage={sendMessage} useSubscription={useSubscription} />
  //   },
  //   {
  //     path: "/results",
  //     element: <Results sendMessage={sendMessage} useSubscription={useSubscription} />
  //   }

  // ]);

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
                    <MdClose style={{ color: "#fff", background: "#CC9933", width: "30px", height: "30px" }} />
                  ) : (
                    <FiMenu style={{ color: "#fff", background: "#CC9933", width: "30px", height: "30px" }} />
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
