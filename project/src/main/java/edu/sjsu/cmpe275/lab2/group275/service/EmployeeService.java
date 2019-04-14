package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface EmployeeService {

    Employee createEmployee(Employee employee);
    Employee getEmployee(long id);
    Employee updateEmployee(Employee employee);


    void deleteEmployee(long id);
    boolean existId(long id);
    boolean existEmployees(long employerId);

    long getEmployerIdByEmployeeId(long eId);

    public Map<String, Object> convertEmployeeToMap(Employee employee);
}
