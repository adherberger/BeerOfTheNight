package org.fhbc.botn.repo;

import java.util.List;

import org.fhbc.botn.entity.MemberEntity;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<MemberEntity, Integer> {
}
