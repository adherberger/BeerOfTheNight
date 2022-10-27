import React, { useState, useContext, useEffect } from 'react';

const GameContext = React.createContext({});

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameContextProvider = ({children}) => {
  const [ game, setGame ] = useState({});

  useEffect(() => {
    console.log(game)
  }, [game])

  return (
    <GameContext.Provider value = {{...game, setGame}}>
      {children}
    </GameContext.Provider>
  );
};