package com.frame.business.coursewaresImags.dao;

import com.frame.business.coursewaresImags.model.CoursewaresImags;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CoursewaresImagsDao {

    public List<CoursewaresImags> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                        @Param("coursewares_no") String coursewares_no,
                                        @Param("coursewares_images") String coursewares_images) throws Exception;

    public int findCount( @Param("coursewares_no") String coursewares_no,
                          @Param("coursewares_images") String coursewares_images) throws Exception;

    public void saveCoursewaresImags(CoursewaresImags coursewaresImags) throws Exception;

    public void updateCoursewaresImags (CoursewaresImags coursewaresImags) throws Exception;
    public void deleteCoursewaresImags (@Param("id") String id,@Param("coursewares_no") String coursewares_no,@Param("coursewares_images") String coursewares_images) throws Exception;
    public CoursewaresImags findCoursewaresImags( @Param("id") String id,@Param("coursewares_no") String coursewares_no,
                                                @Param("coursewares_images") String coursewares_images) throws Exception;


}
