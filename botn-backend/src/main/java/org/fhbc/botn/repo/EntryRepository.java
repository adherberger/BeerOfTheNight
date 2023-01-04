package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.EntryEntity;
import org.fhbc.botn.entity.GameEntity;
import org.fhbc.botn.entity.MemberEntity;
import org.springframework.data.repository.CrudRepository;

public interface EntryRepository extends CrudRepository<EntryEntity, Integer> {
	List<EntryEntity> findAllByGame_GameId(int gameId);
	
	
	EntryEntity findByGameAndMember(GameEntity game, MemberEntity member);


	EntryEntity findByGame_GameIdAndMember_MemberId(Integer gameId, Integer memberId);
}
