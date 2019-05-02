<<<<<<< HEAD
package edu.sjsu.cmpe275.lab2.group275.repository;

import java.util.*;
import edu.sjsu.cmpe275.lab2.group275.model.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    //long countEmployeeByEmployer(long id);
    boolean existsByEmployerId(long id);
    Employee findByEmail(String email);
  
}

=======
package edu.sjsu.cmpe275.lab2.group275.repository;

import java.util.*;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    //long countEmployeeByEmployer(long id);
    boolean existsByEmployerId(long id);

    Employee findByEmail(String email);
}

>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
