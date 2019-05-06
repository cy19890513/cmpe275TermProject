package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;


@Entity
@DiscriminatorValue("admin")
public class AdminUser extends User {
    public AdminUser(){};

    public AdminUser( String email,String username, String hashcode) {
        super(email,username, hashcode);
    }




}
