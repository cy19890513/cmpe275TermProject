package edu.cmpe275.group275.openhack.repository;

import edu.cmpe275.group275.openhack.model.HackerUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HackerUserRepository extends JpaRepository<HackerUser, Long> {

    boolean existsHackerUserByEmail(String email);
    HackerUser findOneByUsername(String usernmae);
    HackerUser findOneByEmail(String email);
}
