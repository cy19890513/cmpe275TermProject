package edu.cmpe275.group275.openhack.model;

import org.junit.Ignore;
import org.junit.Test;

import java.util.ArrayList;

public class modelTests {


    @Ignore
    @Test
    public void testOne(){
        User a = new User("ad","asd");
        Address b = new Address();
        AdminUser c = new AdminUser();
    }

    @Ignore
    @Test
    public void testManyToMany(){
        Hackathon h = new Hackathon();
        HackerUser u = new HackerUser();
        h.setJudges(new ArrayList<HackerUser>(){{
            add(u);
        }});
    }
}
