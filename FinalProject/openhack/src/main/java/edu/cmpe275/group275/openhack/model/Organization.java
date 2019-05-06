package edu.cmpe275.group275.openhack.model;

//import jdk.nashorn.internal.ir.annotations.Ignore;

import java.util.List;
import javax.persistence.*;

@Entity
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="USER_ID", nullable = false)
    private HackerUser owner;

    private String description;

    @Embedded
    private Address address;

    @OneToMany(mappedBy="organization")
    private List<HackerUser> members;

    @ManyToMany(mappedBy = "sponsors")
    private List<Hackathon> sponsored_hacks;

    public Organization() {
    }

    public Organization(String name, HackerUser owner, String description, Address address) {
        this.name = name;
        this.owner = owner;
        this.description = description;
        this.address = address;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(HackerUser owner) {
        this.owner = owner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


}
