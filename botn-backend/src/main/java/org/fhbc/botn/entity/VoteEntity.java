package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "vote")
@SequenceGenerator(name = "vote_gen", sequenceName = "vote_id_seq",  initialValue = 1001)
// Top level table for keeping track of games
public class VoteEntity {
	
	@Id
	@GeneratedValue(generator = "vote_gen")
	@Column(name = "vote_id")
	private int voteId;

	@ManyToOne
	@JoinColumn(name = "game_id", referencedColumnName="game_id")
	private GameEntity game;

	@ManyToOne
	@JoinColumn(name = "member_id", referencedColumnName="member_id")
	private MemberEntity member;

	@ManyToOne
	@JoinColumn(name = "first_id", referencedColumnName="entry_id")
	private EntryEntity first;

	@ManyToOne
	@JoinColumn(name = "second_id", referencedColumnName="entry_id")
	private EntryEntity second;


	@ManyToOne
	@JoinColumn(name = "third_id", referencedColumnName="entry_id")
	private EntryEntity third;

	public int getVoteId() {
		return voteId;
	}

	public void setVoteId(int voteId) {
		this.voteId = voteId;
	}

	public GameEntity getGame() {
		return game;
	}

	public void setGame(GameEntity game) {
		this.game = game;
	}

	public MemberEntity getMember() {
		return member;
	}

	public void setMember(MemberEntity member) {
		this.member = member;
	}

	public EntryEntity getFirst() {
		return first;
	}

	public void setFirst(EntryEntity first) {
		this.first = first;
	}

	public EntryEntity getSecond() {
		return second;
	}

	public void setSecond(EntryEntity second) {
		this.second = second;
	}

	public EntryEntity getThird() {
		return third;
	}

	public void setThird(EntryEntity third) {
		this.third = third;
	}


}
