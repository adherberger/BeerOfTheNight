import React, { useState } from 'react';
import { useGameContext } from './game-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOTN_JOIN_GAME } from './constants';

const StateInput = ({
    id,
    title,
    stateVar,
    setStateVar
}) => {
    return (
        <>
            {
                title ?
                <label for={id}>{title}</label>
                : <></>
            }
            <input id={id} value={stateVar} onChange={(e) => {setStateVar(e.target.value)}}/>
        </>
    );
}

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
            <StateInput id="name-input" title="Your Name" stateVar={name} setStateVar={setName}/>
            <StateInput id="room-code-input" title="Room Code" stateVar={roomCode} setStateVar={setRoomCode}/>
            <button className="button-main" onClick={() => { joinGame(); }}>Join Room</button>
        </div>
    );
}

export default JoinRoom;