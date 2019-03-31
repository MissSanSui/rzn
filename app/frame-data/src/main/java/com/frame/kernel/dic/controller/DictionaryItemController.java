package com.frame.kernel.dic.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.common.Constants;
import com.frame.kernel.dic.model.Dictionary;
import com.frame.kernel.dic.model.DictionaryItem;
import com.frame.kernel.dic.service.DictionaryItemService;
import com.frame.kernel.dic.service.DictionaryService;
import com.frame.kernel.menu.service.MenuService;
import com.frame.kernel.util.CommonUtils;

@Controller
@RequestMapping("/dictionaryItem")
public class DictionaryItemController {
	@Autowired
	private DictionaryItemService dictionaryItemService;

	@Autowired
	private MenuService menuSvc;
	
	@Autowired
	private DictionaryService dictionaryService;

	private Logger logger = LoggerFactory.getLogger(getClass());

	@ResponseBody
	@RequestMapping("dictionary_item_list")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("dictionary/dictionary_item_list");// 指定视图
		mv.addObject("dic_id", request.getParameter("dic_id"));
		return mv;
	}
	
	@ResponseBody
	@RequestMapping("dictionaryItemPageList")
	public String dictionaryPageList(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		int startInt = Integer.parseInt(CommonUtils.isEmpty(offset) ? "0" : offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit) ? "10" : limit);
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder"); 
		sortName = CommonUtils.isEmpty(sortName)?"dic_code" : sortName;
		sortOrder = CommonUtils.isEmpty(sortOrder)?"asc" : sortOrder;
		String dic_id = request.getParameter("dic_id");
		String dic_code = request.getParameter("dic_code");
		String dic_name = request.getParameter("dic_name");
		String dic_item_code = request.getParameter("dic_item_code");
		String dic_item_name = request.getParameter("dic_item_name");

		List<DictionaryItem> list = new ArrayList<DictionaryItem>();
		int total = 0;
		try {
			if(!CommonUtils.isEmpty(dic_id)){
				Dictionary dic = dictionaryService.getDictionaryByDicId(Integer.parseInt(dic_id));
				dic_code = dic.getDic_code();
				dic_name= dic.getDic_name();
			}
			
			list = dictionaryItemService.getDictionaryItemList(dic_code, dic_name,dic_item_code, dic_item_name,sortName,sortOrder, startInt, limitInt);
			total = dictionaryItemService.getDictionaryItemListCount(dic_code, dic_name, dic_item_code, dic_item_name);
		} catch (Exception e) {

			e.printStackTrace();
		}

		js.put("total", total);
		js.put("rows", list);
		js.put("dic_code", dic_code);
		js.put("dic_name", dic_name);
		js.put("dic_id", dic_id);
		return js.toJSONString();
	}
	
	@ResponseBody
	@RequestMapping("saveDictionaryItemInfo")
	public String saveDictionaryItemInfo(HttpServletRequest request, HttpServletResponse response, DictionaryItem dictionaryItem) {
		int userId = (int) request.getSession().getAttribute("currentUserId");
		JSONObject js = new JSONObject();
		boolean flag;
		try {
			if (dictionaryItem.getDic_item_id() != 0) {
				dictionaryItem.setLast_updated_by(userId);
				dictionaryItem.setLast_updated_date(new Timestamp(new Date().getTime()));
				flag = dictionaryItemService.updateDictionaryItemInfo(dictionaryItem);
			} else {
				dictionaryItem.setCreated_by(userId);
				dictionaryItem.setCreated_date(new Timestamp(new Date().getTime()));
				dictionaryItem.setEnable_flag(BIZConstants.ENABLE_Y);
				flag = dictionaryItemService.saveDictionaryItemInfo(dictionaryItem);
			}
			if (flag) {
				js.put(Constants.FLAG, Constants.FLAG_SUC);
				js.put(Constants.MSG, Constants.MSG_SUC);
			} else {
				js.put(Constants.FLAG, Constants.FLAG_FAIL);
				js.put(Constants.MSG,  Constants.MSG_FAIL);
			}
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
			e.printStackTrace();
		}
		return js.toString();
	}
	
	@ResponseBody
	@RequestMapping(value = "ableDictionaryItem", method = RequestMethod.POST, consumes = "application/json")
	public String ableDictionaryItem(HttpServletRequest request, HttpServletResponse response,  @RequestBody List<String> ids) {
		int userId = (int) request.getSession().getAttribute("currentUserId");
		JSONObject js = new JSONObject();
		boolean flag;
		try {
			flag = dictionaryItemService.ableDictionaryItem(ids,userId,new Timestamp(new Date().getTime()));
			if (flag) {
				js.put(Constants.FLAG, Constants.FLAG_SUC);
				js.put(Constants.MSG, Constants.MSG_SUC);
			} else {
				js.put(Constants.FLAG, Constants.FLAG_FAIL);
				js.put(Constants.MSG,  Constants.MSG_FAIL);
			}
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
			e.printStackTrace();
		}
		return js.toString();
	}
	@ResponseBody
	@RequestMapping(value = "disableDictionaryItem", method = RequestMethod.POST, consumes = "application/json")
	public String disableDictionaryItem(HttpServletRequest request, HttpServletResponse response,  @RequestBody List<String> ids) {
		int userId = (int) request.getSession().getAttribute("currentUserId");
		JSONObject js = new JSONObject();
		boolean flag;
		try {
			flag = dictionaryItemService.disableDictionaryItem(ids,userId,new Timestamp(new Date().getTime()));;
			if (flag) {
				js.put(Constants.FLAG, Constants.FLAG_SUC);
				js.put(Constants.MSG, Constants.MSG_SUC);
			} else {
				js.put(Constants.FLAG, Constants.FLAG_FAIL);
				js.put(Constants.MSG,  Constants.MSG_FAIL);
			}
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
			e.printStackTrace();
		}
		return js.toString();
	}
}
