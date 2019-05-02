package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;


@Entity
@DiscriminatorValue("admin")
@Table(name="ADMINUSER")
public class AdminUser extends User {
<<<<<<< HEAD
    public AdminUser( String email,String username, String hashcode) {
        super(email,username, hashcode);
    }


=======
    public AdminUser(long id, String email,String username) {
        super(id,email,username);
    }

    public AdminUser(String email, String username) {
        super(email, username);
    }

    public AdminUser(String email, String username, String portrait, String businessTitle, String aboutMe, Boolean isVerified, Address address) {
        super(email, username, portrait, businessTitle, aboutMe, isVerified, address);
    }
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
}
