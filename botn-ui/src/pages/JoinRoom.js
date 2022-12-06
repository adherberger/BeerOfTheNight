import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_JOIN_GAME } from '../utilities/constants';
import {
    StateInput,
    MainButton
} from '../components/components';

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
                gameContext.setGame(response.data);
                console.log(response.data)
                navigate("/lobby");
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
                text={"Join Game"}
                onClick={joinGame}
                disabled={roomCode.length < 4 || !name}
            />
        </>
    );
}

export default JoinRoom;