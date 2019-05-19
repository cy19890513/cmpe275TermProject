package edu.cmpe275.group275.openhack.model;

import java.util.List;
import javax.persistence.*;


@Entity
@Inheritance
@DiscriminatorColumn(name="role")
@Table(name="USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "USERNAME", nullable = false, unique = true)
    private String username;

    private String name;

    private String portrait;
    private String businessTitle;
    private String aboutMe;
    private Boolean isVerified;

    @Column(name = "PASSWORD", nullable = false)
    private String hashcode;

    @OneToOne(mappedBy="user")
    VerificationToken token;


    @Embedded
    private Address address;

    @Column(name = "role", insertable = false, updatable = false)
    private String role;


    public User(){};

    public User(String email, String username, String hashcode){
        this.email = email;
        this.username = username;
        this.hashcode = hashcode;
    }


    public User(String email, String username){
        this.email = email;
        this.username = username;
    }
    public User(long id, String email, String username){
        this.id = id;
        this.email = email;
        this.username = username;
    }

    public User(String email, String username, String portrait, String businessTitle, String aboutMe, Boolean isVerified, Address address) {
        this.email = email;
        this.username = username;
        this.portrait = portrait;
        this.businessTitle = businessTitle;
        this.aboutMe = aboutMe;
        this.isVerified = isVerified;
        this.address = address;
    }


    //auto getter and setter

    public String getRole() {
        return role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getName() {
        return name;
    }

    public void setName(String username) {
        this.name = username;
    }


    public String getPortrait() {
        return portrait;
    }

    public void setPortrait(String portrait) {
        this.portrait = portrait;
    }

    public String getBusinessTitle() {
        return businessTitle;
    }

    public void setBusinessTitle(String businessTitle) {
        this.businessTitle = businessTitle;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }


    public void setHashcode(String hashcode) {this.hashcode = hashcode;}

    public String getHashcode() {return hashcode;}

  /*  public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }*/


    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public VerificationToken getToken(){return token;}

    public void setToken(VerificationToken token){this.token = token;}

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", portrait='" + portrait + '\'' +
                ", businessTitle='" + businessTitle + '\'' +
                ", aboutMe='" + aboutMe + '\'' +
                ", isVerified=" + isVerified +
                ", hashcode='" + hashcode + '\'' +
                ", token=" + token +
                ", address=" + address +
                '}';
    }
}


