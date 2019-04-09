package com.frame.kernel.dic.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.Constants;
import com.frame.kernel.dic.model.Dictionary;
import com.frame.kernel.dic.service.DictionaryService;
import com.frame.kernel.menu.service.MenuService;
import com.frame.kernel.util.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/dictionary")
public class DictionaryController {

	@Autowired
	private DictionaryService dictionaryService;

	@Autowired
	private MenuService menuSvc;

	private Logger logger = LoggerFactory.getLogger(getClass());

	@ResponseBody
	@RequestMapping("dictionary_list")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("dictionary/dictionary_list");// 指定视图
		return mv;
	}

	@ResponseBody
	@RequestMapping("dictionaryPageList")
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
		String dic_code = request.getParameter("dic_code");
		String dic_name = request.getParameter("dic_name");

		List<Dictionary> list = new ArrayList<Dictionary>();
		int total = 0;
		try {
			list = dictionaryService.getDictionaryList(dic_code, dic_name,sortName ,sortOrder,startInt, limitInt);
			total = dictionaryService.getDictionaryListCount(dic_code, dic_name);
		} catch (Exception e) {

			e.printStackTrace();
		}

		js.put("total", total);
		js.put("rows", list);

		System.out.println("JSON:" + js.toJSONString());

		return js.toJSONString();
	}

	@ResponseBody
	@RequestMapping("saveDictionaryInfo")
	public String saveDictionaryInfo(HttpServletRequest request, HttpServletResponse response, Dictionary dictionary) {
		
		int userId = (int) request.getSession().getAttribute("currentUserId");
		JSONObject js = new JSONObject();
		boolean flag;
		try {
			if (dictionary.getDic_id() != 0) {
				dictionary.setLast_updated_by(userId);
				dictionary.setLast_updated_date(new Timestamp(new Date().getTime()));
				flag = dictionaryService.updateDictionaryInfo(dictionary);
			} else {
				dictionary.setCreated_by(userId);
				dictionary.setCreated_date(new Timestamp(new Date().getTime()));
				flag = dictionaryService.saveDictionaryInfo(dictionary);
			}
			if (flag) {
				js.put(Constants.FLAG, Constants.FLAG_SUC);
				js.put(Constants.MSG, Constants.MSG_SUC);
			} else {
				js.put(Constants.FLAG, Constants.FLAG_FAIL);
				js.put(Constants.MSG, Constants.MSG_FAIL);
			}
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
			e.printStackTrace();
		}
		return js.toString();
	}
	
	@ResponseBody
	@RequestMapping("dictionaryValid")
	public String dictionaryValid(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();
		boolean flag;
		String dic_id = request.getParameter("dic_id");
		String dic_code_a = request.getParameter("dic_code_a");
		try {
			int count = dictionaryService.dictionaryValid(dic_code_a);
			if(count == 0 ){
				js.put(Constants.VALID, Constants.FLAG_TRUE);
			}else if(count == 1){
				int counta = dictionaryService.dictionaryValidById(dic_id,dic_code_a);
				if(counta == 1){
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				}else{
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
			}
		} catch (Exception e) {
			js.put(Constants.VALID, Constants.FLAG_FALSE);
			e.printStackTrace();
		}	
		return js.toString();
	}
}
