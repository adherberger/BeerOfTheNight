package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "member")
// Top level table for keeping track of games
public class MemberEntity {
	
	@Id
	@GeneratedValue(generator="member_id_seq")
	//@SequenceGenerator(name="game_id_seq",sequenceName="GAME_ID_SEQ", allocationSize=1)

	@Column(name = "member_id")
	private int memberId;

	@Column(name = "game_id")
	private int gameId;
	
	@Column(name = "member_name")
	private String memberName;

	@Column(name = "present")
	private boolean present;

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
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


}
