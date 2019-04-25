package edu.sjsu.cmpe275.lab2.group275.controller;

import edu.sjsu.cmpe275.lab2.group275.model.Address;
import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;
import edu.sjsu.cmpe275.lab2.group275.service.EmployerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class EmployeeController {
    //TODO

    private final EmployeeService employeeService;
    private final EmployerService employerService;

    public EmployeeController(EmployeeService employeeService, EmployerService employerService) {
        this.employeeService = employeeService;
        this.employerService = employerService;
    }

    /**
     * Sample test
     * POST: employee?name=XX&email=ZZ&title=UU&street=VV...manageId=WW&employerId=BB&format={json | xml }
     * Description: create an employee
     */
    @RequestMapping(value = "/employee", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createEmployee(@RequestParam String name,
                                            @RequestParam String employerId,
                                            @RequestParam String email,
                                            @RequestParam(required = false) String title,
                                            @RequestParam(required = false) String managerId,
                                            @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                            @RequestParam(required = false) String state, @RequestParam(required = false) String zip) {

        if (name == null || employerId == null || email == null) {
            return new ResponseEntity<>("request paramaters missing", HttpStatus.BAD_REQUEST);
        }

        Employer employer = employerService.getEmployer(Long.parseLong(employerId));
        if (employer == null)
            return new ResponseEntity<>("Employer does not exist", HttpStatus.BAD_REQUEST);
        Employee employee = new Employee();

        long mgrEprId = 0L;
        if (managerId != null) {
            mgrEprId = employeeService.getEmployerIdByEmployeeId(Long.parseLong(managerId));
            Employee manager = employeeService.getEmployee(Long.parseLong(managerId));
            if (mgrEprId != 0L
                    && (mgrEprId == Long.parseLong(employerId))) {
            } else {
                return new ResponseEntity<>((Object) "manager Employer Id Error", HttpStatus.BAD_REQUEST);
            }
            if (manager != null) {
                employee.setManager(manager);
            } else {
                return new ResponseEntity<>((Object) "manager Not Exist", HttpStatus.BAD_REQUEST);
            }
        }

        employee.setName(name);
        employee.setEmployer(employer);
        employee.setEmail(email);
        if (title != null) employee.setTitle(title);
        Address address = new Address();
        if (street != null) address.setStreet(street);
        if (city != null) address.setCity(city);
        if (state != null) address.setState(state);
        if (zip != null) address.setZip(zip);
        employee.setAddress(address);
        return new ResponseEntity<>(employeeService.convertEmployeeToMap(employeeService.createEmployee(employee)), HttpStatus.OK);
    }

    /**
     * Sample test
     * PUT:  employee/{id}?name=XX&email=ZZ&title=UU&street=VV$...... &format={json | xml }
     * Description: update an employee
     */
    @PutMapping(value = "/employee/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,
                                            @RequestParam String name,
                                            @RequestParam String employerId,
                                            @RequestParam String email,
                                            @RequestParam(required = false) String title,
                                            @RequestParam(required = false) String managerId,
                                            @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                            @RequestParam(required = false) String state, @RequestParam(required = false) String zip) {

        System.out.println("update started");
        if (!employeeService.existId(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (email == null || name == null || employerId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (employeeService.duplicateEmail(id, email)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Employee e = employeeService.getEmployee(id);
        if (managerId != null && employeeService.existId(Long.parseLong(managerId))
                && Long.parseLong(employerId) != employeeService.getEmployee(Long.parseLong(managerId)).getEmployer().getId() &&
                !employeeService.sameEmployer(e, employeeService.getEmployee(Long.parseLong(managerId)))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (e.getEmployer().getId() != Long.parseLong(employerId)) {
            System.out.println("start to change employer");
            employeeService.changeEmployer(e, Long.parseLong(employerId));
        }

        if (managerId != null) {
            System.out.println("start to change manager");
            employeeService.changeManager(e, managerId);
        }
        e = employeeService.getEmployee(id);

        e.setName(name);
        e.setEmail(email);

        if (title != null) e.setTitle(title);
        Address address = e.getAddress();
        if (address == null) address = new Address();
        if (street != null) address.setStreet(street);
        if (city != null) address.setCity(city);
        if (state != null) address.setState(state);
        if (zip != null) address.setZip(zip);
        e.setAddress(address);

        employeeService.updateEmployee(e);
        Employee employee = employeeService.getEmployee(id);
        Map<String, Object> response = employeeService.convertEmployeeToMap(employee);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    /**
     * return employee by given employee id
     *
     * @param id employee id
     * @return 404 if id not existed
     * 200 and employee if successful
     * 400 for other error
     */
    @GetMapping(value = "/employee/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> fetchEmployee(@PathVariable Long id) {
        if (employeeService.existId(id)) {
            Employee employee = employeeService.getEmployee(id);
            Map<String, Object> response = employeeService.convertEmployeeToMap(employee);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else if (!employeeService.existId(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete employee by given employee id and collaboration relates to the employee
     *
     * @param id employee id
     * @return 404 if id not existed
     * 400 if employee still has report
     * 200 and employee prior to the deletion
     */
    @DeleteMapping(value = "/employee/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        if (!employeeService.existId(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Employee employee = employeeService.getEmployee(id);
        Map<String, Object> map = employeeService.convertEmployeeToMap(employee);
        ResponseEntity<?> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
        if (!employee.getReports().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        employeeService.deleteEmployee(id);
        return responseEntity;
    }
}
