package org.fhbc.botn.dto;

public class Vote {
	private String name;
	private Boolean didVote;
	
	public Vote() {}

	public Vote(String name, Boolean didVote) {
		this.name = name;
		this.didVote = didVote;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getDidVote() {
		return didVote;
	}

	public void setDidVote(Boolean didVote) {
		this.didVote = didVote;
	}

}