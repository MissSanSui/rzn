package com.frame.business.userFocusRooms.service;

import com.frame.business.userFocusRooms.model.UserFocusRooms;

import java.util.List;

public interface UserFocusRoomsService {
    public List<UserFocusRooms> getList(  int offset,  int limit
            ,  String sortName,  String sortOrder,
                                String focus_no,
                             String room_no,
                             String user_id) throws Exception;

    public int findCount(  String focus_no,
                           String room_no,
                         String user_id) throws Exception;

    public void saveUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception;

    public void updateUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception;
    public void deleteUserFocusRoomsDao(String focus_no) throws Exception;
    public UserFocusRooms findUserFocusRooms(  String focus_no,
                                                  String room_no,
                                                 String user_id) throws Exception;

}
