import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_JOIN_GAME } from '../utilities/constants';
import {
    StateInput,
    SecondaryButton,
} from '../components/components';

// Game member enters their name and a room code and fires off a joinGame request.
// Response is stored in game context and consists of gameId, roomCode and memberId.
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
            { memberName: name, roomCode: roomCode }
        ).then((response) => {
            if (response.status === 200) {
                gameContext.setValue("game", response.data);
                navigate("/lobby");
            } else if (response.status === 404) {
                setRoomCodeNotFound(true);
            }
        })
    }

    return (
        <>
            <div className="main-page">
                <div className="form join-game-form">
                    <StateInput
                        id="room-code-input"
                        title="Room Code"
                        stateVar={roomCode}
                        setStateVar={updateRoomCode}
                        maxLength={4}
                    />
                    <StateInput
                        id="name-input"
                        title="Your Name"
                        stateVar={name}
                        setStateVar={setName}
                        autoFocus
                    />
                    <SecondaryButton
                        text={"Join Game"}
                        onClick={joinGame}
                        disabled={roomCode.length < 4 || !name}
                    />
                </div>
            </div>
        </>
    );
}

export default JoinRoom;