package com.frame.business.coursewaresImags.service.impl;

import com.frame.business.coursewaresImags.dao.CoursewaresImagsDao;
import com.frame.business.coursewaresImags.model.CoursewaresImags;
import com.frame.business.coursewaresImags.service.CoursewaresImagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class CoursewaresImagsServiceimpl implements CoursewaresImagsService {
    @Autowired
    private CoursewaresImagsDao coursewaresImagsDao;


    @Override
    public List<CoursewaresImags> getList(int offset, int limit, String sortName, String sortOrder, String coursewares_no, String coursewares_images) throws Exception {
        return coursewaresImagsDao.getList(offset,limit,sortName,sortOrder,coursewares_no,coursewares_images);
    }

    @Override
    public int findCount(String coursewares_no, String coursewares_images) throws Exception {
        return coursewaresImagsDao.findCount(coursewares_no,coursewares_images);
    }

    @Override
    public void saveCoursewaresImags(CoursewaresImags coursewaresImags) throws Exception {

        CoursewaresImags coursewaresImagsFind = findCoursewaresImags(null,coursewaresImags.getCoursewares_no()+"",coursewaresImags.getCoursewares_images());
        if(null!=coursewaresImagsFind){
            throw new Exception("已经存在对应关系");
        }
        coursewaresImagsDao.saveCoursewaresImags(coursewaresImags);
    }

    @Override
    public void updateCoursewaresImags(CoursewaresImags coursewaresImags) throws Exception {
        CoursewaresImags coursewaresImagsFind = findCoursewaresImags(null,coursewaresImags.getCoursewares_no()+"",coursewaresImags.getCoursewares_images());
        if(null!=coursewaresImagsFind && coursewaresImagsFind.getId()!=coursewaresImags.getId()){
            throw new Exception("已经存在对应关系");
        }
        coursewaresImagsDao.updateCoursewaresImags(coursewaresImags);
    }

    @Override
    public void deleteCoursewaresImags(String id,String coursewares_no,
                                       String coursewares_images) throws Exception {
        coursewaresImagsDao.deleteCoursewaresImags(id,coursewares_no,coursewares_images);
    }

    @Override
    public CoursewaresImags findCoursewaresImags( String id,String coursewares_no, String coursewares_images) throws Exception {
        return  coursewaresImagsDao.findCoursewaresImags(id,coursewares_no,coursewares_images);
    }
}
