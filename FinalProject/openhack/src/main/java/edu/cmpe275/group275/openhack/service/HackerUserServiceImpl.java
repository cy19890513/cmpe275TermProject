package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.repository.HackerUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class HackerUserServiceImpl implements HackerUserService {

    @Autowired
    private OrganizationService organizationService;

    public Map<String, Object> convertuserToMap(HackerUser user) {
        Map<String, Object> map = new LinkedHashMap<>();
        if(user != null) {
            map.put("id", user.getId());
            map.put("ScreenName", user.getUsername());
            map.put("email", user.getEmail());
            map.put("name", user.getName());
            map.put("BusinessTitle", user.getBusinessTitle());
            map.put("Address", user.getAddress());
            map.put("Description", user.getAboutMe());
            map.put("portrait", user.getPortrait());
            map.put("orgization", organizationService.convertOrgToMap(user.getOrganization()));
        }
        return map;
    }


    private final HackerUserRepository hackerUserRepository;

    public HackerUserServiceImpl(HackerUserRepository hackerUserRepositoryRepository) {
        this.hackerUserRepository = hackerUserRepositoryRepository;
    }

    @Transactional
    public HackerUser createUser(HackerUser user) {
        hackerUserRepository.save(user);
        return user;
    }

    @Transactional
    public HackerUser getHackerUser(long id) {
        return hackerUserRepository.getOne(id);
    }

    @Transactional
    public HackerUser getHackerByEmail(String email) {
        return hackerUserRepository.findOneByEmail(email);
    }

    @Transactional
    public boolean existHacker(String email) {
        return hackerUserRepository.existsHackerUserByEmail(email);
    }

    @Transactional
    public boolean eixtId(long id) {
        return hackerUserRepository.existsById(id);
    }

    @Transactional
    public List<HackerUser> getAll() {
        return hackerUserRepository.findAll();
    }

    @Transactional
    public HackerUser getUserByUsername(String username) {
        return hackerUserRepository.findOneByUsername(username);
    }

    @Transactional
    public void update(HackerUser hacker){
        hackerUserRepository.save(hacker);
    }

}





