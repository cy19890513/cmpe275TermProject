package edu.cmpe275.group275.openhack.repository;

import edu.cmpe275.group275.openhack.model.Hackathon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HackathonRepository extends JpaRepository<Hackathon, Long> {

    List<Hackathon> findHackathonsByNameIgnoreCase(String name);

}
