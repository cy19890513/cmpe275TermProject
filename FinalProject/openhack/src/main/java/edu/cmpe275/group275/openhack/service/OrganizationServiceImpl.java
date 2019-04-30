package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationServiceImpl(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization create(Organization organization){
        return organizationRepository.save(organization);
    }

    public List<Organization> getList(){
        return organizationRepository.findAll();
    }
}
