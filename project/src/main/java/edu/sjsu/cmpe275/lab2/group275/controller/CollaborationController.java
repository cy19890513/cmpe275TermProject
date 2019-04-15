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

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement
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
    @RequestMapping(value = "/collaborators/{id1}/{id2}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addCollaborator(@PathVariable("id1") long id1, @PathVariable("id2") long id2){

        if(!employeeService.existId(id1) || !employeeService.existId(id2)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Employee e1 = employeeService.getEmployeeById(id1);
        Employee e2 = employeeService.getEmployeeById(id2);
        List<Employee> lce1 = e1.getCollaborators();
        List<Employee> lce2 = e2.getCollaborators();
        if(lce1 == null){
            lce1 = new ArrayList<Employee>();
        }
        if(!lce1.contains(e2)) lce1.add(e2);
        e1.setCollaborators(lce1);

        if(lce2 == null){
            lce2 = new ArrayList<Employee>();
        }
        if(!lce2.contains(e1)) lce2.add(e2);
        e1.setCollaborators(lce2);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
    /**
     * Sample test
     * DELETE: http://localhost:8080/collaborators/{id1}/{id2}?format={json | xml }
     * Description: delete a collaborator
     */
    @RequestMapping(value = "/collaborators/{id1}/{id2}", method = RequestMethod.DELETE, produces={MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> deleteCollaborator(@PathVariable("id1") long id1, @PathVariable("id2") long id2){

        if(!employeeService.existId(id1) || !employeeService.existId(id2)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(!employeeService.isCollaborators(id1, id2)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        employeeService.deleteCollaborator(id1, id2);
        return new ResponseEntity<>("Deletion successful.", HttpStatus.OK);

    }

}
