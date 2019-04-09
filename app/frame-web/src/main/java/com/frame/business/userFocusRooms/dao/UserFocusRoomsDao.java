package com.frame.business.userFocusRooms.dao;

import com.frame.business.userFocusRooms.model.UserFocusRooms;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserFocusRoomsDao {

    public List<UserFocusRooms> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                               @Param("focus_no") String focus_no,
                               @Param("room_no") String room_no,
                               @Param("user_id") String user_id) throws Exception;

    public int findCount(@Param("focus_no") String focus_no,
                         @Param("room_no") String room_no,
                         @Param("user_id") String user_id) throws Exception;

    public void saveUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception;

    public void updateUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception;
    public void deleteUserFocusRoomsDao(String focus_no) throws Exception;
    public UserFocusRooms findUserFocusRooms(@Param("focus_no") String focus_no,
                           @Param("room_no") String room_no,
                           @Param("user_id") String user_id) throws Exception;


}
