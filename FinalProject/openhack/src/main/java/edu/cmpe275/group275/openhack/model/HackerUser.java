package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;
import java.util.List;


@Entity
@DiscriminatorValue("hacker")
public class HackerUser extends User {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ORG_ID")
    private Organization organization;


   @ManyToMany(mappedBy = "hackers")
//   @JoinTable(name = "HACKATHON_USERS",
//           joinColumns = {@JoinColumn(name = "HACKTHONID", referencedColumnName = "ID")},
//           inverseJoinColumns = {@JoinColumn(name = "HACKERID", referencedColumnName = "ID")})
   private List<Hackathon> joinedHacks;

   @ManyToMany(mappedBy = "judges")
   private List<Hackathon> judgeLists;

   public HackerUser(){}


   public HackerUser(String email,String username, String hashcode) {
        super( email, username, hashcode);
    }


    //auto getter and setter



    public List<Hackathon> getJoinedHacks() {
        return joinedHacks;
    }

    public void setJoinedHacks(List<Hackathon> joinedHacks) {
        this.joinedHacks = joinedHacks;
    }

    public List<Hackathon> getJudgeLists() {
        return judgeLists;
    }

    public void setJudgeLists(List<Hackathon> judgeLists) {
        this.judgeLists = judgeLists;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

//    public String getUsername() { return super.getUsername(); }
}
