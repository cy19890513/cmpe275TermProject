package edu.sjsu.cmpe275.lab2.group275.model;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Id;
import javax.persistence.Embedded;
import javax.persistence.Transient;

@Entity
@Table(name = "Employer")
public class Employer{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NAME", nullable = false, unique = true )
    private String name;

    private String description;

    @Embedded
    private Address address;

    public long getId(){
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