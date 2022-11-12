package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "vote")
// Top level table for keeping track of games
public class VoteEntity {
	
	@Id
	@GeneratedValue(generator="vote_id_seq")

	@Column(name = "vote_id")
	private int voteId;

	@Column(name = "member_id")
	private int memberId;

	@Column(name = "game_id")
	private int gameId;

	@Column(name = "place")
	private int place;

	public int getVoteId() {
		return voteId;
	}

	public void setVoteId(int voteId) {
		this.voteId = voteId;
	}

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public int getPlace() {
		return place;
	}

	public void setPlace(int place) {
		this.place = place;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}
	

}
