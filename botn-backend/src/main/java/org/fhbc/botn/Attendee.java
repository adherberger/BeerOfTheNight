package org.fhbc.botn;

public class Attendee {
	private String name;
	private Boolean hasEntry;
	
	public Attendee() {}

	public Attendee(String name, Boolean hasEntry) {
		this.name = name;
		this.hasEntry = hasEntry;
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

}