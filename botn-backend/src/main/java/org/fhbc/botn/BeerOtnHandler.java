package org.fhbc.botn;

import java.sql.Timestamp;

import org.fhbc.botn.dto.AddEntryRequest;
import org.fhbc.botn.entity.EntryEntity;
import org.fhbc.botn.dto.InitGameResponse;
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
		gameRepo.save(game);
		
		InitGameResponse response = new InitGameResponse();
		response.setGameId(game.getGameId());
		
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

}
