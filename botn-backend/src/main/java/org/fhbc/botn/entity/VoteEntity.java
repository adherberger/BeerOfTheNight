package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "vote")
// Top level table for keeping track of games
public class VoteEntity {
	@EmbeddedId
	VotePK voteId;

	@ManyToOne
	@MapsId("memberId")
	@JoinColumn(name = "member_id")
	private MemberEntity member;

	@ManyToOne
	@MapsId("entryId")
	@JoinColumn(name = "entry_id")
	private EntryEntity entry;

	@Column(name = "place")
	private int place;

	public VotePK getVoteId() {
		return voteId;
	}

	public void setVoteId(VotePK voteId) {
		this.voteId = voteId;
	}

	public MemberEntity getMember() {
		return member;
	}

	public void setMember(MemberEntity member) {
		this.member = member;
	}

	public EntryEntity getEntry() {
		return entry;
	}

	public void setEntry(EntryEntity entry) {
		this.entry = entry;
	}

	public int getPlace() {
		return place;
	}

	public void setPlace(int place) {
		this.place = place;
	}

}
