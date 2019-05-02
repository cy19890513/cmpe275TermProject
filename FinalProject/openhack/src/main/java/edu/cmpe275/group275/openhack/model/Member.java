package edu.cmpe275.group275.openhack.model;


import jdk.nashorn.internal.ir.annotations.Ignore;

import javax.persistence.Entity;
import javax.persistence.*;


@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="HACKERUSER_ID")
   private HackerUser hacker;

   private String role;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="TEAM_ID")
   private Team team;
   private Boolean ifPaid = false;


   public Member(){

   }

   public Member(HackerUser hacker, String role){
       //this.hacker = hacker;
       this.role = role;
   }

   public Member(HackerUser hacker, String role, Boolean ifPaid){
       //this.hacker = hacker;
       this.role = role;
       this.ifPaid = ifPaid;
   }

    public Member(HackerUser hacker, String role, Team team, Boolean ifPaid) {
        this.hacker = hacker;
        this.role = role;
        this.team = team;
        this.ifPaid = ifPaid;
    }

    //auto getter and setter


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public HackerUser getHacker() {
        return hacker;
    }

    public void setHacker(HackerUser hacker) {
        this.hacker = hacker;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Boolean getIfPaid() {
        return ifPaid;
    }

    public void setIfPaid(Boolean ifPaid) {
        this.ifPaid = ifPaid;
    }
}
//public class MemberBuilder(){
//
//    public Member buildMember(){
//        return new Member(hacker,role,ifPaid);
//    }

//}