package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Organization;

import java.util.List;

public interface OrganizationService {
    Organization create(Organization organization);
    List<Organization> getList();
}
