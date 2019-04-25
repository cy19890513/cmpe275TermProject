package edu.sjsu.cmpe275.lab2.group275.service;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;

import java.util.List;


import java.util.Map;

public interface EmployeeService {

    Employee createEmployee(Employee employee);

    Employee getEmployee(long id);

    Employee getEmployeeById(long id);

    Employee updateEmployee(Employee employee);

    void changeEmployer(Employee e, long employerId);

    boolean sameEmployer(Employee e1, Employee manager);

    boolean duplicateEmail(long id, String email);

    void changeManager(Employee e, String managerId);

    void deleteEmployee(long id);

    boolean existId(long id);

    boolean existEmployees(long employerId);

    boolean isCollaborators(long id1, long id2);

    long getEmployerIdByEmployeeId(long eId);

    void addCollabrator(long id1, long id2);

    Map<String, Object> convertEmployeeToMap(Employee employee);

    void updateManager(List<Employee> reports, long mgrEId);

    void deleteCollaborator(long id1, long id2);
}
