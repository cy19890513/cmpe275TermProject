package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Team;

public interface TeamService {

    Team createTeam(Team hackathon);

    Team getTeam(long id);
    Team getTeamByName(String name);
}
