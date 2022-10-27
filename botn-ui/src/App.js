import React, { useState } from 'react';
import './App.css';
import { FaBeer, FaBars } from 'react-icons/fa';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { useGameContext } from './game-context';

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
  ]);

  return (
      <div className="App">
        <div className="top-bar">
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
