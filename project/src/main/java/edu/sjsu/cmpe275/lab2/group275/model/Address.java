package edu.sjsu.cmpe275.lab2.group275.model;

import javax.persistence.Embeddable;
import javax.persistence.Entity;


@Embeddable
public class Address{
    private String street;
    private String city;
    private String state;
    private String zip;

    public Address(){}

    public Address(String street, String city, String state, String zip){
        super();
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public String getStreet(){
        return street;
    }

    public void setStreet(String street){
        this.street = street;
    }

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city = city;
    }

    public String getState(){
        return state;
    }

    public String getZip(){
        return zip;
    }

    public void setZip(String zip){
        this.zip = zip;
    }



}
