package org.fhbc.botn.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "member")
@SequenceGenerator(name = "member_gen", sequenceName = "member_id_seq",  initialValue = 1001, allocationSize=1)
// Table for keeping track of members who have joined a game
public class MemberEntity {

	@Id
	@GeneratedValue(generator = "member_gen")
	@Column(name = "member_id")
	private int memberId;

	@Column(name = "member_name")
	private String memberName;

	@OneToMany(mappedBy = "member")
	private List<EntryEntity> entries;
	
	@OneToMany(mappedBy = "creator")
	private List<GameEntity> gamesCreated;

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public List<EntryEntity> getEntries() {
		return entries;
	}

	public void setEntries(List<EntryEntity> entries) {
		this.entries = entries;
	}
	
	public List<GameEntity> getGamesCreated() {
		return gamesCreated;
	}
	
	public void setGamesCreated(List<GameEntity> gamesCreated) {
		this.gamesCreated = gamesCreated;
	}
}
