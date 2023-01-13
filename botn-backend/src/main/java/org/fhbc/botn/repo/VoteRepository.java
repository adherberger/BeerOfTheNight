package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.GameMemberPK;
import org.fhbc.botn.entity.VoteEntity;
import org.springframework.data.repository.CrudRepository;

public interface VoteRepository extends CrudRepository<VoteEntity, GameMemberPK> {
	public List<VoteEntity> findAllByGame_GameId(int gameId);
	public VoteEntity findByGame_GameIdAndMember_MemberId(Integer gameId,Integer memberId);
}
