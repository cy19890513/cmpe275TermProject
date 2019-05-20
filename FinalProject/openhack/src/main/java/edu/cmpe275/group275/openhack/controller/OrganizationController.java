package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.aspect.PostLoggedInRequired;
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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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
     * payload: {
     *     uid: 10,
     *     name: XX,
     *     description: ABC,
     *
     * }
     * Description: create an organization
     */
    @PostLoggedInRequired
    @RequestMapping(value = "/organization", method = RequestMethod.POST)
    public ResponseEntity<?> createOrganization(@RequestBody Map<String, Object> payload, HttpSession s){

        // AOP check required field
        // AOP check if owner is a verified hacker
        if(!payload.containsKey("name") || !payload.containsKey("uid")){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String name = String.valueOf(payload.get("name"));
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
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
        if(payload.containsKey("description")){
            org.setDescription(String.valueOf(payload.get("description")));
        }
        Address address = new Address();
        if(payload.containsKey("street")){
            address.setStreet(String.valueOf(payload.get("street")));
        }
        if(payload.containsKey("city")){
            address.setCity(String.valueOf(payload.get("city")));
        }
        if(payload.containsKey("state")){
            address.setState(String.valueOf(payload.get("state")));
        }
        if(payload.containsKey("zip")){
            address.setZip(String.valueOf(payload.get("zip")));
        }
        org.setAddress(address);
        organizationService.create(org);
        return new ResponseEntity<>(organizationService.convertOrgToMap(org), HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: http://localhost:8080/organizations
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


    /**
     * Sample test
     * GET: http://localhost:8080/organizationInfo?oid=4
     * Description: get an organization detail
     */
    @RequestMapping(value = "/organizationInfo", method = RequestMethod.GET)
    public ResponseEntity<?> getOrganizationById(@RequestParam Long oid){
        if(oid == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Organization org = organizationService.getOrg(oid);
        if(org == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(organizationService.convertOrgToMap(org), HttpStatus.OK);
    }


}
