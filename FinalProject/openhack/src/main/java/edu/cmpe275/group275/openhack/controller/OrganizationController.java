package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.Address;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.service.OrganizationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping(value="/api/create_organization")
    public ResponseEntity<?> createOrganization(@RequestParam String name,
                                                @RequestParam Long userId,
                                                @RequestParam(required = false) String description,
                                                @RequestParam(required = false) String street,
                                                @RequestParam(required = false) String city,
                                                @RequestParam(required = false) String state,
                                                @RequestParam(required = false) String zip) {
        if (name == null || userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = null; // UserService.getUser(userId);

        Organization organization = new Organization(name, user);
        organization.setDescription(description);
        Address address = new Address(street, city, state, zip);
        organization.setAddress(address);
        organizationService.createOrganization(organization);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value="/api/get_organization_list")
    public ResponseEntity<?> getOrganizationByUserId(@RequestParam Long userId) {
        User user = null; // UserService.getUser(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Organization> organizations = user.getOrganizations();
        return ResponseEntity.status(HttpStatus.OK).body(organizations);
    }
}
