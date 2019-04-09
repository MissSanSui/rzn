package com.frame.business.rooms.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.rooms.model.Rooms;
import com.frame.business.rooms.service.RoomsService;
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
@RequestMapping("/rooms")
public class RoomsController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private RoomsService roomsService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("roomsList")
	public String  roomsList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String room_id = request.getParameter("room_id");
		String room_no = request.getParameter("room_no");
		String room_owner = request.getParameter("room_owner");
		String room_owner_name =request.getParameter("room_owner_name");
		String white_id =request.getParameter("white_id");
		String room_grade =request.getParameter("room_grade");
		String room_course =request.getParameter("room_course");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<Rooms> list = new ArrayList<Rooms>();
		int total = 0;
		try {
			list = roomsService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"emp_name_tea":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
			total = roomsService.findCount(room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findRoomsByNo")
	public String  findRoomsByNo(HttpServletRequest request, HttpServletResponse response){

		String room_id = request.getParameter("room_id");
		String room_no = request.getParameter("room_no");
		String room_owner = request.getParameter("room_owner");
		String room_owner_name =request.getParameter("room_owner_name");
		String white_id =request.getParameter("white_id");
		String room_grade =request.getParameter("room_grade");
		String room_course =request.getParameter("room_course");
		try {
			Rooms rooms = roomsService.findRooms(room_id,room_no,room_owner,room_owner_name,white_id,room_grade,room_course);
			ajaxResult.success("查询成功",rooms);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteRoomsByNo")
	public String  deleteRoomsByNo(HttpServletRequest request, HttpServletResponse response){

		String  room_id= request.getParameter("room_id");

		try {
			roomsService.deleteRooms(room_id);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveRooms", method = RequestMethod.POST)
    public String saveRooms(HttpServletRequest request, HttpServletResponse response, Rooms rooms) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			rooms.setCreated_by(userLogin.getUser_id());
			rooms.setLast_updated_by(userLogin.getUser_id());
			roomsService.saveRooms(rooms);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("UpdateRoomsInfo")
    public String UpdateRoomsInfo(HttpServletRequest request, HttpServletResponse response, Rooms rooms) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			rooms.setLast_updated_by(userLogin.getUser_id());
			roomsService.updateRooms(rooms);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}