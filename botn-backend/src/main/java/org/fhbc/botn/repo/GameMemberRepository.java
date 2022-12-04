package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.GameMemberEntity;
import org.fhbc.botn.entity.GameMemberPK;
import org.springframework.data.repository.CrudRepository;

public interface GameMemberRepository extends CrudRepository<GameMemberEntity, GameMemberPK> {
	public List<GameMemberEntity> findByGameGameId(Integer gameId);
	public List<GameMemberEntity> findByMemberMemberId(Integer memberId);
}
