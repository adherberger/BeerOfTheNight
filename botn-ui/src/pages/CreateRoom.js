import axios from 'axios';
import React, { useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
    SecondaryButton,
    StateInput,
} from '../components/components';
import { BOTN_INIT_GAME } from '../utilities/constants';
import { useGameContext } from '../utilities/game-context';

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
    );
}

export default CreateRoom;