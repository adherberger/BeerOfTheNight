import React, { useState } from 'react';
import { useGameContext } from './game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_JOIN_GAME } from './constants';

const StateInput = ({
    id,
    title,
    stateVar,
    setStateVar,
    ...props
}) => {
    return (
        <div className="botn-input">
            {
                title ?
                    <label for={id} className="text-input-label">{title}</label>
                    : <></>
            }
            <input
                id={id}
                className="text-input"
                value={stateVar}
                onChange={(e) => { setStateVar(e.target.value) }}
                {...props}
            />
        </div>
    );
}

const MainButton = ({onClick, disabled}) => {
    return (
        <div className="bar bottom-bar">
            <div className="flex-spacer">
                <button className="big-button" disabled={disabled} onClick={() => { onClick(); }}>Join Room</button>
            </div>
        </div>
    )
}

const JoinRoom = () => {
    const gameContext = useGameContext();
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [roomCodeNotFound, setRoomCodeNotFound] = useState(false);
    const navigate = useNavigate();

    const updateRoomCode = (val) => {
        val = val.toUpperCase();
        setRoomCode(val);
    }

    const joinGame = () => {
        axios.post(
            BOTN_JOIN_GAME,
            { name: name, roomCode: roomCode }
        ).then((response) => {
            if (response.status === 200) {
                gameContext.setGame(response.data);
                navigate.push("/lobby");
            } else if (response.status === 404) {
                setRoomCodeNotFound(true);
            }
        })
    }

    return (
        <>
            <div className="main-page">
                <StateInput
                    id="name-input"
                    title="Your Name"
                    stateVar={name}
                    setStateVar={setName}
                />
                <StateInput
                    id="room-code-input"
                    title="Room Code"
                    stateVar={roomCode}
                    setStateVar={updateRoomCode}
                    maxLength={4}
                />
            </div>
            <MainButton
                onClick={joinGame}
                disabled={roomCode.length < 4 || !name}
            />
        </>
    );
}

export default JoinRoom;