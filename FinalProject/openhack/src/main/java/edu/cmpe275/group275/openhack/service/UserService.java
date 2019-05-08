package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.AdminUser;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.User;


import java.util.List;
import java.util.Map;


public interface UserService {

    User createUser(User hackathon);

    User getUser(long id);

    User getUserByEmail(String email);
    boolean existUser(String email);
    boolean existId(long id);
    List<User> getAll();
    Map<String, Object> convertuserToMap(User user);
    Map<String, Object> convertRoleToMap(long uid, String role, String sessionId, String username);
    User getUserByUsername(String username);
    void verifyUser(User user);

    void updateUser(User user);
}
