
package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;

import java.util.List;

public interface HackathonService {

    Hackathon createHackathon(Hackathon hackathon);

    Hackathon getHackathon(long id);

    Team createTeam(Member teamLead, String teamName, List<Member> members);

    List<Hackathon> getHackathonList();

    List<Hackathon> getHackathonsByName(String name);

    void update(Hackathon h);

    void joinHackathon(long id, Team team);

}
