import React, { useState, useContext } from 'react';

const GameContext = React.createContext({});

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameContextProvider = ({children}) => {
  const [ data, setData ] = useState({});

  const setValue = (key, value) => {
    let context = {...data, [key]: value};
    setData(context);
    localStorage.setItem("gameContext", JSON.stringify(context));
  }

  const setContext = (context) => {
    setData(context);
    localStorage.setItem("gameContext", JSON.stringify(context));
  }

  const clear = () => {
    setData({});
    localStorage.removeItem("gameContext");
  }

  return (
    <GameContext.Provider value={{...data, setValue, setContext, clear}}>
      {children}
    </GameContext.Provider>
  );
};