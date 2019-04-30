package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;


@Entity
@DiscriminatorValue("admin")
@Table(name="ADMINUSER")
public class AdminUser extends User {
    public AdminUser(long id, String email,String username) {
        super(id,email,username);
    }

    public AdminUser(String email, String username) {
        super(email, username);
    }

    public AdminUser(String email, String username, String portrait, String businessTitle, String aboutMe, Boolean isVerified, Address address) {
        super(email, username, portrait, businessTitle, aboutMe, isVerified, address);
    }
}
