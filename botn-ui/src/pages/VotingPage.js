import React, { useEffect } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_GET_ENTRIES, BOTN_SUBMIT_VOTES } from '../utilities/constants';
import '../styles/voting.css'

import {
  MainButton
} from '../components/components';

// Game creator enters their name and fires off an initGame request to backend.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const VotingPage = () => {
  const gameContext = useGameContext();
   
  var votes = [0,0,0];

  const submitVotes = () => {
    axios.post(
        BOTN_SUBMIT_VOTES,
//        { gameId: gameContext.game.gameId, memberId: gameContext.game.memberId, first:votes[0], second:votes[1], third:votes[2] }
          { gameId: 100, memberId: 103, first:votes[0], second:votes[1], third:votes[2] }
    ).then((response) => {
        if (response.status === 200) {
        } else if (response.status === 404) {
        }
    })
}

  useEffect(() => {
    console.log("in useEffect")
    axios.post(
      BOTN_GET_ENTRIES,
      { gameId: 100 }
    ).then((response) => {
      console.log(response.data)
      gameContext.setValue("entries", response.data.entryList);
    });
  }, [])

  function handleChange(event) {
    console.log(event)
    votes[event.target.value - 1] = event.target.getAttribute("entryid");
    console.log(votes)
  }

  function htmlTable() {
    return (
      <>
        <div className="main-page">
          <table>
            <thead>
              <tr>
                <th>Brewer</th>
                {/* <th>Beer Name</th> */}
                <th>Style</th>
                <th>1st</th>
                <th>2nd</th>
                <th>3rd</th>
              </tr>
            </thead>
            <tbody>
              {gameContext.entries.map(entry => {
                return (
                  <tr key={entry.entryId}>
                    <td>{entry.brewer}</td>
                    {/*<td>{entry.beerName}</td>*/}
                    <td>{entry.beerStyle}</td>
                    <td width = "10%"><input type="radio" value="1" entryid={entry.entryId} 
                              name="first" 
                              onChange={handleChange}/>
                              </td>
                    <td width = "10%"><input type="radio" value="2" entryid={entry.entryId} name="second" onChange={handleChange}/></td>
                    <td width = "10%"><input type="radio" value="3" entryid={entry.entryId} name="third" onChange={handleChange}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <MainButton
                text={"Submit Votes"}
                onClick={submitVotes}
                disabled={false}
            />
      </>
    )
  }

  // Determine which html to render based on if entries have been loaded
  if (gameContext.entries) {
    return htmlTable()
  } else {
    return (
      <>
      </>
    )
  }

}


export default VotingPage;
