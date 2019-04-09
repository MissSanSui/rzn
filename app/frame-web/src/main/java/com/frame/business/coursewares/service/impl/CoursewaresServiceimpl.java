package com.frame.business.coursewares.service.impl;

import com.frame.business.coursewares.dao.CoursewaresDao;
import com.frame.business.coursewares.model.Coursewares;
import com.frame.business.coursewares.service.CoursewaresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class CoursewaresServiceimpl implements CoursewaresService {
    @Autowired
    private CoursewaresDao coursewaresDao;

    @Override
    public List<Coursewares> getList(int offset, int limit, String sortName, String sortOrder, String coursewares_no, String coursewares_tea,String coursewares_tea_name) throws Exception {
        return coursewaresDao.getList(offset,limit,sortName,sortOrder,coursewares_no,coursewares_tea,coursewares_tea_name);
    }

    @Override
    public int findCount(String coursewares_no, String coursewares_tea,String coursewares_tea_name) throws Exception {
        return coursewaresDao.findCount(coursewares_no,coursewares_tea,coursewares_tea_name);
    }

    @Override
    public String saveCoursewares(Coursewares coursewares) throws Exception {
        String coursewaresId = "";
        Coursewares coursewaresFind = findCoursewares(coursewares.getCoursewares_no()+"",coursewares.getCoursewares_tea()+"",null);
        if(null!=coursewaresFind){
            throw new Exception("已经存在对应关系");
        }
        coursewaresDao.saveCoursewares(coursewares);
        coursewaresId = coursewares.getCoursewares_no()+"";
        return coursewaresId;
    }

    @Override
    public void updateCoursewares(Coursewares coursewares) throws Exception {
        Coursewares coursewaresFind = findCoursewares(coursewares.getCoursewares_no()+"",coursewares.getCoursewares_tea()+"",null);
        if(null!=coursewaresFind && coursewaresFind.getCoursewares_no()!=coursewares.getCoursewares_no()){
            throw new Exception("已经存在对应关系");
        }
        coursewaresDao.updateCoursewares(coursewares);
    }

    @Override
    public void deleteCoursewares(String coursewares_no) throws Exception {
        coursewaresDao.deleteCoursewares(coursewares_no);
    }

    @Override
    public Coursewares findCoursewares(String coursewares_no, String coursewares_tea,String coursewares_tea_name) throws Exception {
        return coursewaresDao.findCoursewares(coursewares_no,coursewares_tea,coursewares_tea_name);
    }
}
