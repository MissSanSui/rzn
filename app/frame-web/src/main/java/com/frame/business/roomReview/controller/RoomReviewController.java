package com.frame.business.roomReview.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.roomReview.model.RoomReview;
import com.frame.business.roomReview.service.RoomReviewService;
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
@RequestMapping("/roomReview")
public class RoomReviewController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private RoomReviewService roomReviewService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("roomReviewList")
	public String  roomReviewList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String review_id  = request.getParameter("review_id");
		String review_white_id = request.getParameter("review_white_id");
		String review_stu = request.getParameter("review_stu");
		String review_stu_name = request.getParameter("review_stu_name");
		String review_tea =request.getParameter("review_tea");
		String review_tea_name =request.getParameter("review_tea_name");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<RoomReview> list = new ArrayList<RoomReview>();
		int total = 0;
		try {
			list = roomReviewService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"emp_name_tea":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, review_id,review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
			total = roomReviewService.findCount( review_id,review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findRoomReviewByNo")
	public String  findRoomReviewByNo(HttpServletRequest request, HttpServletResponse response){

		String  review_id= request.getParameter("review_id");
		String  review_white_id= request.getParameter("review_white_id");
		String review_stu = request.getParameter("review_stu");
		String review_stu_name = request.getParameter("review_stu_name");
		String review_tea =request.getParameter("review_stu");
		String review_tea_name =request.getParameter("review_tea_name");
		try {
			RoomReview roomReview = roomReviewService.findRoomReview(review_id,review_white_id,review_stu,review_stu_name,review_tea,review_tea_name);
			ajaxResult.success("查询成功",roomReview);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteRoomReviewByNo")
	public String  deleteRoomReviewByNo(HttpServletRequest request, HttpServletResponse response){

		String  review_id= request.getParameter("review_id");

		try {
			if(StringUtils.isEmpty(review_id) || "null".toLowerCase().equals(review_id.toLowerCase())){
				throw new Exception("review_id 不能为空！");
			}
			roomReviewService.deleteRoomReview(review_id);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveRoomReview", method = RequestMethod.POST)
    public String saveRoomReview(HttpServletRequest request, HttpServletResponse response, RoomReview roomReview) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomReview.setCreated_by(userLogin.getUser_id());
			roomReview.setLast_updated_by(userLogin.getUser_id());
			roomReviewService.saveRoomReview(roomReview);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("UpdateRoomReviewInfo")
    public String UpdateRoomReviewInfo(HttpServletRequest request, HttpServletResponse response,RoomReview roomReview) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			roomReview.setLast_updated_by(userLogin.getUser_id());
			roomReviewService.updateRoomReview(roomReview);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }

}