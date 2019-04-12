package edu.sjsu.cmpe275.lab2.group275.service;

import java.util.*;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployerRepository;
import edu.sjsu.cmpe275.lab2.group275.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class EmployerServiceImpl implements EmployerService {
    @Autowired
    EmployerRepository employerRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    public Employer createEmployer(Employer employer){
        // TODO
       return null;
    }
    @Transactional
    public ResponseEntity<Employer> getEmployer(long id) {
        System.out.println("get employer");
        if(employerRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.OK).body(employerRepository.getOne(id));
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public Employer updateEmployer(Employer employer){
        // TODO
       return null;
    }

    @Transactional
    public ResponseEntity<?> deleteEmployer(long id){
        System.out.println("delete Employer");
        if(!employerRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        else{
            if(employeeRepository.countEmployeeByEmployer(id) == 0){
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        // TODO

    }





}
