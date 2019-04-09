package com.frame.business.coursewaresImags.service;

import com.frame.business.coursewaresImags.model.CoursewaresImags;

import java.util.List;

public interface CoursewaresImagsService {
    public List<CoursewaresImags> getList(int offset, int limit
                                        , String sortName, String sortOrder,
                                          String coursewares_no,
                                          String coursewares_images) throws Exception;

    public int findCount(String coursewares_no,
                         String coursewares_images) throws Exception;

    public void saveCoursewaresImags (CoursewaresImags coursewaresImags) throws Exception;

    public void updateCoursewaresImags (CoursewaresImags coursewaresImags) throws Exception;

    public void deleteCoursewaresImags (String id,String coursewares_no,
                                        String coursewares_images) throws Exception;

    public CoursewaresImags findCoursewaresImags( String id,String coursewares_no, String coursewares_images) throws Exception;


}
