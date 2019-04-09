package com.frame.business.userFocusRooms.service.impl;

import com.frame.business.userFocusRooms.dao.UserFocusRoomsDao;
import com.frame.business.userFocusRooms.model.UserFocusRooms;
import com.frame.business.userFocusRooms.service.UserFocusRoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class UserFocusRoomsServiceimpl implements UserFocusRoomsService {
    @Autowired
    private UserFocusRoomsDao userFocusRoomsDao;


    @Override
    public List<UserFocusRooms> getList(int offset, int limit, String sortName, String sortOrder, String focus_no, String room_no, String user_id) throws Exception {
        return userFocusRoomsDao.getList(offset,limit,sortName,sortOrder,focus_no,room_no,user_id);
    }

    @Override
    public int findCount(String focus_no, String room_no, String user_id) throws Exception {
        return userFocusRoomsDao.findCount(focus_no,room_no,user_id);
    }

    @Override
    public void saveUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception {
        UserFocusRooms userFocusRoomsFind = findUserFocusRooms(null,userFocusRooms.getRoom_no()+"",userFocusRooms.getUser_id()+"");
        if(null!=userFocusRoomsFind ){
            throw new Exception("已经存在对应关系");
        }
        userFocusRoomsDao.saveUserFocusRoomsDao(userFocusRooms);
    }

    @Override
    public void updateUserFocusRoomsDao(UserFocusRooms userFocusRooms) throws Exception {
        UserFocusRooms userFocusRoomsFind = findUserFocusRooms(null,userFocusRooms.getRoom_no()+"",userFocusRooms.getUser_id()+"");
        if(null!=userFocusRoomsFind && userFocusRooms.getFocus_no()!= userFocusRoomsFind.getFocus_no()){
            throw new Exception("已经存在对应关系");
        }
        userFocusRoomsDao.updateUserFocusRoomsDao(userFocusRooms);
    }

    @Override
    public void deleteUserFocusRoomsDao(String focus_no) throws Exception {
        userFocusRoomsDao.deleteUserFocusRoomsDao(focus_no);
    }

    @Override
    public UserFocusRooms findUserFocusRooms(String focus_no, String room_no, String user_id) throws Exception {
        return userFocusRoomsDao.findUserFocusRooms(focus_no,room_no,user_id);
    }
}
