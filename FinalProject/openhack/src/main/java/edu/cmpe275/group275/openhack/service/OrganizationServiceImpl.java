package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Organization;
import edu.cmpe275.group275.openhack.model.User;
import edu.cmpe275.group275.openhack.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.InternetAddress;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserService userService;
    @Autowired
    private HackerUserService hackerUserService;

    @Autowired
    public JavaMailSender emailSender;

    public OrganizationServiceImpl(OrganizationRepository organizationRepository, UserService userService) {
        this.organizationRepository = organizationRepository;
        this.userService = userService;
    }

    public Map<String, Object> convertOrgToMap(Organization org) {
        Map<String, Object> map = new LinkedHashMap<>();
        if(org == null){
            return map;
        }
        map.put("id", org.getId());
        map.put("name", org.getName());
        map.put("owner", org.getOwner().getUsername());
        map.put("Address", org.getAddress());
        map.put("Description", org.getDescription());
        return map;
    }

    @Transactional
    public Organization create(Organization organization){
        HackerUser owner = organization.getOwner();
        if(owner.getOrganization() == null){
            owner.setOrganization(organization);
            userService.updateUser(owner);
        }
        return organizationRepository.save(organization);
    }

    @Transactional
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

    public Organization getOrg(long id){
        return organizationRepository.findById(id);
    }

    public void joinOrg(Organization org, HackerUser hacker){
        HackerUser owner = org.getOwner();
        if(owner == hacker){
            hacker.setOrganization(org);
            hackerUserService.update(hacker);
        }
        hacker.setOrganization(null);
        sendRequest(hacker, owner, org.getId());
    }

    @Transactional
    public void approve(Organization org, HackerUser hackerUser){
        hackerUser.setOrganization(org);
        hackerUserService.update(hackerUser);
        System.out.println("approved successfully");
    }

    private void sendRequest(HackerUser hacker, HackerUser owner, long orgId){
        String email = owner.getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        String to = email;
      //  String to = "verawang0112@gmail.com";
        long uid = hacker.getId();
        String text = "Dear " + owner.getUsername() + ", \n\n" +
                "User " + hacker.getUsername() + " has requested to join your organization. " +
                "Please click link below for approval. \n\n" +
                "<a href='http://localhost:8080/approveJoinRequest?uid="+uid+"&oid="+orgId+ "'>" +
                "approvetheuserrequest</a> \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Management: Request Approval for Your Organization");
        message.setText(text);
        emailSender.send(message);
        System.out.println("join Org email sent out");
    }

    public void leaveOrg(long id){
        HackerUser hackerUser = hackerUserService.getHackerUser(id);
        hackerUser.setOrganization(null);
        hackerUserService.update(hackerUser);
    }

}
