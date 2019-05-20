package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.*;
import edu.cmpe275.group275.openhack.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;



@Service
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;

    @Autowired
    private MemberService memberService;
    @Autowired
    public JavaMailSender emailSender;


    public List<Map<String, Object>> converTeamsToMap(List<Team> teams){
        List<Map<String, Object>> res = new ArrayList<>();
        for(Team team: teams){
            Map<String, Object> map = memberService.convertToMap(team);
            res.add(map);
        }
        return res;
    }

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Transactional
    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    @Transactional
    public Team getTeam(long id) {
        return teamRepository.getOne(id);
    }

    public Team getTeamByName(String name){
        return teamRepository.findByTeamName(name);
    }

    public boolean exist(long tid){
        return teamRepository.existsById(tid);
    }

    @Transactional
    public void processPayment(long uid, long teamId){
        Team t = getTeam(teamId);
        Hackathon hackathon = t.getHackathon();

        if(t == null){
            return;
        }
//        if(t.getTeamLead().getHacker().getId() == uid){
//            Member m = t.getTeamLead();
//            m.setIfPaid(true);
//            memberService.update(m);
//            t.setTeamLead(m);
//            sendPaymentInvoice(m);
//            System.out.println("team lead paid.");
//        }else{
            List<Member> memberList = t.getMembers();
            if(memberList != null) {
                for (Member m : memberList) {
                    if (m.getHacker().getId() == uid) {

                        m.setIfPaid(true);
                        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
                        m.setPaytime(date);
                        memberService.update(m);
                        sendPaymentInvoice(m);
                        System.out.println("member " + uid + " paid.");
                    }
                }
            }
            t.setMembers(memberList);
    //    }
        teamRepository.save(t);

        int count = 0;
        for(Member member: t.getMembers()){
            if(member.getIfPaid()){
                count++;
            }
        }
        if(count == t.getMembers().size()){
            System.out.println("all paid set to true");
            t.setIfAllPaid(true);
            teamRepository.save(t);
            sendEmailToLead(t.getTeamLead());
        }
    }

    @Transactional
    public void updateMembers(Team t){
        Member lead = t.getTeamLead();
        lead.setTeam(t);
        memberService.update(lead);
        for(Member m: t.getMembers()){
            m.setTeam(t);
            memberService.update(m);
        }
    }

    @Transactional
    public void join(Hackathon h, Team t){
        t.setHackathon(h);
        teamRepository.save(t);
    }

    @Transactional
    public void update(Team t) {
        teamRepository.save(t);
    }

    private void sendEmailToLead(Member lead){
        SimpleMailMessage message = new SimpleMailMessage();
        String email = lead.getHacker().getEmail();
        String to = email;
     //   String to = "verawang0112@gmail.com";
        long id = lead.getHacker().getId();
        System.out.println("member id: "+id);
        String text = "Dear " + lead.getHacker().getUsername() + ", \n\n" +
                "All your team members have paid the registration fee successfully. " +
                "Please enjoy the event! \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Management: All Members Have Been Paid");
        message.setText(text);
        emailSender.send(message);
        System.out.println("all paid email sent out");
    }

    @Transactional
    public List<Team> getTeams(Hackathon h){
        return teamRepository.findTeamsByHackathon(h);
    }

    private void sendPaymentInvoice(Member m){
        SimpleMailMessage message = new SimpleMailMessage();
        String email = m.getHacker().getEmail();
        String to = email;
        //   String to = "verawang0112@gmail.com";
        long id = m.getHacker().getId();

        System.out.println("member id: "+id);
        String text = "Dear " + m.getHacker().getUsername() + ", \n\n" +
                "Your payment has been made successfully. " +
                "Please enjoy the event! \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Management: Payment Invoice");
        message.setText(text);
        emailSender.send(message);
        System.out.println("payment invoice sent out");
    }

}
