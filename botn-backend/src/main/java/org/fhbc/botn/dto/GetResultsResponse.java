package org.fhbc.botn.dto;

import java.util.ArrayList;
import java.util.List;

public class GetResultsResponse {

	private List<Entry> resultsList;
	
	public GetResultsResponse()  {
		resultsList = new ArrayList<Entry>();
	}
	
	public class Entry implements Comparable<Entry> {
		private int entryId;
		private String brewer;
		private String beerName;
		private String beerStyle;
		public int[] votes = new int[3];
		private int score=0;
		
		public int getEntryId() {
			return entryId;
		}
		public void setEntryId(int entryId) {
			this.entryId = entryId;
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
		public int getScore() {
			return score;
		}
		public void setScore(int score) {
			this.score = score;
		}
		
		@Override
		public int compareTo(Entry o) {
			if (this.score > o.score) {
				return 1;
			} else if (this.score < o.score){
				return -1;
			} else {
				return 0;
			}
		}
	}
	
	public List<Entry> getResultsList() {
		return resultsList;
	}

	public void setResultsList(List<Entry> entryList) {
		this.resultsList = entryList;
	}
}
