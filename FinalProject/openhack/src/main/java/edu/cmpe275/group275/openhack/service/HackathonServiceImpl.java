package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.model.Member;

import edu.cmpe275.group275.openhack.repository.HackathonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class HackathonServiceImpl implements HackathonService{
    private final HackathonRepository hackathonRepository;

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
        Hackathon h = getHackathon(id);
        List<Team> teamList = h.getTeams();
        teamList.add(team);
        h.setTeams(teamList);
        hackathonRepository.save(h);
    }

}
