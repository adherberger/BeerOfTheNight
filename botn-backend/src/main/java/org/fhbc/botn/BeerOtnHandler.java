package org.fhbc.botn;

import java.sql.Timestamp;
import java.util.concurrent.ThreadLocalRandom;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.GameDto;
import org.fhbc.botn.dto.JoinGameRequest;
import org.fhbc.botn.entity.EntryEntity;
import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.entity.GameEntity.GameState;
import org.fhbc.botn.entity.GameMemberEntity;
import org.fhbc.botn.entity.GameMemberPK;
import org.fhbc.botn.entity.MemberEntity;
import org.fhbc.botn.repo.EntryRepository;
import org.fhbc.botn.repo.GameMemberRepository;
import org.fhbc.botn.repo.GameRepository;
import org.fhbc.botn.repo.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class BeerOtnHandler {

	@Autowired
	GameRepository gameRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	GameMemberRepository gameMemberRepo;
	
	@Autowired
	EntryRepository entryRepo;

	public GameDto initGame() {
		GameEntity game = new GameEntity();
		game.setGameDate(new Timestamp(System.currentTimeMillis()));
		game.setGameState(GameState.INIT);
		game.setRoomCode(generateRoomCode());
		
		gameRepo.save(game);
		
		return new GameDto(game);
	}
	
	public GameDto joinGame(JoinGameRequest req) {
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
		
		GameMemberEntity gameMember = new GameMemberEntity();
		gameMember.setGameMemberId(new GameMemberPK(game.getGameId(), member.getMemberId()));
		gameMember.setGame(game);
		gameMember.setMember(member);
		gameMember.setIsPresent(true);
		gameMemberRepo.save(gameMember);
		
		return new GameDto(game);
	}
	
	public void addEntry(AddEntryRequest req) {
		EntryEntity entry = new EntryEntity();
		MemberEntity brewer = memberRepo.findById(req.getMemberId()).get();
		
		entry.setBrewer(brewer);
		entry.setBeerName(req.getBeerName());
		entry.setBeerStyle(req.getBeerStyle());
		entryRepo.save(entry);
	}

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
}
