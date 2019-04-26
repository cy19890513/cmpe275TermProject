package edu.cmpe275.group275.openhack.model;



public class Member {

    //link by id
    private HackerUser hacker;

    private String role;

    private Boolean ifPaid = false;


    public Member(){

    }

    public Member(HackerUser hacker, String role){
        this.hacker = hacker;
        this.role = role;
    }

    public Member(HackerUser hacker, String role, Boolean ifPaid){
        this.hacker = hacker;
        this.role = role;
        this.ifPaid = ifPaid;
    }

    public MemberBuilder() { }

    public Member buildMember(){
        return new Member(hacker,role, ifPaid);
    }



}


