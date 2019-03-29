package com.frame.kernel.org.controller;

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
import com.frame.kernel.org.model.Org;
import com.frame.kernel.org.model.OrgTreeNode;
import com.frame.kernel.org.service.OrgService;

@Controller
@RequestMapping("/org")
public class OrgController {

	@Autowired
	private OrgService orgSvc;

	@ResponseBody
	@RequestMapping("list")
	public ModelAndView orgList(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("org/org_list"); // 指定视图
		return mv;
	}

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 23:51:09<br>
	 * Description: 根据父组织id查询其所有子组织,SQL中默认enable_flag为Y.
	 *
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getOrgNodeTree")
	public String getOrgNodeTree(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			OrgTreeNode orgTree = orgSvc.getNodeTree(BIZConstants.TOP_ORG_ID);
			data.put("orgTree", orgTree);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping("getOrgList")
	public String getOrgList(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			String offset = request.getParameter("offset"); // 起始行
			String limit = request.getParameter("limit"); // 每页容量
			String sortName = request.getParameter("sortName"); // 排序依据
			String sortOrder = request.getParameter("sortOrder"); // 升序降序
			String parentId = request.getParameter("parentId"); // 父节点id
			String orgName = request.getParameter("orgName"); // 组织名称

			int offsetInt = StringUtils.isEmpty(offset) ? Constants.PAGE_OFFSET : Integer.parseInt(offset);
			int limitInt = StringUtils.isEmpty(limit) ? Constants.PAGE_LIMIT : Integer.parseInt(limit);
			sortName = StringUtils.isEmpty(sortName) ? Constants.SORT_NAME : sortName;
			sortOrder = StringUtils.isEmpty(sortOrder) ? Constants.SORT_ORDER : sortOrder;
			parentId = StringUtils.isEmpty(parentId) ? BIZConstants.ROOT_ORG_ID + "" : parentId;

			List<Org> orgList = orgSvc.getPageList(offsetInt, limitInt, sortName, sortOrder, parentId, orgName);
			int count = orgSvc.getPageCount(parentId, orgName);

			json.put("rows", orgList);
			json.put("total", count);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping("saveOrg")
	public String saveOrg(HttpServletRequest request, HttpServletResponse response, Org org) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			orgSvc.saveOrg(org);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping("updateOrg")
	public String updateOrg(HttpServletRequest request, HttpServletResponse response, Org org) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			orgSvc.updateOrg(org);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "enableOrg", method = RequestMethod.POST, consumes = "application/json")
	public String enableOrg(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String> ids) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			orgSvc.enableOrg(ids);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "disableOrg", method = RequestMethod.POST, consumes = "application/json")
	public String disableOrg(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String> ids) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			orgSvc.disableOrg(ids);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "checkEnable")
	public String checkEnable(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			String pOrgId = request.getParameter("pOrgId"); // 起始行
			String checkResult = orgSvc.checkEnable(Integer.parseInt(pOrgId));

			if (!"0".equals(checkResult)) {
				flag = checkResult;
				msg = Constants.MSG_FAIL;
			}
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	@ResponseBody
	@RequestMapping(value = "checkDisable")
	public String checkDisable(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			String orgId = request.getParameter("orgId"); // 起始行
			String checkResult = orgSvc.checkDisable(Integer.parseInt(orgId));

			if (!"0".equals(checkResult)) {
				flag = checkResult;
				msg = Constants.MSG_FAIL;
			}
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

	/**
	 * 2017-2-12 03:20:23
	 *
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("validateExistence")
	public String validateExistence(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		JSONObject data = new JSONObject();
		String flag = Constants.FLAG_SUC;
		String msg = Constants.MSG_SUC;
		try {
			String parent_id = request.getParameter("parent_id");
			String org_code = request.getParameter("org_code");
			String org_name = request.getParameter("org_name");

			int count = 0;
			if (!StringUtils.isEmpty(org_code) || !StringUtils.isEmpty(org_name)) {
				count = orgSvc.validateExistence(parent_id, org_code, org_name);
			}

			boolean validateResult = count == 0 ? Constants.FLAG_TRUE : Constants.FLAG_FALSE;
			json.put(Constants.VALID, validateResult);
		} catch (Exception e) {
			e.printStackTrace();
			flag = Constants.FLAG_FAIL;
			msg = e.toString();
		} finally {
			json.put(Constants.DATA, data);
			json.put(Constants.FLAG, flag);
			json.put(Constants.MSG, msg);
		}
		return json.toJSONString();
	}

}