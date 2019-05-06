package edu.cmpe275.group275.openhack.model;
import java.util.*;

public class TeamPK {
    private long team_id;
    private long h_id;

    public TeamPK() {}

    public TeamPK(long team_id, long h_id) {
        this.team_id = team_id;
        this.h_id =h_id;
    }

    public boolean equals(Object object) {
        if (object instanceof TeamPK) {
            TeamPK pk = (TeamPK)object;
            return team_id == pk.team_id && h_id == pk.h_id;
        } else {
            return false;
        }
    }

    public int hashCode() {
        return  (int)(h_id+ team_id);
    }

}
