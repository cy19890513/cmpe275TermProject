package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.repository.TeamRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;

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

}
