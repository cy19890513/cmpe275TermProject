package edu.sjsu.cmpe275.lab2.group275.controller;

import edu.sjsu.cmpe275.lab2.group275.model.Employee;
import edu.sjsu.cmpe275.lab2.group275.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CollaborationController {

    @Autowired
    EmployeeService employeeService;
    /**
     * Sample test
     * PUT: http://localhost:8080/collaborators/{id1}/{id2}?format={json | xml }
     * Description: add a collaborator
     */
    //TODO

    /**
     * Sample test
     * DELETE: http://localhost:8080/collaborators/{id1}/{id2}?format={json | xml }
     * Description: delete a collaborator
     */
    @RequestMapping(value = "/collaborators/{id1}/{id2}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteCollaborator(@PathVariable("id1") long id1, @PathVariable("id2") long id2){

        if(!employeeService.existId(id1) || !employeeService.existId(id2)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return null;
    }

}
