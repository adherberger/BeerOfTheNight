package org.fhbc.botn;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.AddEntryResponse;
import org.fhbc.botn.dto.Attendee;
import org.fhbc.botn.dto.GetEntriesRequest;
import org.fhbc.botn.dto.GetEntriesResponse;
import org.fhbc.botn.dto.GetResultsResponse;
import org.fhbc.botn.dto.InitGameRequest;
import org.fhbc.botn.dto.JoinGameRequest;
import org.fhbc.botn.dto.JoinGameResponse;
import org.fhbc.botn.dto.SubmitVotesRequest;
import org.fhbc.botn.dto.UpdateVotesResponse;
import org.fhbc.botn.dto.Vote;
import org.fhbc.botn.entity.EntryEntity;
import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.entity.GameEntity.GameState;
import org.fhbc.botn.entity.GameMemberEntity;
import org.fhbc.botn.entity.GameMemberPK;
import org.fhbc.botn.entity.MemberEntity;
import org.fhbc.botn.entity.VoteEntity;
import org.fhbc.botn.repo.EntryRepository;
import org.fhbc.botn.repo.GameMemberRepository;
import org.fhbc.botn.repo.GameRepository;
import org.fhbc.botn.repo.MemberRepository;
import org.fhbc.botn.repo.VoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class BeerOtnHandler {
	public static Logger log = LoggerFactory.getLogger(BeerOtnHandler.class);
	
	@Autowired
	GameRepository gameRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	GameMemberRepository gameMemberRepo;
	
	@Autowired
	EntryRepository entryRepo;

	@Autowired
	VoteRepository voteRepo;

	// Initializes a brand new game.  Game ID and Room Code are generated.
	// Since the game creator is also a member, we will call joineGame here and
	// actually return a JoinGameResponse object to the requester.
	public JoinGameResponse initGame(InitGameRequest req) {
		GameEntity game = new GameEntity();
		game.setGameDate(new Timestamp(System.currentTimeMillis()));
		game.setGameState(GameState.INIT);
		game.setRoomCode(generateRoomCode());
		
		//save info about the new game
		gameRepo.save(game);
		
		//build a join request so the game creator is treated as a member henceforth
		JoinGameRequest j = new JoinGameRequest();
		j.setMemberName(req.getMemberName());
		j.setRoomCode(game.getRoomCode());
		
		return joinGame(j);
	}
	
	// called for each member that will be joining the game
	public JoinGameResponse joinGame(JoinGameRequest req) {
		GameEntity game = gameRepo.findByRoomCode(req.getRoomCode());
		MemberEntity member = null;
		
		if(game == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "A game with room code " + req.getRoomCode() + " was not found.", null);
		}
		
		// Member is joining as guest
		if(req.getMemberName() != null) {
			member = new MemberEntity();
			member.setMemberName(req.getMemberName());
			memberRepo.save(member);
		} else {
			// Do stuff to find existing member
		}
		
		//Save the member's info and associate them with the game
		GameMemberEntity gameMember = new GameMemberEntity();
		gameMember.setGameMemberId(new GameMemberPK(game.getGameId(), member.getMemberId()));
		gameMember.setGame(game);
		gameMember.setMember(member);
		gameMember.setIsPresent(true);
		gameMemberRepo.save(gameMember);
		
		JoinGameResponse resp = new JoinGameResponse();
		resp.setGameId(game.getGameId());
		resp.setRoomCode(game.getRoomCode());
		resp.setMemberId(gameMember.getMember().getMemberId());
		resp.setBrewerName(req.getMemberName());
		return resp;
	}
	
	// This is called when a member has a beer to enter in the game.
	public AddEntryResponse addEntry(AddEntryRequest req) {
		EntryEntity entry = entryRepo.findByGame_GameIdAndMember_MemberId(req.getGameId(),req.getMemberId());
		if (entry == null) {
			entry = new EntryEntity();
			MemberEntity brewer = memberRepo.findById(req.getMemberId()).get();
			GameEntity game = gameRepo.findById(req.getGameId()).get();
			entry.setGame(game);
			entry.setMember(brewer);
		}
		
		//save the beer information, associated with the member and game
		entry.setBeerName(req.getBeerName());
		entry.setBeerStyle(req.getBeerStyle());
		entryRepo.save(entry);
		
		AddEntryResponse resp = new AddEntryResponse();
		resp.setEntryId(entry.getEntryId());
		return resp;
	}

	// Generates a random 4-byte room code.
	public String generateRoomCode() {
		StringBuilder sb;
		
		do {
			sb = new StringBuilder();
			
			for(int i = 0; i < 4; i++) {
				// Append a random character between A and Z
				sb.append((char) ('A' + ThreadLocalRandom.current().nextInt('Z' - 'A' + 1)));
			}
		// Check whether this code has been taken, and if so, generate a new code!
		// Can probably change this to only search "active" games, but the 456976 possible combinations should keep us covered for now.
		} while(gameRepo.findByRoomCode(sb.toString()) != null);
		
		return sb.toString();
	}

	// Return information about all beers entered for the given gameId
	public GetEntriesResponse getEntries(GetEntriesRequest req) {
		GetEntriesResponse resp = new GetEntriesResponse();
		
		List<EntryEntity> entryEntityList = entryRepo.findAllByGame_GameId(req.getGameId());
		
		for (EntryEntity e:entryEntityList) {
			GetEntriesResponse.Entry entry = resp.new Entry();
			entry.setBeerName(e.getBeerName());
			entry.setBeerStyle(e.getBeerStyle());
			entry.setBrewer(e.getMember().getMemberName());
			entry.setEntryId(e.getEntryId());
			
			resp.getEntryList().add(entry);
		}
		
		return resp;
	}
	
	public boolean submitVotes(SubmitVotesRequest req) {
		VoteEntity vote = new VoteEntity();
		vote.setGame(gameRepo.findById(req.getGameId()).get());
		MemberEntity member = memberRepo.findById(req.getMemberId()).get();
		vote.setMember(member);
		EntryEntity first = entryRepo.findById(req.getFirst()).get();
		EntryEntity second = entryRepo.findById(req.getSecond()).get();
		EntryEntity third = entryRepo.findById(req.getThird()).get();
		vote.setFirst(first);
		vote.setSecond(second);
		vote.setThird(third);
		
		vote.setVoteId(new GameMemberPK(req.getGameId(), req.getMemberId()));

		voteRepo.save(vote);
		return true;
	}

	public GameState startVotingForGame(Integer gameId) {
		GameEntity game = gameRepo.findById(gameId).get();
		game.setGameState(GameState.IN_PROGRESS);
		gameRepo.save(game);
		return game.getGameState();
	}

	public GameState allVotesReceived(Integer gameId) {
		GameEntity game = gameRepo.findById(gameId).get();
		game.setGameState(GameState.RESULTS_RECEIVED);
		gameRepo.save(game);
		return game.getGameState();
	}

	public List<Attendee> getAttendeesForGame(Integer gameId) {
		List<Attendee> attendees = new ArrayList<>();
		List<GameMemberEntity> gameMembers = gameMemberRepo.findByGameGameId(gameId);
		
		for(GameMemberEntity gameMember : gameMembers) {
			Attendee att = new Attendee();
			att.setName(gameMember.getMember().getMemberName());

			EntryEntity entry = entryRepo.findByGameAndMember(gameMember.getGame(), gameMember.getMember());
			att.setHasEntry(entry != null);
			
			attendees.add(att);
		}
		
		attendees.sort((att1, att2) -> {
			return att1.getName().compareTo(att2.getName());
		});
		return attendees;
	}

	public UpdateVotesResponse getVotesForGame(Integer gameId) {
		UpdateVotesResponse resp = new UpdateVotesResponse();
		List<GameMemberEntity> gameMembers = gameMemberRepo.findByGameGameId(gameId);
		
		boolean allVoted = true;
		for(GameMemberEntity gameMember : gameMembers) {
			if (gameMember.getIsPresent()) {
				Vote vote = new Vote();
				vote.setName(gameMember.getMember().getMemberName());
				VoteEntity v = voteRepo.findByGame_GameIdAndMember_MemberId(gameId,gameMember.getMember().getMemberId());
				vote.setDidVote(v != null);
				allVoted = allVoted && ( v != null);
				resp.getVoteList().add(vote);
			}
		}
		
		resp.getVoteList().sort((vote1, vote2) -> {
			return vote1.getName().compareTo(vote2.getName());
		});
		
		resp.setAllVotesIn(allVoted);
		return resp;
	}

	public GetResultsResponse getResults(GetEntriesRequest req) {
		GetResultsResponse resp = new GetResultsResponse();
		List<EntryEntity> entryEntityList = entryRepo.findAllByGame_GameId(req.getGameId());
		Map<Integer,GetResultsResponse.Entry> resultsMap = new HashMap<Integer,GetResultsResponse.Entry>();
		for (EntryEntity e:entryEntityList) {
			GetResultsResponse.Entry entry = resp.new Entry();
			entry.setBeerName(e.getBeerName());
			entry.setBeerStyle(e.getBeerStyle());
			entry.setBrewer(e.getMember().getMemberName());
			entry.setEntryId(e.getEntryId());
			
			resultsMap.put(e.getEntryId(),entry);
		}
		
		List<VoteEntity> voteList = voteRepo.findAllByGame_GameId(req.getGameId());
		for (VoteEntity v:voteList) {
			resultsMap.get(v.getFirst().getEntryId()).setScore(resultsMap.get(v.getFirst().getEntryId()).getScore()+5);
			resultsMap.get(v.getFirst().getEntryId()).votes[0] +=1; 

			resultsMap.get(v.getSecond().getEntryId()).setScore(resultsMap.get(v.getSecond().getEntryId()).getScore()+3);
			resultsMap.get(v.getSecond().getEntryId()).votes[1] +=1; 

			resultsMap.get(v.getThird().getEntryId()).setScore(resultsMap.get(v.getThird().getEntryId()).getScore()+1);
			resultsMap.get(v.getThird().getEntryId()).votes[2] +=1;
		}
		
		for (Integer i:resultsMap.keySet()) {
			resp.getResultsList().add(resultsMap.get(i));
		}
		
		Collections.sort(resp.getResultsList(),Collections.reverseOrder()); 
		return resp;
	}
	
}
