package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.model.Member;

import edu.cmpe275.group275.openhack.repository.HackathonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
public class HackathonServiceImpl implements HackathonService{
    private final HackathonRepository hackathonRepository;

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    private TeamService teamService;

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

    @Transactional
    public void update(Hackathon h){
        hackathonRepository.save(h);
    }

    @Transactional
    public void joinHackathon(long id, Team team){
        System.out.println("team: " + team.toString());
        Hackathon h = getHackathon(id);
        List<Team> teamList = h.getTeams();
        if(teamList == null){
            teamList = new ArrayList<>();
        }
        teamList.add(team);
        h.setTeams(teamList);
        hackathonRepository.save(h);
    //    teamService.join(h, team);
        System.out.println("join team get here");
        sendConfirmation(team.getTeamLead(), h);
        for(Member m: team.getMembers()){
            sendConfirmation(m, h);
        }
    }



    private void sendConfirmation(Member member, Hackathon h){
        System.out.println("inside email function");
        SimpleMailMessage message = new SimpleMailMessage();
        // String to = email;
        String to = "verawang0112@gmail.com";
        long id = member.getHacker().getId();
        long teamId = member.getTeam().getId();
        System.out.println("member id: "+id);
        String text = "Dear " + member.getHacker().getUsername() + ", \n\n" +
                "You have successfully joined the hackathon event " + h.getName() +
                ". The registration fee is $" + h.getFee() + ". Please process your payment below. \n\n" +
                "<a href='http://localhost:8080/hackathon/payment?uid="+id+"&tid="+teamId+ "'>" +
                "payyourfee</a> \n\n" +
                "Hackathon Management System";
        message.setTo(to);
        message.setSubject("Hackathon Confirmation: Your Hackathon Event and Payment");
        message.setText(text);
        emailSender.send(message);
        System.out.println("hackathon confirm email sent out");
    }



}
