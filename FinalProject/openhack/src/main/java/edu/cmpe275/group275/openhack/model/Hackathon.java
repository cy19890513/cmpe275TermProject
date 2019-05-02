package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;

import java.sql.Date;
import java.util.List;

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
   @JoinTable(name = "HACKATHON_SPONORORGS",
           joinColumns = {@JoinColumn(name = "HACKATHON_ID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "SPR_ORG_ID", referencedColumnName = "ID")})
   private List<Organization> sponsors;

   @ManyToMany
   @JoinTable(name = "HACKATHON_HACKERS",
           joinColumns = {@JoinColumn(name = "HACKATHON_ID", referencedColumnName = "ID")},
           inverseJoinColumns = {@JoinColumn(name = "HACKER_ID", referencedColumnName = "ID")})
   private List<HackerUser> hackers;


   private Double discount;

   @OneToMany(mappedBy = "hackathon")
   private List<Team> teams;
   private Boolean isClosed;
   private Boolean isFinalized;

   public Hackathon(){

   }

   public Hackathon(String name, Date startDate, Date endDate, String description, Double fee, List<HackerUser> judges, int minSize, int maxSize, List<Organization> sponsors, Double discount, List<Team> teams, Boolean isClosed, Boolean isFinalized) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
      this.fee = fee;
      this.judges = judges;
      this.minSize = minSize;
      this.maxSize = maxSize;
      this.sponsors = sponsors;
      this.discount = discount;
      this.teams = teams;
      this.isClosed = isClosed;
      this.isFinalized = isFinalized;
   }

   //auto getter and setter
   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public Date getStartDate() {
      return startDate;
   }

   public void setStartDate(Date startDate) {
      this.startDate = startDate;
   }

   public Date getEndDate() {
      return endDate;
   }

   public void setEndDate(Date endDate) {
      this.endDate = endDate;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public Double getFee() {
      return fee;
   }

   public void setFee(Double fee) {
      this.fee = fee;
   }

   public List<HackerUser> getJudges() {
      return judges;
   }

   public void setJudges(List<HackerUser> judges) {
      this.judges = judges;
   }

   public int getMinSize() {
      return minSize;
   }

   public void setMinSize(int minSize) {
      this.minSize = minSize;
   }

   public int getMaxSize() {
      return maxSize;
   }

   public void setMaxSize(int maxSize) {
      this.maxSize = maxSize;
   }

   public List<Organization> getSponsors() {
      return sponsors;
   }

   public void setSponsors(List<Organization> sponsors) {
      this.sponsors = sponsors;
   }

   public Double getDiscount() {
      return discount;
   }

   public void setDiscount(Double discount) {
      this.discount = discount;
   }

   public List<Team> getTeams() {
      return teams;
   }

   public void setTeams(List<Team> teams) {
      this.teams = teams;
   }

   public Boolean getClosed() {
      return isClosed;
   }

   public void setClosed(Boolean closed) {
      isClosed = closed;
   }

   public Boolean getFinalized() {
      return isFinalized;
   }

   public void setFinalized(Boolean finalized) {
      isFinalized = finalized;
   }
}