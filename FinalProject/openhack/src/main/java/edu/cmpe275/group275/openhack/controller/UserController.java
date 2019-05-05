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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserController {

    private final UserService userService;




    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;

    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Map<String, String> login, HttpSession session) {
        String email = login.get("email");
        String password = login.get("password");
        String hashcode = Bcrypt.hashPassword(password);
        if (userService.existUser(email, hashcode)) {
            User user = userService.getUserByEmail(email);

            if(user.getVerified() == false){
                return new ResponseEntity<>("please confirm by email", HttpStatus.BAD_REQUEST);
            }
            String sessionId = UUID.randomUUID().toString();
            session.setAttribute("sessionId", sessionId);
            session.setAttribute("uid", user.getId());

            System.out.println("login sessionId:" + sessionId);
            return new ResponseEntity<>(sessionId, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("log in failed", HttpStatus.NO_CONTENT);
        }


    }

    @RequestMapping(value = "/Registeration", method = RequestMethod.POST)
    public ResponseEntity<?> registeration(@RequestBody  Map<String, Object> registeration) {
         String email = (String)registeration.get("email");
         String password = (String)registeration.get("password");
         String username =(String)registeration.get("username");
         String name = (String)registeration.get("name");
         String portrait=(String)registeration.get("portrait");
         String businessTitle=(String)registeration.get("businessTitle");
         String aboutMe=(String)registeration.get("aboutMe");
         String street=(String)registeration.get("street");
         String city = (String)registeration.get("city");
         String state =(String)registeration.get("state");
         String zip =(String)registeration.get("zip");

         if (!userService.existUser(email, password)) {
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
        Organization organization = user.getOrganization();
        return new ResponseEntity<>(organization, HttpStatus.OK);

    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {
        List<User> users = userService.getAll();
        User user = users.get(0);
        return new ResponseEntity<>(userService.convertuserToMap(user), HttpStatus.OK);


    }




}
