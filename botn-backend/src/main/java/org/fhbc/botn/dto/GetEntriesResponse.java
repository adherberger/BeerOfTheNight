package org.fhbc.botn.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

public class GetEntriesResponse {

	private List<Entry> entryList;
	
	public GetEntriesResponse() {
		entryList = new ArrayList<Entry>();
	}
	
	public class Entry {
		private int entryId;
		private String brewer;
		private String beerName;
		private String beerStyle;
		
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

	}

	public List<Entry> getEntryList() {
		return entryList;
	}

	public void setEntryList(List<Entry> entryList) {
		this.entryList = entryList;
	}
}
