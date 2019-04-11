package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;

public interface EmployerService {

    Employer createEmployer(Employer employer);
    Employer getEmployer();
    Employer updateEmployer();
    void deleteEmployer();
}
