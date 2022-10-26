import React, { useContext, useState } from 'react';
import './App.css';
import { FaBeer, FaBars } from 'react-icons/fa';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const GameContext = React.createContext({});

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameContextProvider = ({children}) => {
  const [ game, setGame ] = useState({});

  return (
    <GameContext.Provider value = {{...game, setGame}}>
      {children}
    </GameContext.Provider>
  );
};

function App() {
  const [game, setGame] = useState({});

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
          game.gameId ?
          "Room Code: " + game.roomCode
          : "Beer Of The Night"
          }
        </div>
        <div className="flex-spacer"/>
        <div className="top-bar-menu top-bar-item">
          <FaBars/>
        </div>
      </div>
      <GameContext.Provider value={{...game, setGame}}>
        <RouterProvider router={router}/>
      </GameContext.Provider>
    </div>
  );
}

export default App;
