package edu.cmpe275.group275.openhack.model;

import jdk.nashorn.internal.ir.annotations.Ignore;

import javax.persistence.*;

public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    //one to one
    //private User owner;

    private String description;

    @Embedded
    private Address address;

}
