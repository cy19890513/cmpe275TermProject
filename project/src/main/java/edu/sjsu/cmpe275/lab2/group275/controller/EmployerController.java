package edu.sjsu.cmpe275.lab2.group275.controller;

import java.util.*;

import edu.sjsu.cmpe275.lab2.group275.model.Address;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import edu.sjsu.cmpe275.lab2.group275.service.EmployerService;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import sun.jvm.hotspot.opto.HaltNode;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@RestController
public class EmployerController {
    private final EmployerService employerService;

    public EmployerController(EmployerService employerService) {
        this.employerService = employerService;
    }

    @Autowired
    EmployeeService employeeService;


    @RequestMapping(value = "/checkHealth", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String checkHealth() {
        return "all is good.";
    }

    @RequestMapping(value = "/employer/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> fetchEmployer(@PathVariable("id") long id,
                                           @RequestParam(required = false) String format) {
        if (!employerService.isEmployerExist(id)) {
            return new ResponseEntity<>("id does not exist", HttpStatus.NOT_FOUND);
        } else {
            Employer e = employerService.getEmployer(id);
            HttpHeaders httpHeaders = new HttpHeaders();

            if (format != null && format.toLowerCase().equals("xml")) {

                httpHeaders.setContentType(MediaType.APPLICATION_XML);

            } else
                httpHeaders.setContentType(MediaType.APPLICATION_JSON);

            return new ResponseEntity<>(e, httpHeaders, HttpStatus.OK);

            //return new ResponseEntity<>(null, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/employer/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteEmployer(@PathVariable("id") long id,
                                            @RequestParam(required = false) String format) {

        if (!employerService.isEmployerExist(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else {
            if (employeeService.existEmployees(id))
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            else {

                //Employer e = employerService.deleteEmployer(id);
                employerService.deleteEmployer(id);

                return new ResponseEntity<>(HttpStatus.OK);
            }
        }

    }


    /**
     * Sample test
     * POST: http://localhost:8080/employer?name=XX&description=YY&street=ZZ&...&format={json | xml }
     * Description: create an employer
     */
    @RequestMapping(value = "/employer", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createEmployer(@RequestParam String name,
                                            @RequestParam(required = false) String description,
                                            @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                            @RequestParam(required = false) String state, @RequestParam(required = false) String zip) {

        if (name == null || employerService.isEmployerExistByName(name)) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        Employer employer = new Employer();
        employer.setName(name);
        if (description != null) employer.setDescription(description);
        Address address = new Address();
        if (street != null) address.setStreet(street);
        if (city != null) address.setCity(city);
        if (state != null) address.setState(state);
        if (zip != null) address.setZip(zip);
        employer.setAddress(address);

        return new ResponseEntity<>(employerService.createEmployer(employer), HttpStatus.OK);
    }

    /**
     * Sample test
     * PUT: http://localhost:8080/employer/{id}?name=XX&description=YY&street=ZZ&...&format={json | xml }
     * Description: update an employer
     */
    @RequestMapping(value = "/employer/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> updateEmployer(@PathVariable("id") long id, @RequestParam String name,
                                            @RequestParam(required = false) String description, @RequestParam(required = false) String street,
                                            @RequestParam(required = false) String city, @RequestParam(required = false) String state,
                                            @RequestParam(required = false) String zip) {

        if (!employerService.isEmployerExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (name == null || employerService.duplicateName(name, id)) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
        Employer employer = employerService.getEmployer(id);
        employer.setName(name);
        if (description != null) employer.setDescription(description);

        Address address = employer.getAddress();
        if (address == null) address = new Address();
        if (state != null) address.setState(state);
        if (zip != null) address.setZip(zip);
        if (street != null) address.setStreet(street);
        if (city != null) address.setCity(city);
        employer.setAddress(address);

        return new ResponseEntity<>(employerService.updateEmployer(employer), HttpStatus.OK);
    }
}

