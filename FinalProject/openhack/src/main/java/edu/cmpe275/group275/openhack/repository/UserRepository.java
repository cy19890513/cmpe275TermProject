package edu.cmpe275.group275.openhack.repository;

<<<<<<< HEAD
import edu.cmpe275.group275.openhack.model.Organization;
=======
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
import edu.cmpe275.group275.openhack.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
<<<<<<< HEAD
    User findUserByEmail(String email);
    boolean existsUserByEmailAndHashcode(String email, String hashcode);



=======
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab

}
