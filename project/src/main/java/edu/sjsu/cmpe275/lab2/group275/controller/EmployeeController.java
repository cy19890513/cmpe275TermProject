package edu.sjsu.cmpe275.lab2.group275.controller;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    //TODO

    @Autowired
    private EmployeeService employeeService;

    @GetMapping(value="/employee/{id}", produces={"application/json", "application/xml"})
    public ResponseEntity<?> fetchEmployee(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }

    @DeleteMapping(value="/employee/{id}", produces={"application/json", "application/xml"})
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        return employeeService.deleteEmployee(id);
    }

    @GetMapping(value="/test", produces={"application/json", "application/xml"})
    public ResponseEntity<?> getEmployee() {
        Employee emp = new Employee("Alice", "sss@aa.com");
        return new ResponseEntity<>(emp, HttpStatus.OK);
    }
}
