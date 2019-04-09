package com.frame.business.rooms.service;

import com.frame.business.rooms.model.Rooms;

import java.util.List;

public interface RoomsService {
    public List<Rooms> getList( int offset,  int limit
            ,  String sortName,  String sortOrder,
                          String room_id,
                            String room_no,
                              String room_owner,
                              String room_owner_name,
                              String white_id,
                              String room_grade,
                             String room_course) throws Exception;

    public int findCount(   String room_id,
                         String room_no,
                          String room_owner,
                         String room_owner_name,
                         String white_id,
                           String room_grade,
                        String room_course) throws Exception;

    public void saveRooms(Rooms rooms) throws Exception;

    public void updateRooms(Rooms rooms) throws Exception;
    public void deleteRooms(String room_id) throws Exception;
    public Rooms findRooms( String room_id,
                           String room_no,
                          String room_owner,
                          String room_owner_name,
                         String white_id,
                       String room_grade,
                          String room_course) throws Exception;


}
