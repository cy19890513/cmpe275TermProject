package edu.cmpe275.group275.openhack.controller;



import edu.cmpe275.group275.openhack.model.Address;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.model.Bcrypt;

import edu.cmpe275.group275.openhack.repository.UserRepository;
import edu.cmpe275.group275.openhack.service.HackathonService;
import edu.cmpe275.group275.openhack.service.MemberService;
import edu.cmpe275.group275.openhack.service.TeamService;
import edu.cmpe275.group275.openhack.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.ArrayList;

@RestController
public class UserController {

    private final UserService userService;


    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;

    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        String hashcode = Bcrypt.hashPassword(password);
        if (userService.existUser(email, hashcode)) {
            User user = userService.getUserByEmail(email);
            return new ResponseEntity<>("successful login", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("log in failed", HttpStatus.BAD_REQUEST);
        }


    }

    @RequestMapping(value = "/Registeration", method = RequestMethod.POST)
    public ResponseEntity<?> registeration(@RequestParam String email, @RequestParam String password, @RequestParam String confirmPassword, @RequestParam String username,
                                           @RequestParam(required = false) String name, @RequestParam(required = false) String portrait,
                                           @RequestParam(required = false) String businessTitle, @RequestParam(required = false) String aboutMe,
                                           @RequestParam(required = false) String street, @RequestParam(required = false) String city,
                                           @RequestParam(required = false) String state, @RequestParam(required = false) String zip,
                                           @RequestParam(required = false) List<Organization> organizations) {
        if (!password.equals(confirmPassword)) {
            return new ResponseEntity<>("password does not match confirmpassword", HttpStatus.BAD_REQUEST);
        } else if (!userService.existUser(email, password)) {
            String hashcode = Bcrypt.hashPassword(password);
            User user = new User(email, username, hashcode);
            if (aboutMe != null) {
                user.setAboutMe(aboutMe);
            }
            if (businessTitle != null) {
                user.setBusinessTitle(businessTitle);
            }
            if (portrait != null) {
                user.setPortrait(portrait);
            }
            if (name != null) {
                user.setName(name);
            }
            Address address = new Address();
            if (street != null) {
                address.setStreet(street);
            }
            if (city != null) {
                address.setCity(city);
            }
            if (state != null) {
                address.setState(state);
            }
            if (zip != null) {
                address.setZip(zip);
            }
            if (organizations != null) {
                user.setOrganization(organizations);
            }

            userService.createUser(user);
            return new ResponseEntity<>("confirm by email", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("The email has already exited", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/userProfile", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(long id) {
        if(userService.eixtId(id)) {
            User user= userService.getUser(id);
            return new ResponseEntity<>(userService.convertuserToMap(user) , HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);

        }

    }

    @RequestMapping(value = "/getOrg", method = RequestMethod.GET)
    public ResponseEntity<?> getOrg(long id) {
        User user = userService.getUser(id);
        List<Organization> organizations = user.getOrganization();
        return new ResponseEntity<>(organizations, HttpStatus.OK);

    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {
        List<User> users = userService.getAll();
        User user = users.get(0);
        return new ResponseEntity<>(userService.convertuserToMap(user), HttpStatus.OK);


    }




}
