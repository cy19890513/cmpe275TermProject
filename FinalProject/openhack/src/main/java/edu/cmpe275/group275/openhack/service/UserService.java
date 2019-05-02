package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.User;


import java.util.List;
import java.util.Map;


public interface UserService {

    User createUser(User hackathon);

    User getUser(long id);

    User getUserByEmail(String email);
    boolean existUser(String email, String hashcode);
    boolean eixtId(long id);
    List<User> getAll();
    Map<String, Object> convertuserToMap(User user);

}
