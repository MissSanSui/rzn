package com.frame.business.rooms.dao;

import com.frame.business.rooms.model.Rooms;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomsDao {

    public List<Rooms> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                               @Param("room_id") String room_id,
                               @Param("room_no") String room_no,
                               @Param("room_owner") String room_owner,
                               @Param("room_owner_name") String room_owner_name,
                               @Param("white_id") String white_id,
                               @Param("room_grade") String room_grade,
                               @Param("room_course") String room_course) throws Exception;

    public int findCount( @Param("room_id") String room_id,
                          @Param("room_no") String room_no,
                          @Param("room_owner") String room_owner,
                          @Param("room_owner_name") String room_owner_name,
                          @Param("white_id") String white_id,
                          @Param("room_grade") String room_grade,
                          @Param("room_course") String room_course) throws Exception;

    public void saveRooms(Rooms rooms) throws Exception;

    public void updateRooms(Rooms rooms) throws Exception;
    public void deleteRooms(String room_id) throws Exception;
    public Rooms findRooms(@Param("room_id") String room_id,
                                @Param("room_no") String room_no,
                                @Param("room_owner") String room_owner,
                                @Param("room_owner_name") String room_owner_name,
                                @Param("white_id") String white_id,
                                @Param("room_grade") String room_grade,
                                @Param("room_course") String room_course) throws Exception;


}
