import React, {useState}  from 'react';
import { FaBeer} from 'react-icons/fa';
import { useGameContext } from '../utilities/game-context';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {
    MainButton
} from '../components/components';

const Attendee = ({name, hasEntry}) => {
    return (
        <div className="attendee">
            <div className="attendee-name">{name}</div>
            <div className="entry-indicator"><FaBeer/></div>
        </div>
    )
}

const AttendeeList = () => {

}

const Lobby = () => {
    const gameContext = useGameContext();
    const navigate = useNavigate();

    function handleClick() {
        navigate("/addBeer");
      }    
    return (
        <>
            <div className="main-page">
            <div className="logo"><FaBeer/></div>
                <h4>Waiting for voting to begin</h4>
            </div>
            <MainButton
                text={"Add Your Entry"}
                onClick={handleClick}
            />
        </>

    );
}

export default Lobby;