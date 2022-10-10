package org.fhbc.botn;

import java.sql.Timestamp;

import org.fhbc.botn.dto.ResponseBean;
import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.repo.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BeerOtnHandler {

	@Autowired
	GameRepository gameRepo;
	
	public GameEntity initGame() {
		GameEntity game = new GameEntity();
		game.setGameDate(new Timestamp(System.currentTimeMillis()));
		game.setGameState("INIT");
		return gameRepo.save(game);
	}

}
