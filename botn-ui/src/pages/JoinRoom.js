import React, { useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_JOIN_GAME, BOTN_INIT_GAME, PAGES } from '../utilities/constants';
import {
    StateInput,
    SecondaryButton,
} from '../components/components';

// Game member enters their name and a room code and fires off a joinGame request.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const JoinRoom = ({}) => {
    const gameContext = useGameContext();
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [errorResponse, setErrorResponse] = useState();

    const updateRoomCode = (val) => {
        val = val.toUpperCase();
        setRoomCode(val);
    }

    const joinGame = async () => {
        try {
        const response = await axios.post(
            BOTN_JOIN_GAME,
            { memberName: name, roomCode: roomCode })
            if (response.status === 200) {
                //Quick hack to allow Admin role for seeded game data
                //Join one of the static games with name Admin!
                gameContext.setValue("game", {isAdmin: response.data.brewerName === "Admin", ...response.data});
            } else if (response.status === 404) {
                setErrorResponse("Unknown Error");
            }
        }  catch (err) {
            console.log(err)
            if (err.response.status === 404) {
            setErrorResponse("No active game with that room code");
            } else if (err.response.status === 409) {
                setErrorResponse("Game may no longer be joined")
            }
        }
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
                    {
                        errorResponse ?
                            <>
                                <p>{errorResponse}</p>
                            </>
                            :
                            <>
                            </>
                    }
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