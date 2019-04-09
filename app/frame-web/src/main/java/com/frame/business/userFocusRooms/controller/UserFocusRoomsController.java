package com.frame.business.userFocusRooms.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.userFocusRooms.model.UserFocusRooms;
import com.frame.business.userFocusRooms.service.UserFocusRoomsService;
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
@RequestMapping("/userFocusRooms")
public class UserFocusRoomsController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private UserFocusRoomsService userFocusRoomsService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("userFocusRoomsList")
	public String  userFocusRoomsList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String focus_no = request.getParameter("focus_no");
		String room_no = request.getParameter("room_no");
		String user_id = request.getParameter("user_id");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<UserFocusRooms> list = new ArrayList<UserFocusRooms>();
		int total = 0;
		try {
			list = userFocusRoomsService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"room_no":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, focus_no,room_no,user_id);
			total = userFocusRoomsService.findCount(focus_no,room_no,user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findUserFocusRoomsByNo")
	public String  findUserFocusRoomsByNo(HttpServletRequest request, HttpServletResponse response){

		String focus_no = request.getParameter("focus_no");
		String room_no = request.getParameter("room_no");
		String user_id = request.getParameter("user_id");


		try {
			UserFocusRooms userFocusRooms = userFocusRoomsService.findUserFocusRooms(focus_no,room_no,user_id);
			ajaxResult.success("查询成功",userFocusRooms);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteUserFocusRoomsByNo")
	public String  deleteUserFocusRoomsByNo(HttpServletRequest request, HttpServletResponse response){

		String  focus_no= request.getParameter("focus_no");

		try {
			userFocusRoomsService.deleteUserFocusRoomsDao(focus_no);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveUserFocusRooms", method = RequestMethod.POST)
    public String saveUserFocusRooms(HttpServletRequest request, HttpServletResponse response, UserFocusRooms userFocusRooms) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			userFocusRooms.setCreated_by(userLogin.getUser_id());
			userFocusRooms.setLast_updated_by(userLogin.getUser_id());
			userFocusRoomsService.saveUserFocusRoomsDao(userFocusRooms);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("UpdateUserFocusRoomsInfo")
    public String UpdateUserFocusRoomsInfo(HttpServletRequest request, HttpServletResponse response, UserFocusRooms userFocusRooms) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			userFocusRooms.setLast_updated_by(userLogin.getUser_id());
			userFocusRoomsService.updateUserFocusRoomsDao(userFocusRooms);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}