package org.fhbc.botn.dto;

public class AddEntryForRequest {

	private int gameId;
	private String brewerName;
	private String beerName;
	private String beerStyle;

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getBeerName() {
		return beerName;
	}

	public void setBeerName(String beerName) {
		this.beerName = beerName;
	}

	public String getBeerStyle() {
		return beerStyle;
	}

	public void setBeerStyle(String beerStyle) {
		this.beerStyle = beerStyle;
	}

	public String getBrewerName() {
		return brewerName;
	}

	public void setBrewerName(String brewerName) {
		this.brewerName = brewerName;
	}

}
