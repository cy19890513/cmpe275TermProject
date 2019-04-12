package edu.sjsu.cmpe275.lab2.group275.repository;
import edu.sjsu.cmpe275.lab2.group275.model.Employee;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
