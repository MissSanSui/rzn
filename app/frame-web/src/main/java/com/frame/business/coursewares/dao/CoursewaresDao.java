package com.frame.business.coursewares.dao;

import com.frame.business.coursewares.model.Coursewares;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CoursewaresDao {

    public List<Coursewares> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                     @Param("coursewares_no") String coursewares_no,
                                     @Param("coursewares_tea") String coursewares_tea,
                                     @Param("coursewares_tea_name") String coursewares_tea_name) throws Exception;

    public int findCount(@Param("coursewares_no") String coursewares_no,
                         @Param("coursewares_tea") String coursewares_tea,
                         @Param("coursewares_tea_name") String coursewares_tea_name) throws Exception;

    public void saveCoursewares(Coursewares coursewares) throws Exception;

    public void updateCoursewares(Coursewares coursewares) throws Exception;
    public void deleteCoursewares(String coursewares_no) throws Exception;
    public Coursewares findCoursewares(@Param("coursewares_no") String coursewares_no,
                                   @Param("coursewares_tea") String coursewares_tea,
                                       @Param("coursewares_tea_name") String coursewares_tea_name) throws Exception;


}
