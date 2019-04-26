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

   private Date startDate;
   private Date endDate;
   private String description;
   private Double fee;
   //private List<HackerUser> judges;
   private int minSize;
   private int maxSize;
   //private List<Organization> sponsors;
   private Double discount;
   //private List<Team> teams;
   private Boolean isClosed;
   private Boolean isFinalized;

   public Hackathon(){

   }

}
