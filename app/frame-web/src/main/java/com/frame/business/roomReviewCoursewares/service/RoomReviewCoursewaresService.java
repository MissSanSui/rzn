package com.frame.business.roomReviewCoursewares.service;

import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;

import java.util.List;

public interface RoomReviewCoursewaresService {
    public List<RoomReviewCoursewares> getList(int offset, int limit
            , String sortName, String sortOrder,
                                               String coursewares_no,
                                               String review_id) throws Exception;

    public int findCount(String coursewares_no,
                         String review_id) throws Exception;

    public void saveRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception;

    public void updateRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception;
    public void deleteRoomReviewCoursewares(String id,String coursewares_no, String review_id) throws Exception;
    public RoomReviewCoursewares findRoomReviewCoursewares( String id,String coursewares_no,
                                                                      String review_id) throws Exception;

}
