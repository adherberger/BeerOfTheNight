package org.fhbc.botn.dto;

public class AddEntryRequest {

		private int gameId;
		private String brewer;
		private String beerName;
		private String beerStyle;
		
		public int getGameId() {
			return gameId;
		}
		public void setGameId(int gameId) {
			this.gameId = gameId;
		}
		public String getBrewer() {
			return brewer;
		}
		public void setBrewer(String brewer) {
			this.brewer = brewer;
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
		
		
}
