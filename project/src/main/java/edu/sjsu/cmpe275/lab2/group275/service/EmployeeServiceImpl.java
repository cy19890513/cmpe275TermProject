package edu.sjsu.cmpe275.lab2.group275.service;


import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.model.Address;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public Employee createEmployee(Employee employee){

        return employeeRepository.save(employee);
    }

    @Transactional
    public ResponseEntity<Employee> getEmployee(long id){
        if (employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(employeeRepository.getOne(id));
        } else if (!employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Transactional
    public Employee updateEmployee(Employee employee){
        //TODO
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(long id){
        //TODO
        employeeRepository.deleteById(id);

    }

    @Transactional
    public boolean existId(Long id){
        return employeeRepository.existsById(id);
    }

    public boolean isCollaborators(long id1, long id2){
        return false;
    }

}
