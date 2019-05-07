package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;

import java.util.List;
import java.util.Map;

public interface OrganizationService {
    Organization create(Organization organization);
    List<Organization> getList();
    Organization getByName(String name);
    Organization getOrg(long id);
    Map<String, Object> convertOrgToMap(Organization org);

    boolean exists(String name);
    void joinOrg(Organization org, HackerUser hacker);
    void approve(Organization org, HackerUser hackerUser);


}
