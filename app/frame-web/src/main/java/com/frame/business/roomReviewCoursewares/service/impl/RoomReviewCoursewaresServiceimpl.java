package com.frame.business.roomReviewCoursewares.service.impl;

import com.frame.business.roomReviewCoursewares.dao.RoomReviewCoursewaresDao;
import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;
import com.frame.business.roomReviewCoursewares.service.RoomReviewCoursewaresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class RoomReviewCoursewaresServiceimpl implements RoomReviewCoursewaresService {
    @Autowired
    private RoomReviewCoursewaresDao roomReviewCoursewaresDao;

    @Override
    public List<RoomReviewCoursewares> getList(int offset, int limit, String sortName, String sortOrder, String coursewares_no, String review_id) throws Exception {
        return roomReviewCoursewaresDao.getList(offset,limit,sortName,sortOrder,coursewares_no,review_id);
    }

    @Override
    public int findCount(String coursewares_no, String review_id) throws Exception {
        return  roomReviewCoursewaresDao.findCount(coursewares_no,review_id);
    }

    @Override
    public void saveRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception {
        RoomReviewCoursewares roomReviewCoursewaresImags1 = findRoomReviewCoursewares(null,roomReviewCoursewaresImags.getCoursewares_no()+"",roomReviewCoursewaresImags.getReview_id());
        if(null!=roomReviewCoursewaresImags1){
            throw new Exception("已经存在对应关系");
        }
        roomReviewCoursewaresDao.saveRoomReviewCoursewares(roomReviewCoursewaresImags);
    }

    @Override
    public void updateRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception {
        RoomReviewCoursewares roomReviewCoursewaresImags1 = findRoomReviewCoursewares(null,roomReviewCoursewaresImags.getCoursewares_no()+"",roomReviewCoursewaresImags.getReview_id());
        if(null!=roomReviewCoursewaresImags1  && roomReviewCoursewaresImags1.getId()!=roomReviewCoursewaresImags.getId()){
            throw new Exception("已经存在对应关系");
        }
        roomReviewCoursewaresDao.updateRoomReviewCoursewares(roomReviewCoursewaresImags);
    }

    @Override
    public void deleteRoomReviewCoursewares(String id, String coursewares_no, String review_id) throws Exception {
        roomReviewCoursewaresDao.deleteRoomReviewCoursewares(id, coursewares_no,review_id);
    }

    @Override
    public RoomReviewCoursewares findRoomReviewCoursewares(String id, String coursewares_no, String review_id) throws Exception {
        return  roomReviewCoursewaresDao.findRoomReviewCoursewares(id, coursewares_no,review_id);
    }
}
