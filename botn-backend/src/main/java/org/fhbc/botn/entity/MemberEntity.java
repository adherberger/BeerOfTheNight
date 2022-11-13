package org.fhbc.botn.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "member")
// Table for keeping track of members who have joined a game
public class MemberEntity {

	@Id
	@GeneratedValue(generator = "member_id_seq")
	@Column(name = "member_id")
	private int memberId;

	@ManyToOne
	@JoinColumn(name = "game_id", nullable = false)
	private GameEntity game;

	@Column(name = "member_name")
	private String memberName;

	@Column(name = "present")
	private boolean present;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "entry_id")
	private EntryEntity entry;

	@OneToMany(mappedBy = "member")
	private List<VoteEntity> votes;

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public GameEntity getGame() {
		return game;
	}

	public void setGame(GameEntity game) {
		this.game = game;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public boolean isPresent() {
		return present;
	}

	public void setPresent(boolean present) {
		this.present = present;
	}

	public EntryEntity getEntry() {
		return entry;
	}

	public void setEntry(EntryEntity entry) {
		this.entry = entry;
	}

	public List<VoteEntity> getVotes() {
		return votes;
	}

	public void setVotes(List<VoteEntity> votes) {
		this.votes = votes;
	}

}
