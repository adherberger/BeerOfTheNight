package org.fhbc.botn.dto;

public class Attendee {
	private String name;
	private Boolean hasEntry;
	private Boolean noEntry;
	private Boolean isPresent;
	
	public Attendee() {}

	public Attendee(String name, Boolean hasEntry, Boolean isPresent) {
		this.name = name;
		this.hasEntry = hasEntry;
		
		this.isPresent = isPresent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getHasEntry() {
		return hasEntry;
	}

	public void setHasEntry(Boolean hasEntry) {
		this.hasEntry = hasEntry;
	}

	public Boolean getPresent() {
		return isPresent;
	}

	public void setPresent(Boolean present) {
		isPresent = present;
	}

	public Boolean getNoEntry() {
		return noEntry;
	}

	public void setNoEntry(Boolean noEntry) {
		this.noEntry = noEntry;
	}
}