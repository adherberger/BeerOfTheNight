package org.fhbc.botn.dto;

import java.util.ArrayList;
import java.util.List;
	
public class Result implements Comparable<Result> {
	private int entryId;
	private String brewer;
	private String beerName;
	private String beerStyle;
	List<ResultVoter> voters = new ArrayList<>();
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
	public List<ResultVoter> getVoters() {
		return voters;
	}
	public void setVoters(List<ResultVoter> voters) {
		this.voters = voters;
	}
	@Override
	public int compareTo(Result o) {
		if (this.score > o.getScore()) {
			return 1;
		} else if (this.score < o.getScore()){
			return -1;
		} else {
			return 0;
		}
	}
	public void incrementScoreBy(int points) {
		this.score += points;
	}
	public void addVoter(ResultVoter voter) {
		voters.add(voter);
	}
}
