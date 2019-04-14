package edu.sjsu.cmpe275.lab2.group275.service;


import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


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
    public ResponseEntity<?> getEmployee(long id){
        if (employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(employeeRepository.getOne(id));
        } else if (!employeeRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
    public ResponseEntity<?> deleteEmployee(long id){
        if (!employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Employee employee = employeeRepository.getOne(id);
        if (!employee.getReports().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // TODO delete collaboration
        return ResponseEntity.status(HttpStatus.OK).body(employee);
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
