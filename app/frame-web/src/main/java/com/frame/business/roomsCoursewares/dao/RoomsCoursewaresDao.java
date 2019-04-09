package com.frame.business.roomsCoursewares.dao;

import com.frame.business.roomsCoursewares.model.RoomsCoursewares;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomsCoursewaresDao {

    public List<RoomsCoursewares> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                          @Param("coursewares_no") String coursewares_no,
                                          @Param("room_id") String room_id) throws Exception;

    public int findCount(@Param("coursewares_no") String coursewares_no,
                         @Param("room_id") String room_id) throws Exception;

    public void saveRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception;

    public void updateRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception;
    public void deleteRoomsCoursewares(@Param("id") String id, @Param("coursewares_no") String coursewares_no, @Param("room_id") String room_id) throws Exception;
    public RoomsCoursewares findRoomsCoursewares(@Param("id") String id, @Param("coursewares_no") String coursewares_no,
                                                                     @Param("room_id") String room_id) throws Exception;


}
