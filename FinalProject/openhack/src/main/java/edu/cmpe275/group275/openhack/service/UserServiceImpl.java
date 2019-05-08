package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Address;
import edu.cmpe275.group275.openhack.model.AdminUser;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.repository.UserRepository;
import org.springframework.stereotype.Service;



import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    public Map<String, Object> convertuserToMap(User user) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", user.getId());
        map.put("username", user.getUsername());
        map.put("email", user.getEmail());
        map.put("name", user.getName());
        map.put("businessTitle", user.getBusinessTitle());
        map.put("address", user.getAddress());
      //  map.put("Address", convertAddress(user.getAddress()));
        map.put("aboutMe", user.getAboutMe());
        map.put("portrait", user.getPortrait());
        return map;
    }

    public Map<String, Object> convertRoleToMap(long uid, String role, String sessionId, String username) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("uid", uid);
        map.put("role", role);
        map.put("sessionId", sessionId);
        map.put("username", username);
        return map;
    }

    public String convertAddress(Address address) {
        if(address != null){
            String street = address.getStreet();
            String city = address.getCity();
            String state = address.getState();
            String zip = address.getZip();
            String res = street + "," + city + "," + state + "," + zip;
            return res;
        }
        return null;
    }


    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    @Transactional
    public User getUser(long id) {
        return userRepository.getById(id);
       // return userRepository.getOne(id);
    }

    @Transactional
    public User getUserByEmail(String email) {
        return userRepository.findOneByEmail(email);
    }

    @Transactional
    public boolean existUser(String email) {
        return userRepository.existsUserByEmail(email);
    }

    @Transactional
    public boolean existId(long id) {
        return userRepository.existsById(id);
    }

    @Transactional
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User getUserByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }


    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void verifyUser(User user){
        String email = user.getEmail();

        //TODO
    }

}