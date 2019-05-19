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


    @Autowired
    private OrganizationService organizationService;

    public UserController(UserService userService, HackerUserService hackerUserService) {
        this.userService = userService;
        this.hackerUserService = hackerUserService;
    }

    @RequestMapping(value = "/__health", method = RequestMethod.GET)
    public String checkHealth() {
        return "all is well.";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Map<String, Object> login, HttpSession session) {
        if (login.containsKey("email") && login.containsKey("password")) {
            String email = (String) login.get("email");
            String password = (String) login.get("password");
            if (userService.existUser(email)) {
                User user = userService.getUserByEmail(email);
                String hashcode = user.getHashcode();

                if (Bcrypt.checkPassword(password, hashcode)) {
                    if (!user.getVerified()) {
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
                    if (matcher.matches()) {
                        role = "AdminUser";
                    } else {
                        role = "hackerUser";
                    }

                    session.setAttribute( "role", role);
                    Map<String, Object> res = userService.convertRoleToMap(uid, role, sessionId, user.getUsername());

                    System.out.println("login sessionId:" + sessionId);
                    return new ResponseEntity<>(res, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("password is not correct", HttpStatus.NO_CONTENT);
                }
            } else {
                return new ResponseEntity<>("email is not correct", HttpStatus.NO_CONTENT);
            }

        } else {
            return new ResponseEntity<>("emaill or password can not be null", HttpStatus.NO_CONTENT);
        }


    }

    /**
     * Sample test
     * POST: http://localhost:8080/registration
     * payload: {
     *      "username": "ABC",
     *      "email": "xxx",
     *      "password": "yyy",
     *      "name": "Alice",
     *      "businessTitle" : "Software Manager",
     *      "aboutMe": "love coding"
     * }
     * Description: register a user
     */
    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<?> registeration(@RequestBody Map<String, Object> registration) {
        System.out.println("enter registration.");
        if (!registration.containsKey("email") || !registration.containsKey("username") || !registration.containsKey("password")) {
            System.out.println("null");
            return new ResponseEntity<>("email or password or username cannot be null", HttpStatus.BAD_REQUEST);
        } else {
            String email = (String) registration.get("email");
            String password = (String) registration.get("password");
            String username = (String) registration.get("username");
            if (userService.existUser(email)) {
                return new ResponseEntity<>("email is already exists", HttpStatus.BAD_REQUEST);
            } else {

                String hashcode = Bcrypt.hashPassword(password);
                // check email
                String regex = "^(.+)@sjsu.edu$";
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(email);
                User user;
                if (matcher.matches()) {
                    user = new AdminUser(email, username, hashcode);
                } else {
                    user = new HackerUser(email, username, hashcode);
                }

                if (registration.containsKey("name")) {
                    String name = (String) registration.get("name");
                    user.setName(name);
                }
                if (registration.containsKey("portrait")) {
                    String portrait = (String) registration.get("portrait");
                    user.setPortrait(portrait);
                }
                if (registration.containsKey("businessTitle")) {
                    String businessTitle = (String) registration.get("businessTitle");
                    user.setBusinessTitle(businessTitle);
                }
                if (registration.containsKey("aboutMe")) {
                    String aboutMe = (String) registration.get("aboutMe");
                    user.setAboutMe(aboutMe);
                }
                Address address = new Address();
                if (registration.containsKey("street")) {
                    String street = (String) registration.get("street");
                    if (street != null) {
                        address.setStreet(street);
                    }
                }
                if (registration.containsKey("city")) {
                    String city = (String) registration.get("city");
                    if (city != null) {
                        address.setCity(city);
                    }
                }
                if (registration.containsKey("state")) {
                    String state = (String) registration.get("state");
                    if (state != null) {
                        address.setState(state);
                    }
                }
                if (registration.containsKey("zip")) {
                    String zip = (String) registration.get("zip");
                    if (zip != null) {
                        address.setZip(zip);
                    }
                }
                user.setAddress(address);
                user.setVerified(false);
                userService.createUser(user);
                userService.verifyUser(user);
                return new ResponseEntity<>("confirm by email", HttpStatus.OK);
            }
        }
    }

    /**
     * Sample test
     * GET: http://localhost:8080/verifyUser?uid=7
     * Description: get user info
     */
    @RequestMapping(value = "/verifyUser", method = RequestMethod.GET)
    public ResponseEntity<?> verifyUser(@RequestParam long uid,
                                        @RequestParam (required = false) String code) {
        //aop uid
        User user = userService.getUser(uid);
        user.setVerified(true);
        userService.updateUser(user);
        return new ResponseEntity<>("User account has been verified.", HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: http://localhost:8080/userProfile?uid=7
     * Description: get user info
     */
    @RequestMapping(value = "/userProfile", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@RequestParam long uid) {
        //aop uid
        if(userService.existId(uid)) {
            User user= userService.getUser(uid);
            System.out.println(user.toString());
            return new ResponseEntity<>(userService.convertuserToMap(user) , HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);

        }
    }

    /**
     * Sample test
     * POST: http://localhost:8080/logout
     * payload: {
     *     uid: 9
     * }
     * Description: logout
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<?> logout(@RequestBody Map<String, Object> payload){
        //aop uid
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: http://localhost:8080/userProfile
     * payload: {
     *      "uid": 10,
     *      "name": "Alice",
     *      "businessTitle" : "Software Manager",
     *      "aboutMe": "love coding"
     * }
     * Description: update a user profile
     */
    @RequestMapping(value = "/userProfile", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(@RequestBody Map<String, Object> payload) {
        //aop uid
        if(!payload.containsKey("uid")){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
        if(!userService.existId(uid)) {
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);
        }
        User user = userService.getUser(uid);
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
        if(address == null){
            address = new Address();
        }
        if(payload.containsKey("city")){
            address.setCity((String) payload.get("city"));
        }
        if(payload.containsKey("street")){
            address.setStreet((String) payload.get("street"));
        }
        if(payload.containsKey("state")){
            address.setState((String) payload.get("state"));
        }
        if(payload.containsKey("zip")){
            address.setZip((String) payload.get("zip"));
        }
        user.setAddress(address);
        userService.updateUser(user);
        return new ResponseEntity<>(userService.convertuserToMap(user), HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: http://localhost:8080/joinOrg
     * payload: {
     *     uid: 9,
     *     oid: 4
     * }
     * Description: request to join an organization
     */
    @RequestMapping(value = "/joinOrg", method = RequestMethod.POST)
    public ResponseEntity<?> joinOrg(@RequestBody Map<String, Object> payload) {
        //aop uid, oid
        if(!payload.containsKey("uid") || !payload.containsKey("oid")){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
        long oid = Long.valueOf(String.valueOf(payload.get("oid")));
        if(!hackerUserService.eixtId(uid) || !organizationService.exist(oid)){
            return new ResponseEntity<>("user or organization not found", HttpStatus.NOT_FOUND);
        }
        HackerUser user = hackerUserService.getHackerUser(uid);
        Organization org = organizationService.getOrg(oid);
        organizationService.joinOrg(org, user);
        return new ResponseEntity<>("Waiting for owner approval", HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: http://localhost:8080/approveJoinRequest?uid=&oid=3
     * Description: approve a join organization request
     */
    @RequestMapping(value = "/approveJoinRequest", method = RequestMethod.GET)
    public ResponseEntity<?> approveJoinRequest(@RequestParam Long uid, @RequestParam Long oid) {
        //aop uid, oid
        if(oid == null || uid == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(!hackerUserService.eixtId(uid) || !organizationService.exist(oid)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Organization org = organizationService.getOrg(oid);
        HackerUser hacker = hackerUserService.getHackerUser(uid);
        organizationService.approve(org, hacker);
        return new ResponseEntity<>("Request approved successfully", HttpStatus.OK);

    }

    /**
     * Sample test
     * POST: http://localhost:8080/leaveOrg
     * payload: {
     *     uid: 9
     * }
     * Description: leave org
     */
    @RequestMapping(value = "/leaveOrg", method = RequestMethod.POST)
    public ResponseEntity<?> leaveOrg(@RequestBody Map<String, Object> payload) {
        //aop uid
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
        if(!hackerUserService.eixtId(uid)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        organizationService.leaveOrg(uid);
        return new ResponseEntity<>( HttpStatus.OK);
    }


    /**
     * Sample test
     * GET: http://localhost:8080/get_all_users
     * Description: return all users
     */
    @RequestMapping(value="/get_all_users", method=RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAll();
        List<Map<String, Object>> list = new ArrayList<>();
        for (User user : users) {
            list.add(userService.convertuserToMap(user));
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: http://localhost:8080/getHacker?email=join@gmail.com
     * Description: get a hacker by email
     */
    @RequestMapping(value = "/getHacker", method = RequestMethod.GET)
    public ResponseEntity<?> getHacker(@RequestParam String email) {
        if (email == null) {
            return new ResponseEntity<>("id does not exist", HttpStatus.BAD_REQUEST);
        }
        HackerUser hacker = hackerUserService.getHackerByEmail(email);
        return new ResponseEntity<>(hackerUserService.convertuserToMap(hacker), HttpStatus.OK);
    }


}
