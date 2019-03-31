package com.frame.kernel.menu.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.common.Constants;
import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.menu.service.MenuService;
import com.frame.kernel.util.CommonUtils;

@Controller
@RequestMapping("/menu")
public class MenuController {

	@Autowired
	private MenuService menuService;

	// private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("menuMain")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("menu/menuList");// 指定视图
		return mv;
	}

	@ResponseBody
	@RequestMapping("menuTree")
	public String menuTree(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();
		try {
			List<TreeNode> mainMenu = menuService.getMenuTreeNode(BIZConstants.MENU_LIST_NODE_ID);
			js.put(Constants.DATA, mainMenu);
			js.put(Constants.FLAG, Constants.FLAG_SUC);
			js.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
		}
		return js.toJSONString();
	}

	@ResponseBody
	@RequestMapping("menuPageList")
	public String menuPageList(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();// =&=desc
		try {
			System.out.println(request.getCharacterEncoding());
			String sortName = request.getParameter("sortName");
			String sortOrder = request.getParameter("sortOrder");
			String offset = request.getParameter("offset");
			String limit = request.getParameter("limit");
			String menu_name = request.getParameter("menu_name");
			String parent_id = request.getParameter("parent_id");
			String enable_flag = request.getParameter("enable_flag");
			int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset) ? "0" : offset);
			int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit) ? "10" : limit);
			if (CommonUtils.isEmpty(parent_id)) {
				parent_id = "-1";
			}
			if (CommonUtils.isEmpty(enable_flag)) {
				enable_flag = "Y";
			}
			List<Menu> list = new ArrayList<Menu>();
			list = menuService.getPagList(offsetInt, limitInt,
					CommonUtils.isEmpty(sortName) ? "display_order" : sortName,
					CommonUtils.isEmpty(sortOrder) ? "asc" : sortOrder, menu_name, parent_id, enable_flag);
			int total = menuService.findMenuPagCount(menu_name, parent_id);
			js.put("total", total);
			js.put("rows", list);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return js.toJSONString();
	}

	@ResponseBody
	@RequestMapping("saveMenuInfo")
	public String saveMenuInfo(HttpServletRequest request, HttpServletResponse response, Menu menu) {
		JSONObject json = new JSONObject();
		try {
			menu.setLast_updated_date(new Timestamp(new Date().getTime()));
			menu.setCreated_date(new Timestamp(new Date().getTime()));
			menu.setEnable_flag(BIZConstants.ENABLE_Y);
			menuService.saveMenuInfo(menu);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping("menuNameValid")
	public String menuNameValid(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();
		// oldname='+oldName+"&menu_id="+mid;
		String oldname = request.getParameter("oldname");
		String update_menu_name = request.getParameter("update_menu_name");
		String menu_name = request.getParameter("menu_name");
		if(StringUtils.isEmpty(menu_name)){
			menu_name = update_menu_name;
		}
		String parent_id = request.getParameter("parent_id");
		try {
			String falg = "Y";
			if (!CommonUtils.isEmpty(oldname) && !CommonUtils.isEmpty(update_menu_name)
					&& oldname.equals(update_menu_name)) {
				falg = "N";
			}
			switch (falg) {
			case "N":
				js.put(Constants.VALID, Constants.FLAG_TRUE);
				break;
			case "Y":
				int total = menuService.findMenuSameName(menu_name, parent_id);
				if (total == 0) {
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				} else {
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
				break;
			}

		} catch (Exception e) {
			js.put(Constants.VALID, Constants.FLAG_FALSE);
			e.printStackTrace();
		}
		return js.toString();
	}

	@ResponseBody

	@RequestMapping("UpdateMenuInfo")
	public String UpdateMenuInfo(HttpServletRequest request, HttpServletResponse response, Menu menu) {
		JSONObject json = new JSONObject();
		try {
			menu.setLast_updated_date(new Timestamp(new Date().getTime()));
			menuService.updateMenu(menu);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "disableMenu", method = RequestMethod.POST, consumes = "application/json")
	public String disableMenu(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String> ids) {
		JSONObject json = new JSONObject();
		try {
			menuService.disableMenu(ids);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "ableMenu", method = RequestMethod.POST, consumes = "application/json")
	public String ableMenu(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String> ids) {
		JSONObject json = new JSONObject();
		try {
			menuService.ableMenu(ids);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		return json.toJSONString();
	}
}