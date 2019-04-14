package edu.sjsu.cmpe275.lab2.group275.controller;

import edu.sjsu.cmpe275.lab2.group275.model.Address;
import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;
import edu.sjsu.cmpe275.lab2.group275.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class EmployeeController {
    //TODO

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Autowired
    EmployerService employerService;

    /**
     * Sample test
     * POST: employee?name=XX&email=ZZ&title=UU&street=VV...manageId=WW&employerId=BB&format={json | xml }
     * Description: create an employee
     */
    @RequestMapping(value = "/employee", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createEmployee(@RequestParam String name,
                                            @RequestParam long employerId,
                                            @RequestParam String email,
                                            @RequestParam(required = false) long managerId,
                                            @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                            @RequestParam(required = false) String state, @RequestParam(required = false) String zip,
                                            @RequestParam(required = false) String format){

        if(name == null || employerId == 0L || email == null ) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        Employer employer =  employerService.getEmployer(employerId);
        if(employer == null)
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);

        long mgrEprId = 0L;
        if(managerId != 0L)
            mgrEprId = employeeService.getEmployerIdByEmployeeId(managerId);
        if(managerId != 0L &&  mgrEprId != 0L
           && ( mgrEprId == employerId)){
        }else{
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        Employee employee = new Employee();
        employee.setName(name);
        employee.setEmployer(employer);
        employee.setEmail(email);
        Address address = new Address();
        if(street != null) address.setStreet(street);
        if(city != null) address.setCity(city);
        if(state != null) address.setState(state);
        if(zip != null) address.setZip(zip);
        employee.setAddress(address);

        return new ResponseEntity<>(employeeService.createEmployee(employee), HttpStatus.OK);
    }

    /**
     * Sample test
     * PUT:  employee/{id}?name=XX&email=ZZ&title=UU&street=VV$...... &format={json | xml }
     * Description: update an employee
     */
    @PutMapping(value = "/employee/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEmployee(@RequestParam String name,
                                            @RequestParam long employerId,
                                            @RequestParam String email,
                                            @RequestParam(required = false) long managerId,
                                            @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                            @RequestParam(required = false) String state, @RequestParam(required = false) String zip,
                                            @RequestParam(required = false) String format){

        Employer employer =  employerService.getEmployer(employerId);
        if(employer == null)
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);

        if(name == null || employerId == 0L || email == null ) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        long mgrEprId = 0L;
        if(managerId != 0L)
            mgrEprId = employeeService.getEmployerIdByEmployeeId(managerId);
        if(managerId != 0L &&  mgrEprId != 0L
                && ( mgrEprId == employerId)){
        }else{
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        Employee employee = new Employee();
        employee.setName(name);
        //TODO update here
        employee.setEmployer(employer);
        employee.setEmail(email);
        Address address = new Address();
        if(street != null) address.setStreet(street);
        if(city != null) address.setCity(city);
        if(state != null) address.setState(state);
        if(zip != null) address.setZip(zip);
        employee.setAddress(address);

        //TODO reports will belong to his manager. collabrators stays unchange. check manager same organization.


        return new ResponseEntity<>(employeeService.updateEmployee(employee), HttpStatus.OK);
    }

    @GetMapping(value="/employee/{id}", produces={MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
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

    @DeleteMapping(value="/employee/{id}", produces={MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        if (!employeeService.existId(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Employee employee = employeeService.getEmployee(id);
        ResponseEntity<Employee> responseEntity = new ResponseEntity<>(employee, HttpStatus.OK);
        if (!employee.getReports().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        employeeService.deleteEmployee(id);
        return responseEntity;
    }

    @GetMapping(value="/test", produces={MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> getEmployee() {
        Employee emp = new Employee("Alice", "sss@aa.com");
        return new ResponseEntity<>(employeeService.convertEmployeeToMap(emp), HttpStatus.OK);
    }
}
