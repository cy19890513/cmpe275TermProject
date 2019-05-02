package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.repository.UserRepository;
import org.springframework.stereotype.Service;



import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
    public Map<String, Object> convertuserToMap(User user) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", user.getId());
        map.put("ScreenName", user.getUsername());
        map.put("email", user.getEmail());
        map.put("name", user.getName());
        map.put("BusinessTitle", user.getBusinessTitle());
        map.put("Address", user.getAddress());
        map.put("Description", user.getAboutMe());
        map.put("portrait",user.getPortrait());
        return map;
    }


    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional

    public  User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    @Transactional
    public User  getUser(long id) {
        return userRepository.getOne(id);
    }

    @Transactional
    public User getUserByEmail(String email) {return userRepository.findUserByEmail(email);}

    @Transactional
    public boolean existUser(String email, String hashcode) {return userRepository.existsUserByEmailAndHashcode(email, hashcode);}

    @Transactional
    public boolean eixtId(long id){return userRepository.existsById(id);}

    @Transactional
    public List<User> getAll(){return userRepository.findAll();}




}
