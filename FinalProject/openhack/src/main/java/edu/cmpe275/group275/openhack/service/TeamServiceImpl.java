package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;

    @Autowired
    private MemberService memberService;
    @Autowired
    public JavaMailSender emailSender;

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

    @Transactional
    public void processPayment(long id, long teamId){
        Team t = getTeam(teamId);
        Member m = memberService.getMember(id);
        m.setIfPaid(true);
        memberService.update(m);
        t.setIfAllPaid(true);
        teamRepository.save(t);
//        System.out.println(id+ " paid");
//        int count = 0;
//        for(Member member: t.getMembers()){
//            if(member.getIfPaid()){
//                count++;
//            }
//        }
//        if(t.getTeamLead().getIfPaid() && count == t.getMembers().size()){
//            sendEmailToLead(t.getTeamLead());
//        }
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
     //   String to = email;
        String to = "verawang0112@gmail.com";
        long id = lead.getHacker().getId();

        System.out.println("member id: "+id);
        String text = "Dear " + lead.getHacker().getUsername() + ", \n\n" +
                "All your team members have paid the registration fee successfully." +
                "Please enjoy the event! \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Management: All Members Have Been Paid");
        message.setText(text);
        emailSender.send(message);
        System.out.println("all paid email sent out");
    }

}
