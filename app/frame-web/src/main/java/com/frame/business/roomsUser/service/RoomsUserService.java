package com.frame.business.roomsUser.service;

import com.frame.business.roomsUser.model.RoomsUser;

import java.util.List;

public interface RoomsUserService {

    public List<RoomsUser> getList(int offset, int limit
            , String sortName, String sortOrder,
                                   String user_id,
                                   String room_id) throws Exception;

    public int findCount(String user_id,
                         String room_id) throws Exception;

    public void saveRoomsUser(RoomsUser roomsUser) throws Exception;

    public void updateRoomsUser(RoomsUser roomsUser) throws Exception;

    public void deleteRoomsUser(String id, String user_id, String room_id) throws Exception;

    public RoomsUser findRoomsUser(String id, String user_id,
                                   String room_id) throws Exception;

}
