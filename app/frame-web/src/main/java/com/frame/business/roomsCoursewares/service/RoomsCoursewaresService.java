package com.frame.business.roomsCoursewares.service;

import com.frame.business.roomsCoursewares.model.RoomsCoursewares;
import com.frame.business.roomsCoursewares.model.RoomsCoursewaresAndUser;
import com.frame.kernel.user.model.User;

import java.util.List;

public interface RoomsCoursewaresService {
    public List<RoomsCoursewares> getList(int offset, int limit
            , String sortName, String sortOrder,
                                                    String coursewares_no,
                                                    String room_id) throws Exception;

    public int findCount(String coursewares_no,
                         String room_id) throws Exception;

    public void saveRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception;

    public void updateRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception;
    public void deleteRoomsCoursewares(String id, String coursewares_no, String room_id) throws Exception;
    public RoomsCoursewares findRoomsCoursewares(String id, String coursewares_no,
                                                                     String room_id) throws Exception;

    public void saveRoomsCoursewaresAndUser (RoomsCoursewaresAndUser roomsCoursewaresAndUser,User user) throws Exception;
}
