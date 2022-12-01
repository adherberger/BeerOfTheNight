package org.fhbc.botn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "entry")
// Top level table for keeping track of games
public class EntryEntity {

	@Id
	@GeneratedValue(generator = "entry_id_seq")
	@Column(name = "entry_id")
	private int entryId;
	
	@ManyToOne
	@JoinColumn(name = "game_id", nullable = false)
	private GameEntity game;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private MemberEntity brewer;

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

	public MemberEntity getBrewer() {
		return brewer;
	}

	public void setBrewer(MemberEntity brewer) {
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
