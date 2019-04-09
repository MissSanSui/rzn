package com.frame.business.roomsCoursewares.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.roomsCoursewares.model.RoomsCoursewares;
import com.frame.business.roomsCoursewares.model.RoomsCoursewaresAndUser;
import com.frame.business.roomsCoursewares.service.RoomsCoursewaresService;
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
@RequestMapping("/roomsCoursewares")
public class RoomsCoursewaresController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private RoomsCoursewaresService roomsCoursewaresService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("roomsCoursewaresList")
	public String  roomsCoursewaresList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String coursewares_no = request.getParameter("coursewares_no");
		String room_id = request.getParameter("room_id");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<RoomsCoursewares> list = new ArrayList<RoomsCoursewares>();
		int total = 0;
		try {
			list = roomsCoursewaresService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"room_id":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, coursewares_no,room_id);
			total = roomsCoursewaresService.findCount(coursewares_no,room_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findRoowsCoursewaresByNo")
	public String  findRoowsCoursewaresByNo(HttpServletRequest request, HttpServletResponse response){

		String id = request.getParameter("id");
		String coursewares_no = request.getParameter("coursewares_no");
		String room_id = request.getParameter("room_id");


		try {
			RoomsCoursewares roowsCoursewares = roomsCoursewaresService.findRoomsCoursewares(id,coursewares_no,room_id);
			ajaxResult.success("查询成功",roowsCoursewares);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteRoomsCoursewares")
	public String  deleteRoomsCoursewares(HttpServletRequest request, HttpServletResponse response){

		String  id= request.getParameter("id");
		String  coursewares_no= request.getParameter("coursewares_no");
		String  room_id= request.getParameter("room_id");

		try {
			roomsCoursewaresService.deleteRoomsCoursewares(id,coursewares_no,room_id);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveRoomsCoursewares", method = RequestMethod.POST)
    public String saveRoomsCoursewares(HttpServletRequest request, HttpServletResponse response, RoomsCoursewares roowsCoursewares) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roowsCoursewares.setCreated_by(userLogin.getUser_id());
			roowsCoursewares.setLast_updated_by(userLogin.getUser_id());
			roomsCoursewaresService.saveRoomsCoursewares(roowsCoursewares);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("updateRoomsCoursewares")
    public String updateRoomsCoursewares(HttpServletRequest request, HttpServletResponse response,RoomsCoursewares roowsCoursewares) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roowsCoursewares.setLast_updated_by(userLogin.getUser_id());
			roomsCoursewaresService.updateRoomsCoursewares(roowsCoursewares);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

	@ResponseBody
	@RequestMapping(value = "saveRoomsCoursewaresAndUser", method = RequestMethod.POST)
	public String saveRoomsCoursewaresAndUser(HttpServletRequest request, HttpServletResponse response, RoomsCoursewaresAndUser roomsCoursewaresAndUser) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomsCoursewaresService.saveRoomsCoursewaresAndUser(roomsCoursewaresAndUser, userLogin);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

}