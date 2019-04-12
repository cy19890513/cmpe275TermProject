package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.http.ResponseEntity;

public interface EmployerService {

    Employer createEmployer(Employer employer);
    ResponseEntity<Employer> getEmployer(long id);
    Employer updateEmployer(Employer employer);
    ResponseEntity<?> deleteEmployer(long id);
}
