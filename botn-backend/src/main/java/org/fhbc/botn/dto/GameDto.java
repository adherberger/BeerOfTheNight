package org.fhbc.botn.dto;

import org.fhbc.botn.entity.GameEntity;

public class GameDto {

	private int gameId;
	private String roomCode;
	
	public GameDto(GameEntity game) {
		this.gameId = game.getGameId();
		this.roomCode = game.getRoomCode();
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getRoomCode() {
		return roomCode;
	}

	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}
}
