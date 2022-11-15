package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.EntryEntity;
import org.springframework.data.repository.CrudRepository;

public interface EntryRepository extends CrudRepository<EntryEntity, Integer> {

	public List<EntryEntity> findAllByGameId(int gameId);
}
