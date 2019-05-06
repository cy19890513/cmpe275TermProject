package edu.cmpe275.group275.openhack.repository;

import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByHacker(long id);
}
