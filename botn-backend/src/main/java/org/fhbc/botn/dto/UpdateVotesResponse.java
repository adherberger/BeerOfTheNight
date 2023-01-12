package org.fhbc.botn.dto;

import java.util.ArrayList;
import java.util.List;

public class UpdateVotesResponse {

	private List<Vote> voteList;
	private boolean allVotesIn;
	
	public UpdateVotesResponse () {
		voteList = new ArrayList<Vote>();
	}

	public List<Vote> getVoteList() {
		return voteList;
	}

	public void setVoteList(List<Vote> voteList) {
		this.voteList = voteList;
	}

	public boolean isAllVotesIn() {
		return allVotesIn;
	}

	public void setAllVotesIn(boolean allVotesIn) {
		this.allVotesIn = allVotesIn;
	}
	
	
}
