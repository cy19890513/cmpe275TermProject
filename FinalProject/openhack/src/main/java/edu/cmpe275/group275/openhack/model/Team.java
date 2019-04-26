package edu.cmpe275.group275.openhack.model;


import javax.persistence.*;


public class Team{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String teamName;
    private Member teamLead;
    //private List<Member> members;
    private Double grade;
    private String url;
    private Boolean ifAllPaid;






}




