package edu.sjsu.cmpe275.lab2.group275.service;

import java.util.*;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployerRepository;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class EmployerServiceImpl implements EmployerService {
    private final EmployerRepository employerRepository;
    private final EmployeeRepository employeeRepository;

    public EmployerServiceImpl(EmployerRepository employerRepository, EmployeeRepository employeeRepository) {
        this.employerRepository = employerRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Employer createEmployer(Employer employer){
        return employerRepository.save(employer);
    }

    @Transactional
    public Employer getEmployer(long id) {

        if(employerRepository.existsById(id)) {
            return employerRepository.getOne(id);
        }
        return null;
    }

    @Transactional
    public Employer updateEmployer(Employer employer){
        return employerRepository.save(employer);
    }

    @Transactional
    public void deleteEmployer(long id){

            employerRepository.deleteById(id);
    }

    public boolean isEmployerExistByName(String name){
        return employerRepository.existsByName(name);
    }

    public boolean isEmployerExist(long id){
        return employerRepository.existsById(id);
    }

    public boolean duplicateName(String name, long id){
        if(employerRepository.findByName(name) != null){
            if(employerRepository.findByName(name).getId() != id){
                return true;
            }
        }
        return false;
    }

}
