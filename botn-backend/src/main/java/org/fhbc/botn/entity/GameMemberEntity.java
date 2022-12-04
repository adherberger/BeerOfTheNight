package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "game_member")
public class GameMemberEntity {
	@EmbeddedId
	GameMemberPK gameMemberId;
	
	@ManyToOne
	@MapsId("gameId")
	@JoinColumn(name = "game_id")
	GameEntity game;
	
	@ManyToOne
	@MapsId("memberId")
	@JoinColumn(name = "member_id")
	MemberEntity member;
	
	@Column(name = "is_present")
	Boolean isPresent;
	
	public GameMemberEntity() {}
	
	public GameMemberEntity(GameEntity game, MemberEntity member, Boolean isPresent) {
		this.game = game;
		this.member = member;
		this.isPresent = isPresent;
	}

	public GameMemberPK getGameMemberId() {
		return gameMemberId;
	}

	public void setGameMemberId(GameMemberPK gameMemberId) {
		this.gameMemberId = gameMemberId;
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

	public Boolean getIsPresent() {
		return isPresent;
	}

	public void setIsPresent(Boolean isPresent) {
		this.isPresent = isPresent;
	}
}
