package org.fhbc.botn.entity;

import java.io.Serializable;
import java.util.Objects;

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

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof VotePK)) {
			return false;
		}

		VotePK that = (VotePK) o;
		return Objects.equals(this.getMemberId(), that.getMemberId())
				&& Objects.equals(this.getEntryId(), that.getEntryId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(memberId, entryId);
	}
}
