package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.repository.UserRepository;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User getUser(long id) {
        return userRepository.getOne(id);
    }
}
