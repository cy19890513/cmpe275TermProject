package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;
import java.util.List;


@Entity
@DiscriminatorValue("hacker")
@Table(name="HACKERUSER")
public class HackerUser extends User {


   //TODO joinColumn or inverseJoinColumn
   // use @ManyToMany(mappedBy="users")
   @ManyToMany
   @JoinTable(name = "HACKATHON_USERS",
           joinColumns = {@JoinColumn(name = "HACKTHONID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "HACKERID", referencedColumnName = "ID")})
   private List<Hackathon> lists;

   public HackerUser(long id, String email,String username) {
        super(id, email, username);
    }

    public HackerUser(String email, String username, String portrait, String businessTitle, String aboutMe, Boolean isVerified, Address address, List<Hackathon> lists) {
        super(email, username, portrait, businessTitle, aboutMe, isVerified, address);
        this.lists = lists;
    }

    //auto getter and setter
   public List<Hackathon> getLists() {
       return lists;
   }

   public void setLists(List<Hackathon> lists) {
       this.lists = lists;
   }
}
