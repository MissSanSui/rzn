package com.frame.business.roomReviewCoursewares.dao;

import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomReviewCoursewaresDao {

    public List<RoomReviewCoursewares> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                          @Param("coursewares_no") String coursewares_no,
                                          @Param("review_id") String review_id) throws Exception;

    public int findCount(@Param("coursewares_no") String coursewares_no,
                         @Param("review_id") String review_id) throws Exception;

    public void saveRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception;

    public void updateRoomReviewCoursewares(RoomReviewCoursewares roomReviewCoursewaresImags) throws Exception;
    public void deleteRoomReviewCoursewares(@Param("id") String id, @Param("coursewares_no") String coursewares_no, @Param("review_id") String review_id) throws Exception;
    public RoomReviewCoursewares findRoomReviewCoursewares(@Param("id") String id,@Param("coursewares_no") String coursewares_no,
                                                 @Param("review_id") String review_id) throws Exception;


}
