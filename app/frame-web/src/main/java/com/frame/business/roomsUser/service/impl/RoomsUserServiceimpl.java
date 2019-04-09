package com.frame.business.roomsUser.service.impl;

import com.frame.business.roomsUser.dao.RoomsUserDao;
import com.frame.business.roomsUser.model.RoomsUser;
import com.frame.business.roomsUser.service.RoomsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class RoomsUserServiceimpl implements RoomsUserService {

    @Autowired
    RoomsUserDao roomsUserDao;
    @Override
    public List<RoomsUser> getList(int offset, int limit, String sortName, String sortOrder, String user_id, String room_id) throws Exception {
        return roomsUserDao.getList(offset,limit,sortName,sortOrder,user_id,room_id);
    }

    @Override
    public int findCount(String user_id, String room_id) throws Exception {
        return roomsUserDao.findCount(user_id,room_id);
    }

    @Override
    public void saveRoomsUser(RoomsUser roomsUser) throws Exception {
        RoomsUser RoomsUser1 = findRoomsUser(null,roomsUser.getUser_id()+"",roomsUser.getRoom_id()+"");
        if(null!=RoomsUser1 ){
            throw new Exception("已经存在对应关系");
        }
        roomsUserDao.saveRoomsUser(roomsUser);
    }

    @Override
    public void updateRoomsUser(RoomsUser roomsUser) throws Exception {
        RoomsUser RoomsUser1 = findRoomsUser(null,roomsUser.getUser_id()+"",roomsUser.getRoom_id()+"");
        if(null!=RoomsUser1  && RoomsUser1.getId()!=RoomsUser1.getId()){
            throw new Exception("已经存在对应关系");
        }
        roomsUserDao.updateRoomsUser(roomsUser);
    }

    @Override
    public void deleteRoomsUser(String id, String user_id, String room_id) throws Exception {
        roomsUserDao.deleteRoomsUser(id,user_id,room_id);
    }

    @Override
    public RoomsUser findRoomsUser(String id, String user_id, String room_id) throws Exception {
        return roomsUserDao.findRoomsUser(id,user_id,room_id);
    }
}
