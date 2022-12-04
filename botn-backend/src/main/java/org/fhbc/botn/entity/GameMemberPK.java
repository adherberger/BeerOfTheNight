package org.fhbc.botn.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class GameMemberPK implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "game_id")
	Integer gameId;

	@Column(name = "member_id")
	Integer memberId;

	public GameMemberPK() {
	}

	public GameMemberPK(Integer gameId, Integer memberId) {
		this.gameId = gameId;
		this.memberId = memberId;
	}

	public Integer getGameId() {
		return gameId;
	}

	public void setGameId(Integer gameId) {
		this.gameId = gameId;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof GameMemberPK)) {
			return false;
		}

		GameMemberPK that = (GameMemberPK) o;
		return Objects.equals(this.getGameId(), that.getGameId())
				&& Objects.equals(this.getMemberId(), that.getMemberId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(gameId, memberId);
	}
}
