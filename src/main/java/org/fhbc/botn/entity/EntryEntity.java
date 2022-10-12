package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "entry")
// Top level table for keeping track of games
public class EntryEntity {
	
	@Id
	@GeneratedValue(generator="entry_id_seq")
	//@SequenceGenerator(name="game_id_seq",sequenceName="GAME_ID_SEQ", allocationSize=1)

	@Column(name = "entry_id")
	private int entryId;

	@Column(name = "game_id")
	private int gameId;
	
	@Column(name = "brewer")
	private String brewer;

	@Column(name = "beer_name")
	private String beerName;

	@Column(name = "beer_style")
	private String beerStyle;

	public int getEntryId() {
		return entryId;
	}

	public void setEntryId(int entryId) {
		this.entryId = entryId;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getBrewer() {
		return brewer;
	}

	public void setBrewer(String brewer) {
		this.brewer = brewer;
	}

	public String getBeerName() {
		return beerName;
	}

	public void setBeerName(String beerName) {
		this.beerName = beerName;
	}

	public String getBeerStyle() {
		return beerStyle;
	}

	public void setBeerStyle(String beerStyle) {
		this.beerStyle = beerStyle;
	}

}
