package edu.cmpe275.group275.openhack.repository;
import edu.cmpe275.group275.openhack.model.AdminUser;
import edu.cmpe275.group275.openhack.model.Hackathon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

}
