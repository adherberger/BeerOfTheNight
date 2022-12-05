package org.fhbc.botn.entity;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "game_main")
@SequenceGenerator(name = "game_gen", sequenceName = "game_id_seq",  initialValue = 1001, allocationSize=1)
// Top level table for keeping track of games
public class GameEntity {
	public enum GameState {
		INIT, IN_PROGRESS, RESULTS_RECEIVED, COMPLETE
	}

	@Id
	@GeneratedValue(generator = "game_gen")
	@Column(name = "game_id")
	private int gameId;

	@Column(name = "game_state")
	private GameState gameState;

	@Column(name = "game_date")
	private Timestamp gameDate;

	@Column(name = "room_code")
	private String roomCode;

	@OneToMany(mappedBy = "game")
	private List<EntryEntity> entries;
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = true)
	private MemberEntity creator;

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public GameState getGameState() {
		return gameState;
	}

	public void setGameState(GameState gameState) {
		this.gameState = gameState;
	}

	public Timestamp getGameDate() {
		return gameDate;
	}

	public void setGameDate(Timestamp gameDate) {
		this.gameDate = gameDate;
	}

	public String getRoomCode() {
		return roomCode;
	}

	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}

	public List<EntryEntity> getEntries() {
		return entries;
	}

	public void setEntries(List<EntryEntity> entries) {
		this.entries = entries;
	}

	public MemberEntity getCreator() {
		return creator;
	}
	
	public void setCreator(MemberEntity creator) {
		this.creator = creator;
	}
}
