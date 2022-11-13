package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name = "vote")
// Top level table for keeping track of games
public class VoteEntity {
	
	@Id
	@GeneratedValue(generator="vote_id_seq")
	@Column(name = "vote_id")
	private int voteId;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private MemberEntity member;
	
	@ManyToOne
	@JoinColumn(name = "entry_id", nullable = false)
	private EntryEntity entry;

	@Column(name = "place")
	private int place;

	public int getVoteId() {
		return voteId;
	}

	public void setVoteId(int voteId) {
		this.voteId = voteId;
	}

	public MemberEntity getMember() {
		return member;
	}

	public void setMember(MemberEntity member) {
		this.member = member;
	}

	public int getPlace() {
		return place;
	}

	public void setPlace(int place) {
		this.place = place;
	}
}
