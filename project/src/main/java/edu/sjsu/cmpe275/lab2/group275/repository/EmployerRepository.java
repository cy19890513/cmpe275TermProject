<<<<<<< HEAD
package edu.sjsu.cmpe275.lab2.group275.repository;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    boolean existsByName(String name);
    Employer findByName(String name);

}
=======
package edu.sjsu.cmpe275.lab2.group275.repository;

import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    boolean existsByName(String name);

    Employer findByName(String name);
}
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
