package edu.sjsu.cmpe275.lab2.group275.model;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
@Entity
public class Employee{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NAME", nullable = false )
    private String name;

    @Column(name = "EMAIL", nullable = false, unique = true )
    private String email;

    private String title;

    @Embedded
    private Address address;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "EMPLOYER_ID", nullable = false)
    private Employer employer;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "MANAGER_ID")
    private Employee Manager;

    @OneToMany(mappedBy="Manager")
    private List<Employee> reports;

    @ManyToMany
    @JoinTable(name = "COLLABORATORS",
            joinColumns={@JoinColumn(name="ID1", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name="ID2", referencedColumnName="ID")})
    private List<Employee> collaborators;

    public Employee(){}

    public Employee(String name, String email ){
        this.name = name;
        this.email = email;

    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title =  title;
    }

    public Address getAddress(){
        return address;
    }

    public void setAddress(Address address){
        this.address = address;
    }

    public Employer getEmployer(){
        return employer;
    }

    public void setEmployer(Employer employer){
        this.employer = employer;
    }

    public Employee getManager(){
        return Manager;
    }

    public void setManager(Employee manager){
        //if(manager.employer.equals(employer))
            this.Manager = manager;
        //else {
        //    System.out.println("wrong manager");
        //}
    }

    public List<Employee> getReports() {
        return reports;
    }

    public void setReports(List<Employee> reports) {
        this.reports = reports;
    }

    public List<Employee> getCollaborators() {
        return collaborators;
    }


    public void setCollaborators(List<Employee> ecollabs){
        this.collaborators = ecollabs;
    }


}
