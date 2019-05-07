package edu.cmpe275.group275.openhack.model;
import java.util.*;

import java.io.Serializable;

public class TeamPK implements Serializable {
    private long id;
    private long hackathon_id;

    public TeamPK() {}


    public TeamPK(long id, long hachathon_id) {
        this.id = id;
        this.hackathon_id = hackathon_id;
    }

    public boolean equals(Object object) {
        if (object instanceof TeamPK) {
            TeamPK pk = (TeamPK)object;
            return id == pk.id && hackathon_id == pk.hackathon_id;
        } else {
            return false;
        }
    }

    public int hashCode() {
        return  (int)(hackathon_id + id);
    }

}
