import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_JOIN_GAME, BOTN_INIT_GAME, PAGES } from '../utilities/constants';
import {
    StateInput,
    SecondaryButton,
} from '../components/components';
import { useNavigate } from 'react-router-dom';

function CreateRoom({}) {
    const gameContext = useGameContext();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const initGame = () => {
        axios.post(
          BOTN_INIT_GAME,
          { memberName: name }
        ).then((response) => {
          gameContext.setValue("game", {isAdmin: true, ...response.data});

          // Uses react-router to head to the game page, rather than our own internal navigation
          navigate("/");
        });
    }

    return (
        <>
            <div className="main-page">
                <div className="form join-game-form">
                    <StateInput
                        id="name-input"
                        title="Your Name"
                        stateVar={name}
                        setStateVar={setName}
                        autoFocus
                    />
                    <SecondaryButton
                        text={"Create Room"}
                        onClick={initGame}
                        disabled={!name}
                    />
                </div>
            </div>
        </>
    );
}

export default CreateRoom;