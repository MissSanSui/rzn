package com.frame.business.coursewares.service;

import com.frame.business.coursewares.model.Coursewares;

import java.util.List;

public interface CoursewaresService {
    public List<Coursewares> getList(int offset, int limit
            , String sortName, String sortOrder,
                                     String coursewares_no,
                                     String coursewares_tea,
                                     String coursewares_tea_name) throws Exception;

    public int findCount(String coursewares_no,
                         String coursewares_tea,String coursewares_tea_name) throws Exception;

    public String saveCoursewares(Coursewares coursewares) throws Exception;

    public void updateCoursewares(Coursewares coursewares) throws Exception;

    public void deleteCoursewares(String coursewares_no) throws Exception;

    public Coursewares findCoursewares(String coursewares_no,
                                       String coursewares_tea,
                                       String coursewares_tea_name) throws Exception;
}
