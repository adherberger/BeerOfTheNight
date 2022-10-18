package org.fhbc.botn;

import java.sql.Timestamp;
import java.util.concurrent.ThreadLocalRandom;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.dto.InitGameResponse;
import org.fhbc.botn.entity.EntryEntity;
import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.repo.EntryRepository;
import org.fhbc.botn.repo.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BeerOtnHandler {

	@Autowired
	GameRepository gameRepo;
	
	@Autowired
	EntryRepository entryRepo;

	public InitGameResponse initGame() {
		GameEntity game = new GameEntity();
		game.setGameDate(new Timestamp(System.currentTimeMillis()));
		game.setGameState("INIT");
		game.setRoomCode(generateRoomCode());
		
		gameRepo.save(game);
		
		InitGameResponse response = new InitGameResponse();
		response.setGameId(game.getGameId());
		response.setRoomCode(game.getRoomCode());
		
		return response;
	}
	
	public void addEntry(AddEntryRequest req) {
		EntryEntity entry = new EntryEntity();
		entry.setGameId(req.getGameId());
		entry.setBrewer(req.getBrewer());
		entry.setBeerName(req.getBeerName());
		entry.setBeerStyle(req.getBeerStyle());
		entryRepo.save(entry);
	}

	public String generateRoomCode() {
		StringBuilder sb = new StringBuilder();
		
		for(int i = 0; i < 4; i++) {
			sb.append((char) ('A' + ThreadLocalRandom.current().nextInt('Z' - 'A' + 1)));
		}
		
		return sb.toString();
	}
}
