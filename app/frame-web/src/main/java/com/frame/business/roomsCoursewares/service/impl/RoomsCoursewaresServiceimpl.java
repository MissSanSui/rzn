package com.frame.business.roomsCoursewares.service.impl;

import com.frame.business.roomsCoursewares.dao.RoomsCoursewaresDao;
import com.frame.business.roomsCoursewares.model.RoomsCoursewares;
import com.frame.business.roomsCoursewares.model.RoomsCoursewaresAndUser;
import com.frame.business.roomsCoursewares.service.RoomsCoursewaresService;
import com.frame.business.roomsUser.model.RoomsUser;
import com.frame.business.roomsUser.service.RoomsUserService;
import com.frame.kernel.user.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class RoomsCoursewaresServiceimpl implements RoomsCoursewaresService {

    @Autowired
    RoomsCoursewaresDao roomsCoursewaresDao;
    @Autowired
    RoomsUserService roomsUserService;
    @Override
    public List<RoomsCoursewares> getList(int offset, int limit, String sortName, String sortOrder, String coursewares_no, String room_id) throws Exception {
        return roomsCoursewaresDao.getList(offset,limit,sortName,sortOrder,coursewares_no,room_id);
    }

    @Override
    public int findCount(String coursewares_no, String room_id) throws Exception {
        return roomsCoursewaresDao.findCount(coursewares_no,room_id);
    }

    @Override
    public void saveRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception {
        RoomsCoursewares roowsCoursewares1 = findRoomsCoursewares(null,roowsCoursewares.getCoursewares_no()+"",roowsCoursewares.getRoom_id()+"");
        if(null!=roowsCoursewares1 ){
            throw new Exception("已经存在对应关系");
        }
        roomsCoursewaresDao.saveRoomsCoursewares(roowsCoursewares);
    }

    @Override
    public void updateRoomsCoursewares(RoomsCoursewares roowsCoursewares) throws Exception {
        RoomsCoursewares roowsCoursewares1 = findRoomsCoursewares(null,roowsCoursewares.getCoursewares_no()+"",roowsCoursewares.getRoom_id()+"");
        if(null!=roowsCoursewares1  && roowsCoursewares1.getId()!=roowsCoursewares1.getId()){
            throw new Exception("已经存在对应关系");
        }
        roomsCoursewaresDao.updateRoomsCoursewares(roowsCoursewares);
    }

    @Override
    public void deleteRoomsCoursewares(String id, String coursewares_no, String room_id) throws Exception {
        roomsCoursewaresDao.deleteRoomsCoursewares(id,coursewares_no,room_id);
    }

    @Override
    public RoomsCoursewares findRoomsCoursewares(String id, String coursewares_no, String room_id) throws Exception {
        return roomsCoursewaresDao.findRoomsCoursewares(id,coursewares_no,room_id);
    }


    @Override
    public void saveRoomsCoursewaresAndUser(RoomsCoursewaresAndUser roomsCoursewaresAndUser,User user) throws Exception {
        try{
              /*
            创建学生关联直播间实体
         */
            if(!StringUtils.isEmpty(roomsCoursewaresAndUser.getUser_ids())){
                String[] userIdArr = roomsCoursewaresAndUser.getUser_ids().split(",");
                for(String userId:userIdArr){
                    if(StringUtils.isEmpty(userId))continue;
                    RoomsUser roomsUser = new RoomsUser();
                    roomsUser.setRoom_id(roomsCoursewaresAndUser.getRoom_id());
                    roomsUser.setUser_id(Integer.parseInt(userId));

                    roomsUser.setCreated_by(user.getUser_id());
                    roomsUser.setLast_updated_by(user.getUser_id());
                    roomsUserService.saveRoomsUser(roomsUser);
                }

            }

        /*
            创建课件关联直播间实体
         */
            if(!StringUtils.isEmpty(roomsCoursewaresAndUser.getCoursewares_nos())){
                String[] coursewares_noArr = roomsCoursewaresAndUser.getCoursewares_nos().split(",");
                for(String coursewares_no:coursewares_noArr){
                    if(StringUtils.isEmpty(coursewares_no))continue;
                    RoomsCoursewares roomsCoursewares = new RoomsCoursewares();
                    roomsCoursewares.setRoom_id(roomsCoursewaresAndUser.getRoom_id());
                    roomsCoursewares.setCoursewares_no(Integer.parseInt(coursewares_no));
                    roomsCoursewares.setCreated_by(user.getUser_id());
                    roomsCoursewares.setLast_updated_by(user.getUser_id());
                    saveRoomsCoursewares(roomsCoursewares);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException(e.getMessage());
        }


    }
}
