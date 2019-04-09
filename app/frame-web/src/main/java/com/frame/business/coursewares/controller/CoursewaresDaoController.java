package com.frame.business.coursewares.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.coursewares.model.Coursewares;
import com.frame.business.coursewares.service.CoursewaresService;
import com.frame.kernel.base.model.AjaxResult;
import com.frame.kernel.user.model.User;
import com.frame.kernel.util.CommonUtils;
import com.frame.kernel.util.JSONUtil;
import org.apache.commons.lang3.StringUtils;
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
@RequestMapping("/coursewares")
public class CoursewaresDaoController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private CoursewaresService coursewaresService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("coursewaresList")
	public String  coursewaresList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String coursewares_no = request.getParameter("coursewares_no");
		String coursewares_tea = request.getParameter("coursewares_tea");
		String coursewares_tea_name = request.getParameter("coursewares_tea_name");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<Coursewares> list = new ArrayList<Coursewares>();
		int total = 0;
		try {
			list = coursewaresService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"coursewares_no":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, coursewares_no,coursewares_tea,coursewares_tea_name);
			total = coursewaresService.findCount( coursewares_no,coursewares_tea,coursewares_tea_name);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findCoursewaresByNo")
	public String  findCoursewaresByNo(HttpServletRequest request, HttpServletResponse response){

		String  coursewares_no= request.getParameter("coursewares_no");
		String coursewares_tea = request.getParameter("coursewares_tea");
		String coursewares_tea_name = request.getParameter("coursewares_tea_name");
		try {
			Coursewares coursewares = coursewaresService.findCoursewares(coursewares_no,coursewares_tea,coursewares_tea_name);
			ajaxResult.success( "",coursewares);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteCoursewaresByNo")
	public String  deleteCoursewaresByNo(HttpServletRequest request, HttpServletResponse response){

		String  coursewares_no= request.getParameter("coursewares_no");

		try {
			coursewaresService.deleteCoursewares(coursewares_no);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveCoursewares", method = RequestMethod.POST)
    public String saveCoursewares(HttpServletRequest request, HttpServletResponse response, Coursewares coursewares) {
		JSONObject js = new JSONObject();
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			coursewares.setCreated_by(userLogin.getUser_id());
			coursewares.setLast_updated_by(userLogin.getUser_id());
			String coursewaresId = coursewaresService.saveCoursewares(coursewares);
			if(StringUtils.isEmpty(coursewaresId) || "null".toLowerCase().equals(coursewaresId.toLowerCase())){
				ajaxResult.addError("保存失败：课件主键为空");
			}else{
				js.put("teaId",coursewares.getCoursewares_tea());
				js.put("coursewaresId",coursewaresId);
				ajaxResult.success("保存成功！",js.toJSONString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("UpdateCoursewaresInfo")
    public String UpdateCoursewaresInfo(HttpServletRequest request, HttpServletResponse response,  Coursewares coursewares) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			coursewares.setLast_updated_by(userLogin.getUser_id());
			coursewaresService.updateCoursewares(coursewares);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}