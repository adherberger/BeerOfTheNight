import React, { useState, useContext } from 'react';

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