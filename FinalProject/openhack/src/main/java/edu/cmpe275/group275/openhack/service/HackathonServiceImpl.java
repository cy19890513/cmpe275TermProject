package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.*;

import edu.cmpe275.group275.openhack.repository.HackathonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Service
public class HackathonServiceImpl implements HackathonService{
    private final HackathonRepository hackathonRepository;

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    private TeamService teamService;
    @Autowired
    private MemberService memberService;

    public HackathonServiceImpl(HackathonRepository hackathonRepository) {
        this.hackathonRepository = hackathonRepository;
    }

    @Transactional
    public Hackathon createHackathon(Hackathon hackathon) {
        return hackathonRepository.save(hackathon);
    }

    @Transactional
    public Hackathon getHackathon(long  id) {
        return hackathonRepository.getOne(id);
    }

    public Team createTeam(Member teamLead, String teamName, List<Member> members){
        //TODO
        return null;
    }

    public List<Hackathon> getHackathonList() {
        return hackathonRepository.findAll();
    }

    public List<Hackathon> getHackathonsByName(String name) {
        return hackathonRepository.findHackathonsByNameIgnoreCase(name);
    }

    public boolean existName(Hackathon h, String name){
        List<Team> teamList = h.getTeams();
        if(teamList != null) {
            for (Team t : teamList) {
                if(t.getTeamName().equals(name)){
                    return true;
                }
            }
        }
        return false;
    }

    public boolean exist(long hid){
        return hackathonRepository.existsById(hid);
    }

    @Transactional
    public void update(Hackathon h){
        hackathonRepository.save(h);
    }

    public boolean existTeam(long hid, long tid){
        Hackathon h = getHackathon(hid);
        List<Team> teamList = h.getTeams();
        if(teamList != null){
            for(Team t : teamList){
                if(t.getId() == tid){
                    return true;
                }
            }
        }
        return false;
    }

    @Transactional
    public void joinHackathon(long id, Team team){
        System.out.println("team: " + team.toString());
        Hackathon h = getHackathon(id);
        team.setHackathon(h);
        teamService.update(team);
        List<Team> teamList = h.getTeams();
        if(teamList == null){
            teamList = new ArrayList<>();
        }
        if(!existTeam(id, team.getId())){
            teamList.add(team);
        }
        h.setTeams(teamList);
        List<HackerUser> hackerUserList = h.getHackers();
        if(hackerUserList == null){
            hackerUserList = new ArrayList<>();
        }
//        hackerUserList.add(team.getTeamLead().getHacker());
//        sendConfirmation(team.getTeamLead(), h);
        for(Member m: team.getMembers()){
            hackerUserList.add(m.getHacker());
            sendConfirmation(m, h);
        }
        for(HackerUser hacker: hackerUserList){
            System.out.println("hacker: "+ hacker.getUsername());
        }
        h.setHackers(hackerUserList);
        hackathonRepository.save(h);
        System.out.println("join team get here");
    }

    public boolean matchOrg(long oid, Hackathon h){
        List<Organization> sponsors = h.getSponsors();
        if(sponsors != null){
            for(Organization org: sponsors){
                if(org.getId() == oid){
                    return true;
                }
            }
        }
        return false;
    }

