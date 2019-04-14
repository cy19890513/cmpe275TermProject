package edu.sjsu.cmpe275.lab2.group275.controller;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    //TODO

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employee/{id}")
    Employee fetchEmployee(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }

    @DeleteMapping("/employee/{id}")
    void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
