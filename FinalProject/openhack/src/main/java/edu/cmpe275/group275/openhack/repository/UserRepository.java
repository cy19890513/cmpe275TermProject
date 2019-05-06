package edu.cmpe275.group275.openhack.repository;


import edu.cmpe275.group275.openhack.model.AdminUser;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;

import edu.cmpe275.group275.openhack.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{


    boolean existsUserByEmail(String email);
    User findOneByUsername(String usernmae);
    User findOneByEmail(String email);
    HackerUser findByEmail(String email);

}
