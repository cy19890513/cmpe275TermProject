package edu.sjsu.cmpe275.lab2.group275.service;


import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee getEmployee(long id){
        return employeeRepository.getOne(id);
    }

    public Map<String, Object> convertEmployeeToMap(Employee employee) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", employee.getId());
        map.put("name", employee.getName());
        map.put("email", employee.getEmail());
        map.put("title", employee.getTitle());
        map.put("Address", employee.getAddress());
        map.put("employer", generateEmployerMap(employee.getEmployer()));
        map.put("manager", simplifyEmployeeToMap(employee.getManager()));
        map.put("reports", generateReports(employee.getReports()));
        map.put("collaborators", generateCollaborators(employee.getCollaborators()));
        return map;
    }

    private Map<String, Object> simplifyEmployeeToMap(Employee employee) {
        Map<String, Object> map = new LinkedHashMap<>();
        if (employee != null) {
            map.put("id", employee.getId());
            map.put("name", employee.getName());
            map.put("title", employee.getTitle());
        }
        return map;
    }

    private List<Map<String, Object>> generateReports(List<Employee> reports) {
        List<Map<String, Object>> list = new ArrayList<>();
        if (reports != null) {
            for (Employee report : reports) {
                list.add(simplifyEmployeeToMap(report));
            }
        }
        return list;
    }

    private List<Map<String, Object>> generateCollaborators(List<Employee> cols) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map;
        if (cols != null) {
            for (Employee employee : cols) {
                map = simplifyEmployeeToMap(employee);
                map.put("employer", generateEmployerMap(employee.getEmployer()));
            }
        }
        return list;
    }

    private Map<String, Object> generateEmployerMap(Employer employer) {
        Map<String, Object> employerMap = new LinkedHashMap<>();
        if (employer != null) {
            employerMap.put("id", employer.getId());
            employerMap.put("name", employer.getName());
        }
        return employerMap;
    }

    @Transactional
    public Employee getEmployeeById(long id){
        if (employeeRepository.existsById(id)) {
            return employeeRepository.getOne(id);
        }
        return null;
    }

    @Transactional
    public Employee updateEmployee(Employee employee){
        //TODO
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(long id){
        Employee employee = employeeRepository.getOne(id);
        employee.removeAllCollaborators();
        employeeRepository.deleteById(id);
    }

    @Transactional
    public boolean existId(long id){
        return employeeRepository.existsById(id);
    }

    public boolean isCollaborators(long id1, long id2){
        return false;
    }

    @Transactional
    public boolean existEmployees(long employerId){

       return employeeRepository.existsByEmployerId(employerId);
    }

    @Transactional
    public long getEmployerIdByEmployeeId(long employeeId){
        if (employeeRepository.existsById(employeeId)) {
            Employee e = employeeRepository.getOne(employeeId);
            Employer er = e.getEmployer();
            return er.getId();
        }

        return 0L;
    }

    @Transactional
    public void updateManager( List<Employee> reports, long mgrEId){

    }

    @Transactional
    public void addCollabrator(){
        
    }

}
