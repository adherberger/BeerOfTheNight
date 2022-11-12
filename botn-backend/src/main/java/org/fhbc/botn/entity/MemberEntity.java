package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "member")
public class MemberEntity {
	@Id
	@GeneratedValue(generator = "member_id_seq")
	// @SequenceGenerator(name="game_id_seq",sequenceName="GAME_ID_SEQ",
	// allocationSize=1)

	@Column(name = "member_id")
	private int memberId;

	@Column(name = "game_id")
	private int gameId;

	@Column(name = "name")
	private String name;

	@Column(name = "is_present")
	private Boolean isPresent;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsPresent() {
		return isPresent;
	}

	public void setIsPresent(Boolean isPresent) {
		this.isPresent = isPresent;
	}

}
