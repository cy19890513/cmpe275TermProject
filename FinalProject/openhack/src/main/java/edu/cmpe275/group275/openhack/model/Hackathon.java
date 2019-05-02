package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;

import java.util.List;
import java.util.Date;
@Entity
public class Hackathon {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;

   private String name;

   private java.sql.Date startDate;
   private java.sql.Date endDate;
   private String description;
   private Double fee;


   @ManyToMany
   @JoinTable(name = "HACKATHON_JUDGES",
           joinColumns = {@JoinColumn(name = "HACKATHON_ID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "JDG_HACKER_ID", referencedColumnName = "ID")})
   private List<HackerUser> judges;
   private int minSize;
   private int maxSize;


   @ManyToMany
   @JoinTable(name = "HACKTHON_SPONORORGS",
           joinColumns = {@JoinColumn(name = "HACKATHON_ID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "SPR_ORG_ID", referencedColumnName = "ID")})
   private List<Organization> sponsors;
   private Double discount;

   @OneToMany(mappedBy = "hackathon")
   private List<Team> teams;
   private Boolean isClosed;
   private Boolean isFinalized;

   public Hackathon(){

   }

}
