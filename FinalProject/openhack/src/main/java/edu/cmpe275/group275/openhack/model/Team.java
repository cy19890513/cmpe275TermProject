package edu.cmpe275.group275.openhack.model;


import javax.persistence.*;

import java.util.List;


@Entity
@IdClass(TeamPK.class)
public class Team{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String teamName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TEAMLEAD_MEMBERID")
    private Member teamLead;

    @OneToMany(mappedBy = "team")
    private List<Member> members;

    private Double grade;
    private String url;
    private Boolean ifAllPaid;

    @ManyToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn (name="HACKTHON_ID", referencedColumnName = "Hack_Id")
    private Hackathon hackathon;

    public Team(){}
    public Team(String teamName, Member teamLead, List<Member> members, Double grade, String url, Boolean ifAllPaid, Hackathon hackathon) {
        this.teamName = teamName;
        this.teamLead = teamLead;
        this.members = members;
        this.grade = grade;
        this.url = url;
        this.ifAllPaid = ifAllPaid;
        this.hackathon = hackathon;
    }

    //auto getter and setter
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Member getTeamLead() {
        return teamLead;
    }

    public void setTeamLead(Member teamLead) {
        this.teamLead = teamLead;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getIfAllPaid() {
        return ifAllPaid;
    }

    public void setIfAllPaid(Boolean ifAllPaid) {
        this.ifAllPaid = ifAllPaid;
    }

    public Hackathon getHackathon() {
        return hackathon;
    }

    public void setHackathon(Hackathon hackathon) {
        this.hackathon = hackathon;
    }
}




