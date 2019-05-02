package edu.cmpe275.group275.openhack.model;

import java.util.List;
import javax.persistence.*;


@Entity
@Inheritance(strategy=InheritanceType.JOINED)
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
<<<<<<< HEAD
    private String name;
=======
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
    private String portrait;
    private String businessTitle;
    private String aboutMe;
    private Boolean isVerified;
<<<<<<< HEAD
    @Column(name = "PASSWORD", nullable = false)
    private String hashcode;
=======
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab

    //@ManyToMany(mappedBy = "members")
    //private List<Organization> organizations;

<<<<<<< HEAD
    @ManyToMany
    @JoinTable(name = "MEM_ORG",
            joinColumns={@JoinColumn(name="MEM_ID", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name="ORG_ID", referencedColumnName="id")})
    private List<Organization> organizations;

    @Embedded
    private Address address;

    public User(String email, String username, String hashcode){
        this.email = email;
        this.username = username;
        this.hashcode = hashcode;
    }

=======
    @Embedded
    private Address address;

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
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab

    //auto getter and setter
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

<<<<<<< HEAD
    public String getName() {
        return username;
    }

    public void setName(String username) {
        this.username = username;
    }

=======
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab
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

<<<<<<< HEAD
    public void setHashcode(String hashcode) {this.hashcode = hashcode;}

    public List<Organization> getOrganization() {
        return organizations;
    }

    public void setOrganization(List<Organization> organizations) {
        this.organizations = organizations;
    }

=======
//    public Organization getOrganization() {
//        return organization;
//    }
//
//    public void setOrganization(Organization organization) {
//        this.organization = organization;
//    }
//
>>>>>>> 94547bbd2ec99fd05e96b51a06a70514fb22e5ab

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}


