import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_JOIN_GAME, BOTN_INIT_GAME } from '../utilities/constants';
import {
    StateInput,
    SecondaryButton,
} from '../components/components';

// Game member enters their name and a room code and fires off a joinGame request.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const JoinRoom = ({onJoin}) => {
    const gameContext = useGameContext();
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [roomCodeNotFound, setRoomCodeNotFound] = useState(false);

    const updateRoomCode = (val) => {
        val = val.toUpperCase();
        setRoomCode(val);
    }

    const initGame = () => {
        axios.post(
          BOTN_INIT_GAME,
          { memberName: name }
        ).then((response) => {
          gameContext.setValue("game", {isAdmin: true, ...response.data});
          onJoin({isAdmin: true, ...response.data});
        });
    }

    const joinGame = () => {
        axios.post(
            BOTN_JOIN_GAME,
            { memberName: name, roomCode: roomCode }
        ).then((response) => {
            if (response.status === 200) {
                //gameContext.setValue("game", response.data);
                //Quick hack to allow Admin role for seeded game data
                //Join one of the static games with name Admin!
                if (response.data.brewerName === "Admin") {
                    gameContext.setValue("game", {isAdmin: true, ...response.data});
                } else {
                    gameContext.setValue("game", {isAdmin: false, ...response.data});

                }
            
                onJoin(response.data);
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
                    <SecondaryButton
                        text={"Create Game"}
                        onClick={initGame}
                        disabled={!name}
                    />
                </div>
            </div>
        </>
    );
}

export default JoinRoom;