package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.Address;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.service.HackerUserService;
import edu.cmpe275.group275.openhack.service.OrganizationService;
import edu.cmpe275.group275.openhack.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class OrganizationController {

    private final OrganizationService organizationService;
    private final HackerUserService userService;

    public OrganizationController(OrganizationService organizationService, HackerUserService userService) {
        this.organizationService = organizationService;
        this.userService = userService;
    }

    /**
     * Sample test
     * POST: http://localhost:8080/organization?uid=XX&name=AA&description=CC
     * Description: create an organization
     */
    @RequestMapping(value = "/organization", method = RequestMethod.POST)
    public ResponseEntity<?> createOrganization(@RequestParam String name, @RequestParam long uid,
                                                @RequestParam(required = false) String description,
                                                @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                                @RequestParam(required = false) String state, @RequestParam(required = false) String zip){

        // AOP check required field
        // AOP check if owner is a verified hacker

        Organization org = new Organization();
        if(organizationService.exists(name)){
            return new ResponseEntity<>("Organization name exists", HttpStatus.BAD_REQUEST);
        }else{
            org.setName(name);
        }
        HackerUser hacker = userService.getHackerUser(uid);
       // HackerUser owner = userService.getHackerByEmail(email);

        if(hacker != null){
            org.setOwner(hacker);
        }else{
            return new ResponseEntity<>("Owner is not a hacker", HttpStatus.BAD_REQUEST);
        }
        if(description != null){
            org.setDescription(description);
        }
        Address address = new Address();
        if(street != null){
            address.setStreet(street);
        }
        if(city != null){
            address.setCity(city);
        }
        if(state != null){
            address.setState(state);
        }
        if(zip != null){
            address.setZip(zip);
        }
        org.setAddress(address);
        organizationService.create(org);
        return new ResponseEntity<>(organizationService.convertOrgToMap(org), HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: http://localhost:8080/organizations
     * Description: get organization list
     */
    @RequestMapping(value = "/organizations", method = RequestMethod.GET)
    public ResponseEntity<?> getOrganization(){
        List<Organization> list = organizationService.getList();
        List<Map<String, Object>> res = new ArrayList<>();
        for(Organization org: list){
            res.add(organizationService.convertOrgToMap(org));
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: http://localhost:8080/organization?name=FakeOrg
     * Description: get an organization detail
     */
    @RequestMapping(value = "/organization", method = RequestMethod.GET)
    public ResponseEntity<?> getOrganization(@RequestParam String name){
        if(name == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(!organizationService.exists(name)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Organization org = organizationService.getByName(name);
        return new ResponseEntity<>(organizationService.convertOrgToMap(org), HttpStatus.OK);
    }



}
