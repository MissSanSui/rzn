package com.frame.business.roomReview.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.roomReview.dao.RoomReviewDao;
import com.frame.business.roomReview.model.RoomReview;
import com.frame.business.roomReview.service.RoomReviewService;
import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;
import com.frame.business.roomReviewCoursewares.service.RoomReviewCoursewaresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoomReviewServiceimpl implements RoomReviewService {
    @Autowired
    private RoomReviewDao roomReviewDao;
    @Autowired
    private RoomReviewCoursewaresService roomReviewCoursewaresService;
    @Override
    public List<RoomReview> getList(int offset, int limit, String sortName, String sortOrder, String review_id,String review_white_id, String review_stu, String review_stu_name, String review_tea, String review_tea_name) throws Exception {
        return roomReviewDao.getList(offset,limit,sortName,sortOrder,review_id, review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
    }

    @Override
    public int findCount(String review_id,String review_white_id, String review_stu, String review_stu_name, String review_tea, String review_tea_name) throws Exception {
         return roomReviewDao.findCount(review_id,review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
    }

    @Override
    public void saveRoomReview(RoomReview roomReview) throws Exception {
        try{

            RoomReview roomReviewExsit =  findRoomReview(null, roomReview.getReview_white_id()+"",roomReview.getReview_stu()+"", null, roomReview.getReview_tea()+"",null);
            if(null!=roomReviewExsit){
                throw new Exception("课程回顾已存在！");
            }
            roomReviewDao.saveRoomReview(roomReview);
           List<RoomReviewCoursewares> listTemp = JSONObject.parseArray(roomReview.getRoomReviewCoursewares(),RoomReviewCoursewares.class)  ;
            if(null!=roomReview&& null!=listTemp && listTemp.size()>0){
                for(RoomReviewCoursewares roomReviewCoursewaresImags:listTemp){
                    roomReviewCoursewaresImags.setReview_id(roomReview.getReview_id()+"");
                    roomReviewCoursewaresImags.setCreated_by(roomReview.getCreated_by());
                    roomReviewCoursewaresImags.setLast_updated_by(roomReview.getLast_updated_by());
                    roomReviewCoursewaresService.saveRoomReviewCoursewares(roomReviewCoursewaresImags);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }

    }


    @Override
    public void updateRoomReview(RoomReview roomReview) throws Exception {
        RoomReview roomReviewExsit =  findRoomReview(null, roomReview.getReview_white_id()+"",roomReview.getReview_stu()+"", null, roomReview.getReview_tea()+"",null);
        if(null!=roomReviewExsit && roomReviewExsit.getReview_id()!=roomReview.getReview_id()){
            throw new Exception("课程回顾已存在！");
        }
        roomReviewDao.updateRoomReview(roomReview);
    }

    @Override
    public void deleteRoomReview(String review_id) throws Exception {
        roomReviewDao.deleteRoomReview(review_id);
    }

    @Override
    public RoomReview findRoomReview(String review_id,String review_white_id, String review_stu, String review_stu_name, String review_tea, String review_tea_name) throws Exception {
        return roomReviewDao.findRoomReview(review_id,review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
    }
}
