package edu.sjsu.cmpe275.lab2.group275.service;


import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Autowired
    EmployerService employerService;

    @Transactional
    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee getEmployee(long id){
        return employeeRepository.getOne(id);
    }

    /**
     * Convert employee's information to a Map
     * To clean up manager, reports, and collaborators
     * @param employee
     * @return LinkedHashMap ready to respond http request
     */
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

    /**
     * Clean up employee for manager and reports
     * @param employee
     * @return LinkedHashMap with id, name, and title
     */
    private Map<String, Object> simplifyEmployeeToMap(Employee employee) {
        Map<String, Object> map = new LinkedHashMap<>();
        if (employee != null) {
            map.put("id", employee.getId());
            map.put("name", employee.getName());
            map.put("title", employee.getTitle());
        }
        return map;
    }

    /**
     * Convert List<Employee> to List<Map>>
     * @param reports list of employee
     * @return List<Map<String, Object>>
     */
    private List<Map<String, Object>> generateReports(List<Employee> reports) {
        List<Map<String, Object>> list = new ArrayList<>();
        if (reports != null) {
            for (Employee report : reports) {
                list.add(simplifyEmployeeToMap(report));
            }
        }
        return list;
    }

    /**
     * Convert List of employee to List of Maps include employee's id, name, and title
     * @param cols list of employee
     * @return List of Maps include employee's id, name, and title
     */
    private List<Map<String, Object>> generateCollaborators(List<Employee> cols) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map;
        if (cols != null) {
            for (Employee employee : cols) {
                map = simplifyEmployeeToMap(employee);
                map.put("employer", generateEmployerMap(employee.getEmployer()));
                list.add(map);
            }
        }
        return list;
    }

    /**
     * Convert employer to Map includes employer's id and name
     * @param employer
     * @return Map includes employer's id and name
     */
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

    public boolean duplicateEmail(long id, String email){
        if(employeeRepository.findByEmail(email) != null){
            if(employeeRepository.findByEmail(email).getId() != id){
                return true;
            }
        }
        return false;
    }

    @Transactional
    public Employee updateEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(long id){
        Employee employee = employeeRepository.getOne(id);
        if (employee.getCollaborators() != null) {
            Iterator<Employee> it = employee.getCollaborators().iterator();
            while (it.hasNext()) {
                Employee col = it.next();
                it.remove();
                col.getCollaborators().remove(employee);
            }
        }
        employeeRepository.deleteById(id);
    }

    @Transactional
    public boolean existId(long id){
        return employeeRepository.existsById(id);
    }

    public boolean isCollaborators(long id1, long id2){
        Employee e1 = employeeRepository.getOne(id1);
        Employee e2 = employeeRepository.getOne(id2);
        List<Employee> l1 = e1.getCollaborators();
        List<Employee> l2 = e2.getCollaborators();
        if(l1 == null || l2 == null || getCollaboratorIndex(l1, e2) == -1 || getCollaboratorIndex(l2, e1) == -1){
            return false;
        }

        return true;
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
    public boolean sameEmployer(Employee e1, Employee manager){
        return e1.getEmployer() == manager.getEmployer();
    }

    @Transactional
    public void changeEmployer(Employee e, long employerId){
        if(e.getManager() != null){
            System.out.println("manager not null printed");
            changeReportManager(e);
        }else{
            System.out.println("manager null printed");
            deleteReportManager(e);
        }

        e.setEmployer(employerService.getEmployer(employerId));
        employeeRepository.save(e);
    }

    @Transactional
    public void changeManager(Employee e, String managerId){
        if(managerId != null){
            System.out.println("managerId not null");
            long mId = Long.parseLong(managerId);
            if(existId(mId) && sameEmployer(e, getEmployee(mId))){
                e.setManager(getEmployee(mId));
                employeeRepository.save(e);
            }
        }
    }

    @Transactional
    public void changeReportManager(Employee e){
        List<Employee> eReports = e.getReports();
        Employee manager = e.getManager();
        for(Employee tempE: eReports){
            tempE.setManager(manager);
            employeeRepository.save(tempE);
        }
        e.setReports(null);
        employeeRepository.save(e);
    }

    @Transactional
    public void deleteReportManager(Employee e){
        List<Employee> eReports = e.getReports();
        for(Employee tempE: eReports){
            tempE.setManager(null);
            employeeRepository.save(tempE);
        }
        e.setReports(null);
        employeeRepository.save(e);
    }

    @Transactional
    public void updateManager( List<Employee> reports, long mgrEId){

    }

    @Transactional
    public void addCollabrator(long id1, long id2){
        Employee e1 = employeeRepository.getOne(id1);
        Employee e2 = employeeRepository.getOne(id2);
        List<Employee> l1 = e1.getCollaborators();
        List<Employee> l2 = e2.getCollaborators();
        if(l1 == null) l1 = new ArrayList<>();
        if(l2 == null) l2 = new ArrayList<>();
        if(getCollaboratorIndex(l1, e2) == -1){
            l1.add(e2);
        }
        if(getCollaboratorIndex(l2,e1) == -1){
            l2.add(e1);
        }
        e1.setCollaborators(l1);
        e2.setCollaborators(l2);
        employeeRepository.save(e1);
        employeeRepository.save(e2);

    }

    @Transactional
    public void deleteCollaborator(long id1, long id2){
        Employee e1 = employeeRepository.getOne(id1);
        Employee e2 = employeeRepository.getOne(id2);
        List<Employee> l1 = e1.getCollaborators();
        List<Employee> l2 = e2.getCollaborators();
        if(l1 != null && l2 != null) {
            int index1 = getCollaboratorIndex(l1, e2);
            int index2 = getCollaboratorIndex(l2, e1);
            if (index1 != -1 && index2 != -1) {
                l1.remove(index1);
                l2.remove(index2);
                e1.setCollaborators(l1);
                e2.setCollaborators(l2);
                employeeRepository.save(e1);
                employeeRepository.save(e2);
            }
        }

    }

    public int getCollaboratorIndex(List<Employee> list, Employee e){
        for(int i = 0; i < list.size(); i++){
            if(list.get(i) == e){
                return i;
            }
        }
        return -1;
    }

}
