package edu.sjsu.cmpe275.lab2.group275.controller;

import java.util.List;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import edu.sjsu.cmpe275.lab2.group275.service.EmployerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


@RestController
public class EmployerController {
    @Autowired
    EmployerService employerService;

    @RequestMapping(value = "/employer/{id}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employer> fetchEmployer(@PathVariable("id") long id) {
        return employerService.getEmployer(id);

    }

    @RequestMapping(value = "http://employer/{id}", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteEmployer(@PathVariable("id") long id){
       return employerService.deleteEmployer(id);
    }
}

