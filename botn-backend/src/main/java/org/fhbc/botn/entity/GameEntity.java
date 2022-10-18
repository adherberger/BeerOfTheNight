package org.fhbc.botn.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "game_main")
// Top level table for keeping track of games
public class GameEntity {
	
	@Id
	@GeneratedValue(generator="game_id_seq")
	//@SequenceGenerator(name="game_id_seq",sequenceName="GAME_ID_SEQ", allocationSize=1)

	@Column(name = "game_id")
	private int gameId;
	
	@Column(name = "game_state")
	private String gameState;
	
	@Column(name = "game_date")
	private Timestamp gameDate;
	
	@Column(name = "room_code")
	private String roomCode;
	
	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getGameState() {
		return gameState;
	}

	public void setGameState(String gameState) {
		this.gameState = gameState;
	}

	public Timestamp getGameDate() {
		return gameDate;
	}

	public void setGameDate(Timestamp gameDate) {
		this.gameDate = gameDate;
	}

	public String getRoomCode() {
		return roomCode;
	}

	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}
}