    private void sendConfirmation(Member member, Hackathon h){
        System.out.println("inside email function");
        double fee = h.getFee();

        //check member discount
        if(member.getHacker().getOrganization() != null){
            long oid = member.getHacker().getOrganization().getId();
            if(matchOrg(oid, h)){
                fee *= (1 - h.getDiscount()*0.01);
               // member.setPayfee(fee);
               // memberService.update(member);
                System.out.println("fee: "+fee);
            }
            member.setPayfee(fee);
            memberService.update(member);
        }
        String email = member.getHacker().getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        String to = email;
     //   String to = "verawang0112@gmail.com";
        long id = member.getHacker().getId();
        long teamId = member.getTeam().getId();
        System.out.println("member id: "+id);

        String text = "Dear " + member.getHacker().getUsername() + ", \n\n" +
                "You have successfully joined the hackathon event " + h.getName() +
                ". The registration fee is $" + fee + ". Please process your payment below. \n\n" +
                "<a href='http://localhost:3000/hackathon/payment/"+id+"/"+teamId+"/"+fee+"'>" +
                "payyourfee</a> \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Confirmation: Your Hackathon Event and Payment");
        message.setText(text);
        emailSender.send(message);
        System.out.println("hackathon confirm email sent out");
    }


    public void informClose(Hackathon h, HackerUser judge){
       // String email = judge.getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        //String to = email;
        String to = judge.getEmail();
        long uid = judge.getId();
        System.out.println("judge uid: "+uid);
        String text = "Dear " + judge.getUsername() + ", \n\n" +
                "The hackton event: "+ h.getName() +"  has been closed  " +
                "Please start Evaluation \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Management: Start Evaluation");
        message.setText(text);
        emailSender.send(message);
        System.out.println("evaluation notice email sent out");

    }

    public void sentResult(Team t, Hackathon h){
        long  hid = h.getId();

        List<Member> members = t.getMembers();
        for(Member m: members) {

            HackerUser hackerUser = m.getHacker();
            SimpleMailMessage message = new SimpleMailMessage();
            String to = hackerUser.getEmail();
            String text = "Dear " + hackerUser.getUsername() + ", \n\n" +
                    "The hackton: " + h.getName() + " has been posted below \n\n  " +
                    "<a href='http://localhost:3000/hackathon/"+hid+"/result'>" +
                    "Result</a> \n\n"+
                    "Hackathon Management System";
            message.setTo(to);
            message.setSubject("Hackathon Management: Result Page");
            message.setText(text);
            emailSender.send(message);
            System.out.println("sent result page");
        }

    }



    public Map<String, Object> convert(Hackathon h, HackerUser hacker){
        Map<String, Object> map = new LinkedHashMap<>();
        if (h == null) {
            return map;
        }
        map.put("id", h.getId());
        map.put("name", h.getName());
        map.put("startDate", h.getStartDate());
        map.put("endDate", h.getEndDate());
        map.put("description", h.getDescription());
        map.put("fee", h.getFee());
        map.put("minSize", h.getMinSize());
        map.put("maxSize", h.getMaxSize());
        map.put("isJudge", false);

        if(h.getSponsors() != null){
            List<String> sp = new ArrayList<>();
            for(Organization org: h.getSponsors()){
                sp.add(org.getName());
            }
            map.put("sponsors", sp);
        }
        if(h.getJudges() != null){
            List<String> judge = new ArrayList<>();
            for(HackerUser j: h.getJudges()){
                judge.add(j.getEmail());
                if(j.getId() == hacker.getId()){
                    map.put("isJudge", true);
                }
            }
            map.put("judges", judge);
        }
        map.put("isClosed", h.getClosed());
        map.put("isFinalized", h.getFinalized());
        if(h.getTeams() != null){
            List<Map<String, Object>> res = new ArrayList<>();
            for(Team t: h.getTeams()){
                Map<String, Object> pair = new LinkedHashMap<>();
                pair.put("id", t.getId());
                pair.put("teamName", t.getTeamName());
                res.add(pair);
            }
            map.put("teams", res);
        }
        return map;
    }

    public Map<String, Object> getPaymentStatus(long hid){
        Hackathon h = getHackathon(hid);
        Map<String, Object> res = new LinkedHashMap<>();
        List<Team> teams = h.getTeams();
        List<Map<String, Object>> list = new ArrayList<>();
        if(teams != null) {
            for (Team t : teams) {
                list.add(teamService.paymentStatus(t));
            }
        }
        res.put("allTeams", list);
        return res;
    }


}
