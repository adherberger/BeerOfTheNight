package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.VoteEntity;
import org.springframework.data.repository.CrudRepository;

public interface VoteRepository extends CrudRepository<VoteEntity, String> {

		public List<VoteEntity> readByGameId(long gameId);
}
