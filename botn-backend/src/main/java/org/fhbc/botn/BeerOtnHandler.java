package org.fhbc.botn;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.fhbc.botn.dto.AddEntryForRequest;
import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.AddEntryResponse;
import org.fhbc.botn.dto.Attendee;
import org.fhbc.botn.dto.GetEntriesRequest;
import org.fhbc.botn.dto.GetEntriesResponse;
import org.fhbc.botn.dto.InitGameRequest;
import org.fhbc.botn.dto.JoinGameRequest;
import org.fhbc.botn.dto.JoinGameResponse;
import org.fhbc.botn.dto.Result;
import org.fhbc.botn.dto.ResultVoter;
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
	private static final int FIRST_PLACE_POINTS = 5;
	private static final int SECOND_PLACE_POINTS = 3;
	private static final int THIRD_PLACE_POINTS = 1;
	
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
		
		return joinGame(j,true);
	}
	
	// called for each member that will be joining the game
	public JoinGameResponse joinGame(JoinGameRequest req, boolean isPresent) {
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
		gameMember.setIsPresent(isPresent);
		gameMemberRepo.save(gameMember);
		
		JoinGameResponse resp = new JoinGameResponse();
		resp.setGameId(game.getGameId());
		resp.setRoomCode(game.getRoomCode());
		resp.setMemberId(gameMember.getMember().getMemberId());
		resp.setBrewerName(req.getMemberName());
		resp.setGameState(game.getGameState());
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

	// This is called when a member has a beer to enter in the game.
	public void addEntryFor(AddEntryForRequest req) {
		GameEntity game = gameRepo.findById(req.getGameId()).get();
		//Join the game using the submitted member name
		JoinGameRequest joinGameRequest = new JoinGameRequest();
		joinGameRequest.setMemberName(req.getBrewerName());
		joinGameRequest.setRoomCode(game.getRoomCode());
	

		JoinGameResponse joinGameResponse = joinGame(joinGameRequest,false);
		
		//Now add the entry for this new member
		AddEntryRequest addEntryRequest = new AddEntryRequest();
		addEntryRequest.setGameId(req.getGameId());
		addEntryRequest.setMemberId(joinGameResponse.getMemberId());
		addEntryRequest.setBeerName(req.getBeerName());
		addEntryRequest.setBeerStyle(req.getBeerStyle());
		
		addEntry(addEntryRequest);
		
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
	public GetEntriesResponse getEntries(Integer gameId) {
		GetEntriesResponse resp = new GetEntriesResponse();
		
		List<EntryEntity> entryEntityList = entryRepo.findAllByGame_GameId(gameId);
		
		for (EntryEntity e:entryEntityList) {
			GetEntriesResponse.Entry entry = resp.new Entry();
			entry.setBeerName(e.getBeerName());
			entry.setBeerStyle(e.getBeerStyle());
			entry.setBrewer(e.getMember().getMemberName());
			entry.setEntryId(e.getEntryId());
			
			resp.getEntryList().add(entry);
		}
		
		resp.getEntryList().sort((e1, e2) -> {
			return e1.getBrewer().compareTo(e2.getBrewer());
		});

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
		game.setGameState(GameState.VOTING);
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

	public List<Result> getResultsForGame(Integer gameId) {
		Map<Integer, Result> resultsMap = new HashMap<>();
		List<Result> results = new ArrayList<>();
		List<EntryEntity> entryEntityList = entryRepo.findAllByGame_GameId(gameId);
		
		for (EntryEntity e:entryEntityList) {
			Result result = new Result();
			result.setBeerName(e.getBeerName());
			result.setBeerStyle(e.getBeerStyle());
			result.setBrewer(e.getMember().getMemberName());
			result.setEntryId(e.getEntryId());
			
			resultsMap.put(e.getEntryId(),result);
		}
		
		List<VoteEntity> voteList = voteRepo.findAllByGame_GameId(gameId);
		
		for (VoteEntity v:voteList) {
			EntryEntity[] entries = new EntryEntity[] {v.getFirst(), v.getSecond(), v.getThird()};
			for(int place = 1; place <= entries.length; place++) {
				EntryEntity currentEntry = entries[place - 1];
				int points = 0;
				String placeStr = "";
				
				switch(place) {
					case 1:
						points = FIRST_PLACE_POINTS;
						placeStr = "1st";
						break;
					case 2:
						points = SECOND_PLACE_POINTS;
						placeStr = "2nd";
						break;
					case 3:
						points = THIRD_PLACE_POINTS;
						placeStr = "3rd";
						break;
				}
				
				ResultVoter voter = new ResultVoter(v.getMember().getMemberName(), placeStr, points);
				Result result = resultsMap.get(currentEntry.getEntryId());
				result.incrementScoreBy(points);
				result.addVoter(voter);
			}
		}
		
		for (Result result : resultsMap.values()) {
			Collections.sort(result.getVoters(), Collections.reverseOrder());
			results.add(result);
		}
		
		Collections.sort(results, Collections.reverseOrder()); 
		return results;
	}

	public GameState completeGame(Integer gameId) {
		GameEntity game = gameRepo.findById(gameId).get();
		game.setGameState(GameState.COMPLETE);
		gameRepo.save(game);
		return GameState.COMPLETE;
	}

	public GameState setGameStateForGame(Integer gameId, String gameState) {
		GameEntity game = gameRepo.findById(gameId).get();
		game.setGameState(GameState.valueOf(gameState));
		gameRepo.save(game);
		return game.getGameState();
	}

	public GameState getGameStateForGame(Integer gameId) {
		GameEntity game = gameRepo.findById(gameId).get();
		return game.getGameState();
	}
}
