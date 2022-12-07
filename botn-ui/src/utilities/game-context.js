import React, { useState, useContext } from 'react';

const GameContext = React.createContext({});

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameContextProvider = ({children}) => {
  const [ data, setData ] = useState({});

  const setValue = (key, value) => {
    setData({...data, [key]: value});
  }

  return (
    <GameContext.Provider value={{...data, setValue}}>
      {children}
    </GameContext.Provider>
  );
};