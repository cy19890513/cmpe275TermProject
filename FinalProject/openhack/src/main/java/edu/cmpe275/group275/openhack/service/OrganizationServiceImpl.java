package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserService userService;

    public OrganizationServiceImpl(OrganizationRepository organizationRepository, UserService userService) {
        this.organizationRepository = organizationRepository;
        this.userService = userService;
    }

    public Map<String, Object> convertOrgToMap(Organization org) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", org.getId());
        map.put("name", org.getName());
        map.put("owner", org.getOwner().getUsername());
        map.put("Address", org.getAddress());
        map.put("Description", org.getDescription());
        return map;
    }

    public Organization create(Organization organization){
        HackerUser owner = organization.getOwner();
        if(owner.getOrganization() == null){
            owner.setOrganization(organization);
            userService.updateUser(owner);
        }
        return organizationRepository.save(organization);
    }

    public List<Organization> getList(){
        return organizationRepository.findAll();
    }

    public Organization getByName(String name){
        System.out.println(organizationRepository.findByName(name).toString());
        return organizationRepository.findByName(name);
    }

    public boolean exists(String name){
        return organizationRepository.existsByName(name);
    }
}
