package org.fhbc.botn.repo;

import org.fhbc.botn.entity.GameMemberPK;
import org.fhbc.botn.entity.VoteEntity;
import org.springframework.data.repository.CrudRepository;

public interface VoteRepository extends CrudRepository<VoteEntity, GameMemberPK> {
}
