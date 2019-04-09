package com.frame.business.rooms.service.impl;

import com.frame.business.rooms.dao.RoomsDao;
import com.frame.business.rooms.model.Rooms;
import com.frame.business.rooms.service.RoomsService;
import com.frame.business.roomsCoursewares.model.RoomsCoursewares;
import com.frame.business.roomsCoursewares.service.RoomsCoursewaresService;
import com.frame.business.roomsUser.model.RoomsUser;
import com.frame.business.roomsUser.service.RoomsUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class RoomsServiceimpl implements RoomsService {
    @Autowired
    private RoomsDao roomsDao;
    @Autowired
    private RoomsUserService roomsUserService;
    @Autowired
    private RoomsCoursewaresService roomsCoursewaresService;

    @Override
    public List<Rooms> getList(int offset, int limit, String sortName, String sortOrder, String room_id, String room_no, String room_owner, String room_owner_name, String white_id, String room_grade, String room_course) throws Exception {
        return roomsDao.getList(offset,limit,sortName,sortOrder,room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
    }

    @Override
    public int findCount(String room_id, String room_no, String room_owner, String room_owner_name, String white_id, String room_grade, String room_course) throws Exception {
        return roomsDao.findCount(room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
    }

    @Override
    public void saveRooms(Rooms rooms) throws Exception {
        Rooms roomsFind = findRooms(null,rooms.getRoom_no()+"",rooms.getRoom_owner()+"",null,rooms.getWhite_id(),rooms.getRoom_grade(),rooms.getRoom_course());
        if(null!=roomsFind){
            throw new Exception("已经存在");
        }
        roomsDao.saveRooms(  rooms);
            /*
            创建学生关联直播间实体
         */
        if(!StringUtils.isEmpty(rooms.getUser_ids())){
            String[] userIdArr = rooms.getUser_ids().split(",");
            for(String userId:userIdArr){
                if(StringUtils.isEmpty(userId))continue;
                RoomsUser roomsUser = new RoomsUser();
                roomsUser.setRoom_id(rooms.getRoom_id());
                roomsUser.setUser_id(Integer.parseInt(userId));

                roomsUser.setCreated_by(rooms.getCreated_by());
                roomsUser.setLast_updated_by(rooms.getLast_updated_by());
                roomsUserService.saveRoomsUser(roomsUser);
            }

        }

        /*
            创建课件关联直播间实体
         */
        if(!StringUtils.isEmpty(rooms.getCoursewares_nos())){
            String[] coursewares_noArr = rooms.getCoursewares_nos().split(",");
            for(String coursewares_no:coursewares_noArr){
                if(StringUtils.isEmpty(coursewares_no))continue;
                RoomsCoursewares roomsCoursewares = new RoomsCoursewares();
                roomsCoursewares.setRoom_id(rooms.getRoom_id());
                roomsCoursewares.setCoursewares_no(Integer.parseInt(coursewares_no));
                roomsCoursewares.setCreated_by(rooms.getCreated_by());
                roomsCoursewares.setLast_updated_by(rooms.getLast_updated_by());
                roomsCoursewaresService.saveRoomsCoursewares(roomsCoursewares);
            }
        }

    }

    @Override
    public void updateRooms(Rooms rooms) throws Exception {
        Rooms roomsFind = findRooms(null,rooms.getRoom_no()+"",rooms.getRoom_owner()+"",null,rooms.getWhite_id(),rooms.getRoom_grade(),rooms.getRoom_course());
        if(null!=roomsFind && roomsFind.getRoom_id() !=  rooms.getRoom_id()){
            throw new Exception("已经存在");
        }
        roomsDao.updateRooms(  rooms);
    }

    @Override
    public void deleteRooms(String room_id) throws Exception {
        roomsDao.deleteRooms(  room_id);
    }

    @Override
    public Rooms findRooms(String room_id, String room_no, String room_owner, String room_owner_name, String white_id, String room_grade, String room_course) throws Exception {
        return roomsDao.findRooms(room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
    }
}
