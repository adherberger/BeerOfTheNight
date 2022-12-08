package org.fhbc.botn.dto;

public class JoinGameResponse {
	private int gameId;
	private String roomCode;
	private int memberId;
	private String brewerName;
	
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
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getBrewerName() {
		return brewerName;
	}
	public void setBrewerName(String brewerName) {
		this.brewerName = brewerName;
	}
	
	
}
