package com.frame.business.roomsUser.dao;

import com.frame.business.roomsUser.model.RoomsUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomsUserDao {

    public List<RoomsUser> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                   @Param("user_id") String user_id,
                                   @Param("room_id") String room_id) throws Exception;

    public int findCount(@Param("user_id") String user_id,
                         @Param("room_id") String room_id) throws Exception;

    public void saveRoomsUser(RoomsUser roomsUser) throws Exception;

    public void updateRoomsUser(RoomsUser roomsUser) throws Exception;

    public void deleteRoomsUser(@Param("id") String id, @Param("user_id") String user_id, @Param("room_id") String room_id) throws Exception;

    public RoomsUser findRoomsUser(@Param("id") String id, @Param("user_id") String user_id,
                                   @Param("room_id") String room_id) throws Exception;


}
