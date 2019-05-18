package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;

public interface TeamService {

    Team createTeam(Team t);

    Team getTeam(long id);
    Team getTeamByName(String name);

    void processPayment(long id, long teamId);
    void updateMembers(Team t);
    void join(Hackathon h, Team t);

    void update(Team t);
    boolean exist(long tid);
}
