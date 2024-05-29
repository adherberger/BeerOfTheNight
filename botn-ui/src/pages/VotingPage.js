import React, { useEffect, useState } from 'react';
import { useGameContext } from '../utilities/game-context';
import axios from 'axios';
import { BOTN_GET_ENTRIES, BOTN_SUBMIT_VOTES, PAGES } from '../utilities/constants';
import '../styles/voting.css'
import Waiting from './Waiting';
import { BeerCard, MainButton, MainPage, SecondaryButton } from '../components/components';
import { useCallback } from 'react';

// Game creator enters their name and fires off an initGame request to backend.
// Response is stored in game context and consists of gameId, roomCode and memberId.
const VotingPage = ({navigate, sendMessage, useSubscription})  => {
  const gameContext = useGameContext();
  const [votes, setVotes] = useState([0, 0, 0]);
  const entries = useSubscription({
    topic: "/botn/entries/"+gameContext.game.gameId,
  });

  //Called when user chooses to submit their votes
  const submitVotes = () => {
    axios.post(
      BOTN_SUBMIT_VOTES,
        { gameId: gameContext.game.gameId, memberId: gameContext.game.memberId, first:votes[0], second:votes[1], third:votes[2] }
    ).then((response) => {
      if (response.status === 200) {
        clearVotes()
        gameContext.setValue("votingComplete", {complete:true})
        navigate(PAGES.WAITING);
      } else if (response.status === 404) {
      }
    })
  }

  const VoteRadio = ({
    place,
    entryId,
    votes,
    setVotes,
  }) => {
    const updateVotes = useCallback(() => {
      const _votes = [...votes];

      if(_votes.includes(entryId)) {
        _votes[_votes.indexOf(entryId)] = 0;
      }

      _votes[place - 1] = entryId;
      setVotes(_votes);
    })

    return (
      <div className="vote-radio">
        <div
          className={`vote-radio-button`}
          onClick={updateVotes}
        >
          {
            votes?.[place - 1] === entryId ? 
            <div className="selection"/> : <></>
          }
        </div>
        <div className="vote-radio-text">
          {
            place === 1 ?
            "1st" :
            place === 2 ?
            "2nd" :
            place === 3 ?
            "3rd" :
            ""
          }
        </div>
      </div>
    )
  }

  const VoteRadios = ({
    entryId,
    votes,
    setVotes,
  }) => {
    return (
      <div className="vote-radios">
        <VoteRadio place={1} entryId={entryId} votes={votes} setVotes={setVotes}/>
        <VoteRadio place={2} entryId={entryId} votes={votes} setVotes={setVotes}/>
        <VoteRadio place={3} entryId={entryId} votes={votes} setVotes={setVotes}/>
      </div>
    )
  }

  const Entry = ({
    index,
    entry,
    isOwn,
    votes,
    setVotes,
  }) => {
    const placeNum = votes.indexOf(entry.entryId);
    let place = "";

    switch(placeNum) {
      case 0: place = "first"; break;
      case 1: place = "second"; break;
      case 2: place = "third"; break;
    }

    return (
      <BeerCard
        id={`entry-${entry.entryId}`}
        title={`${entry.brewer}'s ${entry.beerStyle}${isOwn ? " (Your Entry)" : ""}`}
        description={`${entry.beerName ? "\"" + entry.beerName + "\"" : ""}`}
        tail={!isOwn ? <VoteRadios votes={votes} setVotes={setVotes} entryId={entry.entryId}/> : <></>}
        className={votes.includes(entry.entryId) ? "selected" : ""}
      />
    )
  }

  const EntryList = ({entries, votes, setVotes}) => {
    return (
      <div className="entry-list">
        {
          entries ?
          entries.map((entry, index) => (
            <Entry
              key={index}
              index={index}
              entry={entry}
              isOwn={gameContext.entry?.entryId === entry.entryId}
              votes={votes}
              setVotes={setVotes}
            />
          )) : <></>
        }
      </div>
    )
  }

  function clearVotes() {
    let items = [...votes]
    items[0] = 0
    items[1] = 0
    items[2] = 0

    setVotes(items)
  }

  useEffect(() => {
    console.log(votes);
  }, [votes])

  return (
    <>
    {
      gameContext.votingComplete ?
      <Waiting navigate={navigate} sendMessage={sendMessage} useSubscription={useSubscription}/> :
      <>
        <MainPage>
          <EntryList
            entries={entries}
            votes={votes}
            setVotes={setVotes}
          />
        </MainPage>
        {
          votes[0]*votes[1]*votes[2] === 0 ?
          <></> :
          <MainButton
            text="Submit Votes"
            onClick={submitVotes}
          />
        }
      </>
    }
    </>
  )
}


export default VotingPage;
