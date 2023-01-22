package org.fhbc.botn.dto;

public class ResultVoter implements Comparable<ResultVoter> {
	private String name;
	private int points;
	
	public ResultVoter() {}
	
	public ResultVoter(String name, int points) {
		this.name = name;
		this.points = points;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	
	@Override
	public int compareTo(ResultVoter o) {
		if (this.points > o.getPoints()) {
			return 1;
		} else if (this.points < o.getPoints()){
			return -1;
		} else {
			return 0;
		}
	}
}
