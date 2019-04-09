package com.frame.business.coursewaresImags.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.coursewaresImags.model.CoursewaresImags;
import com.frame.business.coursewaresImags.service.CoursewaresImagsService;
import com.frame.kernel.base.model.AjaxResult;
import com.frame.kernel.user.model.User;
import com.frame.kernel.util.CommonUtils;
import com.frame.kernel.util.JSONUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/coursewaresImags")
public class CoursewaresImagsController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private CoursewaresImagsService coursewaresImagsService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("coursewaresImagsList")
	public String  coursewaresImagsList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String coursewares_no = request.getParameter("coursewares_no");
		String coursewares_images = request.getParameter("coursewares_images"); 

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<CoursewaresImags> list = new ArrayList<CoursewaresImags>();
		int total = 0;
		try {
			list = coursewaresImagsService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"coursewares_no":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, coursewares_no,coursewares_images);
			total = coursewaresImagsService.findCount(coursewares_no,coursewares_images);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findcoursewaresImagsByNo")
	public String  findUserFocusRoomsByNo(HttpServletRequest request, HttpServletResponse response){

		String id = request.getParameter("id");
		String coursewares_no = request.getParameter("coursewares_no");
		String coursewares_images = request.getParameter("coursewares_images");


		try {
			CoursewaresImags coursewaresImags = coursewaresImagsService.findCoursewaresImags(id,coursewares_no,coursewares_images);
			ajaxResult.success("查询成功",coursewaresImags);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteCoursewaresImags")
	public String  deleteCoursewaresImags(HttpServletRequest request, HttpServletResponse response){

		String  id= request.getParameter("id");
		String  coursewares_no= request.getParameter("coursewares_no");
		String  coursewares_images= request.getParameter("coursewares_images");

		try {
			coursewaresImagsService.deleteCoursewaresImags(id,coursewares_no,coursewares_images);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveCoursewaresImags", method = RequestMethod.POST)
    public String saveUserFocusRooms(HttpServletRequest request, HttpServletResponse response, CoursewaresImags coursewaresImags) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			coursewaresImags.setCreated_by(userLogin.getUser_id());
			coursewaresImags.setLast_updated_by(userLogin.getUser_id());
			coursewaresImagsService.saveCoursewaresImags(coursewaresImags);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("updateCoursewaresImags")
    public String updateCoursewaresImags(HttpServletRequest request, HttpServletResponse response, CoursewaresImags coursewaresImags) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			coursewaresImags.setLast_updated_by(userLogin.getUser_id());
			coursewaresImagsService.updateCoursewaresImags(coursewaresImags);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}