package org.fhbc.botn;

import java.sql.Timestamp;

import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.repo.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BeerOtnHandler {

	@Autowired
	GameRepository gameRepo;
	
	public Object initGame() {
		GameEntity game = new GameEntity();
		game.setGameDate(new Timestamp(System.currentTimeMillis()));
		game.setGameState("INIT");
		gameRepo.save(game);
		
		ResponseBean response = new ResponseBean();
		response.setGameId(game.getGameId());
		
		return response;
	}

}
