package org.fhbc.botn.entity;

import java.io.Serializable;

import javax.persistence.Column;

public class VotePK implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "member_id")
	Integer memberId;

	@Column(name = "entry_id")
	Integer entryId;

	public VotePK() {
	}

	public VotePK(Integer memberId, Integer entryId) {
		this.memberId = memberId;
		this.entryId = entryId;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public Integer getEntryId() {
		return entryId;
	}

	public void setEntryId(Integer entryId) {
		this.entryId = entryId;
	}

}
