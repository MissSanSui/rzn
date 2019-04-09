package com.frame.business.roomReview.service;

import com.frame.business.roomReview.model.RoomReview;

import java.util.List;

public interface RoomReviewService {
    public List<RoomReview> getList(int offset, int limit
            , String sortName, String sortOrder,
                                    String review_id,String review_white_id,
                                    String review_stu,
                                    String review_stu_name,
                                    String review_tea,
                                    String review_tea_name) throws Exception;

    public int findCount(String review_id,String review_white_id,
                         String review_stu,
                         String review_stu_name,
                         String review_tea,
                         String review_tea_name) throws Exception;

    public void saveRoomReview(RoomReview roomReview) throws Exception;

    public void updateRoomReview(RoomReview roomReview) throws Exception;

    public void deleteRoomReview(String review_id) throws Exception;

    public RoomReview findRoomReview(String review_id,String review_white_id,
                                    String review_stu,
                                    String review_stu_name,
                                    String review_tea,
                                    String review_tea_name) throws Exception;
}
