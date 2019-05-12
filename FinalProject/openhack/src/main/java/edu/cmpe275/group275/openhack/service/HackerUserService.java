package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.HackerUser;


import java.util.List;
import java.util.Map;

public interface HackerUserService {

    HackerUser createUser(HackerUser hacker);

    HackerUser getHackerUser(long id);

    HackerUser getHackerByEmail(String email);
    boolean existHacker(String email);
    boolean eixtId(long id);
    HackerUser getUserByUsername(String username);

    Map<String, Object> convertuserToMap(HackerUser hacker);
   // Map<String, Object> convertRoleToMap(long uid, String role, String sessionId);
    void update(HackerUser hacker);

    boolean joinedHackathon(HackerUser hacker, long hid);


}
