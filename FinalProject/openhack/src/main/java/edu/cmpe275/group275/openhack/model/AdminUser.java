package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;


//Maybe not right here
@Entity
@DiscriminatorValue("admin")
@Table(name="ADMINUSER")
public class AdminUser extends User {

}
