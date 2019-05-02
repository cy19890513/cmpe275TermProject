package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.repository.OrganizationRepository;
import org.springframework.transaction.annotation.Transactional;

public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationServiceImpl(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Override
    @Transactional
    public Organization createOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }
}
