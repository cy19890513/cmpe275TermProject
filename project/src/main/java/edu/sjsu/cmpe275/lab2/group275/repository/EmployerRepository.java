package edu.sjsu.cmpe275.lab2.group275.repository;
import edu.sjsu.cmpe275.lab2.group275.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {

}
