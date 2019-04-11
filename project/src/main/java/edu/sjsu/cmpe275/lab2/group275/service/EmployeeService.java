package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;

public interface EmployeeService {

    Employee createEmployee(Employee employee);
    Employee getEmployee();
    Employee updateEmployee();
    void deleteEmployee();
}
