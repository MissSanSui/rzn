package com.frame.business.roomReview.dao;

import com.frame.business.roomReview.model.RoomReview;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomReviewDao {

    public List<RoomReview> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                    @Param("review_id") String review_id,
                                    @Param("review_white_id") String review_white_id,
                                    @Param("review_stu") String review_stu,
                                    @Param("review_stu_name") String review_stu_name,
                                            @Param("review_tea") String review_tea,
                                    @Param("review_tea_name") String review_tea_name) throws Exception;

    public int findCount(@Param("review_id") String review_id,@Param("review_white_id") String review_white_id,
                         @Param("review_stu") String review_stu,
                         @Param("review_stu_name") String review_stu_name,
                         @Param("review_tea") String review_tea,
                         @Param("review_tea_name") String review_tea_name) throws Exception;

    public void saveRoomReview(RoomReview roomRevie) throws Exception;

    public void updateRoomReview(RoomReview roomRevie) throws Exception;
    public void deleteRoomReview(String coursewares_no) throws Exception;
    public RoomReview findRoomReview(@Param("review_id") String review_id,@Param("review_white_id") String review_white_id,
                                      @Param("review_stu") String review_stu,
                                      @Param("review_stu_name") String review_stu_name,
                                      @Param("review_tea") String review_tea,
                                      @Param("review_tea_name") String review_tea_name) throws Exception;


}
