package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import org.springframework.http.ResponseEntity;

public interface EmployeeService {

    Employee createEmployee(Employee employee);
    ResponseEntity<?> getEmployee(long id);
    Employee updateEmployee(Employee employee);


    ResponseEntity<?> deleteEmployee(long id);
    boolean existId(long id);
    boolean existEmployees(long employerId);

}
