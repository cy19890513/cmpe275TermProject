package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.User;

public interface UserService {

    User createUser(User hackathon);

    User getUser(long id);
}
