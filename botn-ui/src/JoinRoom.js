import React, { useState } from 'react';
import { useGameContext } from './game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_JOIN_GAME } from './constants';

const JoinRoom = () => {
    const gameContext = useGameContext();
    const [ name, setName ] = useState("");
    const [ roomCode, setRoomCode ]  = useState("");
    const navigate = useNavigate();

    const joinGame = () => {
        axios.post(
            BOTN_JOIN_GAME,
            { name: name, roomCode: roomCode }
        ).then((response) => {
            if(response.status === 200) {
                gameContext.setGame(response.data);
                navigate.push("/lobby");
            }
        })
    }

    return (
        <div className="main-page">
            <label for="name-input">Your Name:</label>
            <input id="name-input" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <label for="room-code-input">Room Code:</label>
            <input id="room-code-input" type="text" value={roomCode} onChange={(e) => {setRoomCode(e.target.value)}}/>
            <button className="button-main" onClick={() => { joinGame(); }}>Join Room</button>
        </div>
    );
}

export default JoinRoom;