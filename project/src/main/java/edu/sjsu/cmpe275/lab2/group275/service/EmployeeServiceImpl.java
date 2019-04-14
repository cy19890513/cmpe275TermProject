package edu.sjsu.cmpe275.lab2.group275.service;


import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Employee getEmployee(Long id){
        return employeeRepository.getOne(id);

    }

    @Transactional
    public Employee updateEmployee(Employee employee){
        //TODO
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id){
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
