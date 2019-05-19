package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;

import java.util.List;
import java.util.Map;

public interface TeamService {

    Team createTeam(Team t);

    Team getTeam(long id);
    Team getTeamByName(String name);

    void processPayment(long id, long teamId);
    void updateMembers(Team t);
    void join(Hackathon h, Team t);

    void update(Team t);
    boolean exist(long tid);
    List<Team> getTeams(Hackathon h);
    List<Map<String, Object>> converTeamsToMap(List<Team> teams);
}
