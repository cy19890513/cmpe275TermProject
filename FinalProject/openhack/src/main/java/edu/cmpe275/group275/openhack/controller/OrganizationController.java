package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.Address;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.service.OrganizationService;
import edu.cmpe275.group275.openhack.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrganizationController {

    private final OrganizationService organizationService;
    private final UserService userService;

    public OrganizationController(OrganizationService organizationService, UserService userService) {
        this.organizationService = organizationService;
        this.userService = userService;
    }

    /**
     * Sample test
     * POST: http://localhost:8080/organization?name=AA&email=BB&description=CC
     * Description: create an organization
     */
    @RequestMapping(value = "/organization", method = RequestMethod.POST)
    public ResponseEntity<?> createOrganization(@RequestParam String name, @RequestParam String email,
                                                @RequestParam(required = false) String description,
                                                @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                                @RequestParam(required = false) String state, @RequestParam(required = false) String zip){

        // AOP check required field

        Organization org = new Organization();
        org.setName(name);
        HackerUser owner = userService.getHackerByEmail(email);
        if(owner != null){
            org.setOwner(owner);
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

        return new ResponseEntity<>(organizationService.create(org), HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: http://localhost:8080/organization
     * Description: get organization list
     */
    @RequestMapping(value = "/organization", method = RequestMethod.GET)
    public ResponseEntity<?> getOrganization(){
        return new ResponseEntity<>(organizationService.getList(), HttpStatus.OK);
    }

}
