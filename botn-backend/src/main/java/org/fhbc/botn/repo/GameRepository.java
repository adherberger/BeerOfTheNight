package org.fhbc.botn.repo;

import org.fhbc.botn.entity.GameEntity;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<GameEntity, String> {

}
