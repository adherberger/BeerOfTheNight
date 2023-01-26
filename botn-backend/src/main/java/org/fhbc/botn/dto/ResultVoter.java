package org.fhbc.botn.dto;

public class ResultVoter implements Comparable<ResultVoter> {
	private String name;
	private String place;
	private int points;
	
	public ResultVoter() {}
	
	public ResultVoter(String name, String place, int points) {
		this.name = name;
		this.place = place;
		this.points = points;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
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
