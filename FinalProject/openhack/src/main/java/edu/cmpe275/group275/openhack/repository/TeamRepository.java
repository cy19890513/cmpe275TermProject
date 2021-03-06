package edu.cmpe275.group275.openhack.repository;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByTeamName(String name);
    Team findTeamByIdAndHackathon(long t_id, Hackathon h);
    List<Team> findTeamsByHackathon(Hackathon h);

}
