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
    public Hackathon getHackathon(long id) {
        return hackathonRepository.getOne(id);
    }

    public Team createTeam(Member teamLead, String teamName, List<Member> members){
        //TODO
        return null;
    }

}
