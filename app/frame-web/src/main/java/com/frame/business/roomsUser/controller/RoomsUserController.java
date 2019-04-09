package com.frame.business.roomsUser.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.roomsUser.model.RoomsUser;
import com.frame.business.roomsUser.service.RoomsUserService;
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
@RequestMapping("/roomsUser")
public class RoomsUserController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private RoomsUserService roomsUserService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("roomsUserList")
	public String  roomsUserList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String user_id = request.getParameter("user_id");
		String room_id = request.getParameter("room_id");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<RoomsUser> list = new ArrayList<RoomsUser>();
		int total = 0;
		try {
			list = roomsUserService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"user_id":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, user_id,room_id);
			total = roomsUserService.findCount(user_id,room_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findRoomsUserByNo")
	public String  findRoomsUserByNo(HttpServletRequest request, HttpServletResponse response){

		String id = request.getParameter("id");
		String user_id = request.getParameter("user_id");
		String room_id = request.getParameter("room_id");


		try {
			RoomsUser roomsUser = roomsUserService.findRoomsUser(id,user_id,room_id);
			ajaxResult.success("查询成功",roomsUser);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteRoomsUser")
	public String  deleteRoomsUser(HttpServletRequest request, HttpServletResponse response){

		String  id= request.getParameter("id");
		String  user_id= request.getParameter("user_id");
		String  room_id= request.getParameter("room_id");

		try {
			roomsUserService.deleteRoomsUser(id,user_id,room_id);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveRoomsUser", method = RequestMethod.POST)
    public String saveRoomsUser(HttpServletRequest request, HttpServletResponse response, RoomsUser roomsUser) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomsUser.setCreated_by(userLogin.getUser_id());
			roomsUser.setLast_updated_by(userLogin.getUser_id());
			roomsUserService.saveRoomsUser(roomsUser);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("updateRoomsUser")
    public String updateRoomsUser(HttpServletRequest request, HttpServletResponse response,RoomsUser roomsUser) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomsUser.setLast_updated_by(userLogin.getUser_id());
			roomsUserService.updateRoomsUser(roomsUser);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}