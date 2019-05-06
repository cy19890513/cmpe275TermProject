package edu.cmpe275.group275.openhack.service;

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

    public OrganizationServiceImpl(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Map<String, Object> convertOrgToMap(Organization org) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", org.getId());
        map.put("name", org.getName());
        map.put("owner", org.getOwner());
        map.put("Address", org.getAddress());
        map.put("Description", org.getDescription());
        return map;
    }

    public Organization create(Organization organization){
        return organizationRepository.save(organization);
    }

    public List<Organization> getList(){
        return organizationRepository.findAll();
    }

    public Organization get(String name){
        return organizationRepository.findByName(name);
    }
}
