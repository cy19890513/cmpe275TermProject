package edu.cmpe275.group275.openhack.repository;

import edu.cmpe275.group275.openhack.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
