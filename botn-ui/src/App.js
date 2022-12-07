import React from 'react';
import './styles/App.css';
import { FaBeer, FaBars } from 'react-icons/fa';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';
import AddBeer from './pages/AddBeer';
import { useGameContext } from './utilities/game-context';

function App() {
  const gameContext = useGameContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <JoinRoom/>,
    },
    {
      path: "/login",
      element: <CreateRoom/>,
    },
    {
      path: "/lobby",
      element: <Lobby/>
    },
    {
      path: "/addBeer",
      element: <AddBeer/>
    }

  ]);

  return (
      <div className="App">
        <div className="bar top-bar">
          <div className="logo"><FaBeer/></div>
          <div className="top-bar-item">
            {
              gameContext.gameId ?
              "Room Code: " + gameContext.roomCode
              : "Beer Of The Night"
            }
          </div>
          <div className="flex-spacer"/>
          <div className="top-bar-menu top-bar-item">
            <FaBars/>
          </div>
        </div>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
