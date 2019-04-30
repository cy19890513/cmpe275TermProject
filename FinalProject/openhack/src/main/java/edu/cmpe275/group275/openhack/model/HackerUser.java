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
   @JoinTable(name = "HACKTHONUSERS",
           joinColumns = {@JoinColumn(name = "HACKTHONID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "HACKERID", referencedColumnName = "ID")})
   private List<Hackathon> lists;

    public HackerUser(long id, String email,String username) {
        super(id, email, username);
    }

    //auto getter and setter
   public List<Hackathon> getLists() {
       return lists;
   }

   public void setLists(List<Hackathon> lists) {
       this.lists = lists;
   }
}
