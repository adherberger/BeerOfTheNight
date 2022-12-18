import React, { useEffect } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_GET_ENTRIES } from '../utilities/constants';
import '../styles/voting.css'

import BeerTable from '../components/BeerTable'
import {
  MainButton
} from '../components/components';

// Game creator enters their name and fires off an initGame request to backend.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const VotingPage = () => {
  const gameContext = useGameContext();

  const columns = [
    {
      Header: "entryId",
      accessor: "entryId",
    },
    {
      Header: "Brewer",
      accessor: "brewer",
    },
    {
      Header: "Beer Name",
      accessor: "beerName",
    },
    {
      Header: "Style",
      accessor: "beerStyle",
    },
  ];

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
    console.log(event.target)
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
                    <td width = "10%"><input type="radio" value="1" className={entry.beerName} 
                              name="first" 
                              onChange={handleChange}/>
                              </td>
                    <td width = "10%"><input type="radio" value="2" className={entry.beerName} name="second" onChange={handleChange}/></td>
                    <td width = "10%"><input type="radio" value="3" className={entry.beerName} name="third" onChange={handleChange}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <MainButton
                text={"Submit Votes"}
                onClick={null}
                disabled={false}
            />
      </>
    )
  }

  function reactTable() {
    return (
      <>
        <div className="main-page">
          <BeerTable columns={columns} data={gameContext.entries} />
        </div>
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
