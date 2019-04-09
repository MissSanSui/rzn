package com.frame.business.roomReviewCoursewares.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;
import com.frame.business.roomReviewCoursewares.service.RoomReviewCoursewaresService;
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
@RequestMapping("/roomReviewCoursewaresImags")
public class RoomReviewCoursewaresController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private RoomReviewCoursewaresService roomReviewCoursewaresImagsService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("roomReviewCoursewaresImagsList")
	public String  RoomReviewCoursewaresList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String coursewares_no = request.getParameter("coursewares_no");
		String review_id = request.getParameter("review_id"); 

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<RoomReviewCoursewares> list = new ArrayList<RoomReviewCoursewares>();
		int total = 0;
		try {
			list = roomReviewCoursewaresImagsService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"review_id":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, coursewares_no,review_id);
			total = roomReviewCoursewaresImagsService.findCount(coursewares_no,review_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findRoomReviewCoursewaresByNo")
	public String  findRoomReviewCoursewaresByNo(HttpServletRequest request, HttpServletResponse response){

		String id = request.getParameter("id");
		String coursewares_no = request.getParameter("coursewares_no");
		String review_id = request.getParameter("review_id");


		try {
			RoomReviewCoursewares roomReviewCoursewaresImags = roomReviewCoursewaresImagsService.findRoomReviewCoursewares(id,coursewares_no,review_id);
			ajaxResult.success("查询成功",roomReviewCoursewaresImags);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteRoomReviewCoursewares")
	public String  deleteRoomReviewCoursewares(HttpServletRequest request, HttpServletResponse response){

		String  id= request.getParameter("id");
		String  coursewares_no= request.getParameter("coursewares_no");
		String  review_id= request.getParameter("review_id");

		try {
			roomReviewCoursewaresImagsService.deleteRoomReviewCoursewares(id,coursewares_no,review_id);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveRoomReviewCoursewares", method = RequestMethod.POST)
    public String saveRoomReviewCoursewares(HttpServletRequest request, HttpServletResponse response, RoomReviewCoursewares roomReviewCoursewaresImags) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomReviewCoursewaresImags.setCreated_by(userLogin.getUser_id());
			roomReviewCoursewaresImags.setLast_updated_by(userLogin.getUser_id());
			roomReviewCoursewaresImagsService.saveRoomReviewCoursewares(roomReviewCoursewaresImags);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("updateCoursewaresImags")
    public String updateCoursewaresImags(HttpServletRequest request, HttpServletResponse response,RoomReviewCoursewares roomReviewCoursewaresImags) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomReviewCoursewaresImags.setLast_updated_by(userLogin.getUser_id());
			roomReviewCoursewaresImagsService.updateRoomReviewCoursewares(roomReviewCoursewaresImags);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}