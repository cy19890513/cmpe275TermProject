package edu.cmpe275.group275.openhack.model;


import javax.persistence.*;

import java.util.List;


@Entity
public class Team{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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
    @JoinColumn(name="HACKTHON_ID")
    private Hackathon hackathon;




}




