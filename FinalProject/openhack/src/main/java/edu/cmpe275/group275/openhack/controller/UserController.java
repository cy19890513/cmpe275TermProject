package edu.cmpe275.group275.openhack.controller;



import edu.cmpe275.group275.openhack.model.*;

import edu.cmpe275.group275.openhack.repository.UserRepository;
import edu.cmpe275.group275.openhack.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class UserController {
    private final UserService userService;
    private final HackerUserService hackerUserService;

    public UserController(UserService userService,HackerUserService hackerUserService ) {
        this.userService = userService;
        this.hackerUserService = hackerUserService;
    }

    @RequestMapping(value = "/__health", method = RequestMethod.GET)
    public String checkHealth() {
        return "all is well.";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Map<String, Object> login, HttpSession session) {
        if(login.containsKey("email") && login.containsKey("password") ) {
            String email = (String)login.get("email");
            String password = (String)login.get("password");
            if(userService.existUser(email)){
                User user = userService.getUserByEmail(email);
                String hashcode = user.getHashcode();

                if(Bcrypt.checkPassword(password, hashcode)){
                    if (user.getVerified() == true) {
                        return new ResponseEntity<>("please confirm by email", HttpStatus.BAD_REQUEST);
                    }
                    String sessionId = UUID.randomUUID().toString();
                    String role = "";
                    long uid = user.getId();
                /*    VerificationToken token = new VerificationToken();
                    token.setT(UUID.randomUUID().toString());
                    user.setToken(token);*/
                    session.setAttribute("sessionId", sessionId);
                    session.setAttribute("uid", uid);
                    String regex = "^(.+)@sjsu.edu$";
                    Pattern pattern = Pattern.compile(regex);
                    Matcher matcher = pattern.matcher(email);
                    if(matcher.matches()){
                        role = "AdminUser";
                    }
                    else{
                        role = "hackerUser";
                    }

                    session.setAttribute( "role", role);
                    Map<String, Object> res = userService.convertRoleToMap(uid, role, sessionId, user.getUsername());

                    System.out.println("login sessionId:" + sessionId);
                    return new ResponseEntity<>(res, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<>("password is not correct", HttpStatus.NO_CONTENT);
                }
            }
            else{
                return new ResponseEntity<>("email is not correct", HttpStatus.NO_CONTENT);
            }

        }else {
            return new ResponseEntity<>("emaill or password can not be null", HttpStatus.NO_CONTENT);
        }


    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<?> registeration(@RequestBody  Map<String, Object> registration) {
        System.out.println("enter registration.");
        if(!registration.containsKey("email") || !registration.containsKey("username") || !registration.containsKey("password")){
            System.out.println("null");
            return new ResponseEntity<>("email or password or username cannot be null", HttpStatus.BAD_REQUEST);
        }

        else {
            String email = (String) registration.get("email");
            String password = (String) registration.get("password");
            String username = (String) registration.get("username");
            if(userService.existUser(email)){
                return  new ResponseEntity<>("email is already exists", HttpStatus.BAD_REQUEST);
            }
            else{

                String hashcode = Bcrypt.hashPassword(password);
                // check email
                String regex = "^(.+)@sjsu.edu$";
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(email);
                User user;
                if(matcher.matches()){
                    user = new AdminUser(email, username, hashcode);
                }
                else{
                    user = new HackerUser(email, username, hashcode);
                }

                if(registration.containsKey("name")) {
                    String name = (String) registration.get("name");
                    user.setName(name);
                }
                if(registration.containsKey("portrait")) {
                    String portrait=(String)registration.get("portrait");
                    user.setPortrait(portrait);
                }
                if(registration.containsKey("businessTitle")) {
                    String businessTitle=(String)registration.get("businessTitle");
                    user.setBusinessTitle(businessTitle);
                }
                if(registration.containsKey("aboutMe")) {
                    String aboutMe=(String)registration.get("aboutMe");
                    user.setName(aboutMe);
                }
                Address address = new Address();
                if(registration.containsKey("street")) {
                    String street=(String)registration.get("street");
                    if (street != null) {
                        address.setStreet(street);
                    }
                }
                if(registration.containsKey("city")) {
                    String city=(String)registration.get("city");
                    if (city != null) {
                        address.setCity(city);
                    }
                }
                if(registration.containsKey("state")) {
                    String state=(String)registration.get("state");
                    if (state != null) {
                        address.setState(state);
                    }
                }
                if(registration.containsKey("zip")) {
                    String zip=(String)registration.get("zip");
                    if (zip != null) {
                        address.setZip(zip);
                    }
                }
                user.setVerified(false);
                userService.createUser(user);
                return new ResponseEntity<>("confirm by email", HttpStatus.OK);
            }
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

    /**
     * Sample test
     * POST: http://localhost:8080/organization?uid=XX&name=AA&description=CC
     * Description: create an organization
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<?> logout(@RequestParam long id){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: http://localhost:8080/userProfile?id=XX
     * payload: {
     *
     * }
     * Description: update a user profile
     */
    @RequestMapping(value = "/userProfile", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(@RequestParam long id,
                                        @RequestBody Map<String, Object> payload) {
        if(!userService.eixtId(id)) {
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);
        }
        User user = userService.getUser(id);
        if(payload.containsKey("aboutMe")){
            user.setAboutMe((String) payload.get("aboutMe"));
        }
        if(payload.containsKey("name")){
            user.setName((String) payload.get("name"));
        }
        if(payload.containsKey("portrait")){
            user.setPortrait((String) payload.get("portrait"));
        }
        if(payload.containsKey("businessTitle")){
            user.setBusinessTitle((String) payload.get("businessTitle"));
        }
        Address address = user.getAddress();
        if(payload.containsKey("city")){
            address.setCity((String) payload.get("city"));
        }
        if(payload.containsKey("street")){
            address.setCity((String) payload.get("street"));
        }
        if(payload.containsKey("state")){
            address.setCity((String) payload.get("state"));
        }
        if(payload.containsKey("zip")){
            address.setCity((String) payload.get("zip"));
        }
        user.setAddress(address);
        userService.updateUser(user);
        return new ResponseEntity<>(userService.convertuserToMap(user), HttpStatus.OK);
    }


    @RequestMapping(value = "/getOrg", method = RequestMethod.GET)
    public ResponseEntity<?> getOrg(long id) {
        HackerUser user = hackerUserService.getHackerUser(id);
        Organization organization = user.getOrganization();
        return new ResponseEntity<>(organization, HttpStatus.OK);

    }

    @RequestMapping(value = "/joinOrg", method = RequestMethod.POST)
    public ResponseEntity<?> joinOrg(long id, long orgId) {
        HackerUser user = hackerUserService.getHackerUser(id);

        return new ResponseEntity<>("", HttpStatus.OK);

    }

    @RequestMapping(value = "/leaveOrg", method = RequestMethod.POST)
    public ResponseEntity<?> leaveOrg(long id, long orgId) {

        return new ResponseEntity<>("", HttpStatus.OK);

    }



    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {
        List<User> users = userService.getAll();
        User user = users.get(0);
        return new ResponseEntity<>(userService.convertuserToMap(user), HttpStatus.OK);


    }

    @RequestMapping(value = "/getHacker", method = RequestMethod.GET)
    public ResponseEntity<?> getHacker(@RequestParam String email) {
        if(email == null){
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);
        }
        HackerUser hacker = hackerUserService.getHackerByEmail(email);
        return new ResponseEntity<>(hackerUserService.convertuserToMap(hacker), HttpStatus.OK);
    }


}
