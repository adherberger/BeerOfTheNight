package org.fhbc.botn.repo;

import org.fhbc.botn.entity.EntryEntity;
import org.springframework.data.repository.CrudRepository;

public interface EntryRepository extends CrudRepository<EntryEntity, String> {

}
