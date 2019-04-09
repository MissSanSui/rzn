package com.frame.kernel.role.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.common.Constants;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.role.model.Role;
import com.frame.kernel.role.service.RoleService;
import com.frame.kernel.util.CommonUtils;

@Controller
@RequestMapping("/role")
public class RoleController {
	@Autowired
	private RoleService roleService;
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 跳转角色管理首页
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/index")
	public ModelAndView index(){
		ModelAndView mv = new ModelAndView("role/roleList");//指定视图
		return mv;
	}
	
	/**
	 * 查询角色列表
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/roleList")
	public String rolePageList(HttpServletRequest request, HttpServletResponse response){
		logger.debug(">>> RoleController.rolePageList start");
		JSONObject js = new JSONObject();
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String role_name = request.getParameter("q_roleName");
		String role_type = request.getParameter("q_roleType");
		String enable_flag = request.getParameter("enable_flag");
		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		int total = 0;
		List<Role> list = new ArrayList<Role>();
		try {
			list = roleService.getRoleList( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"role_id":sortName, CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, role_name,role_type,enable_flag);
			total = roleService.getRoleCount(role_name,role_type,enable_flag);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.debug("<<< RoleController.rolePageList end");
        return js.toJSONString();
	}
	
	/**
	 * 校验角色名称是否重复
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/roleNameValid")
	public String roleNameValid(HttpServletRequest request, HttpServletResponse response){
		logger.debug(">>> RoleController.roleNameValid start");
		JSONObject js = new JSONObject();
		String roleName = request.getParameter("role_name_a");
		String roleId = request.getParameter("role_id");
		try {
			Role role = roleService.roleNameValid(roleName);
			if(CommonUtils.isNull(roleId) || "0".equals(roleId)){
				if(role==null){
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				}else{
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
			}else{
				if(role ==null || Integer.valueOf(roleId)==role.getRole_id()){
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				}else{
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
			}
		} catch (Exception e) {
			js.put(Constants.VALID, Constants.FLAG_FALSE);
			e.printStackTrace();
		}
		logger.debug("<<< RoleController.roleNameValid end");
        return js.toJSONString();
	}
	
	/**
	 * 校验角色code是否重复
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/roleCodeValid")
	public String roleCodeValid(HttpServletRequest request, HttpServletResponse response){
		logger.debug(">>> RoleController.roleCodeValid start");
		JSONObject js = new JSONObject();
		String roleCode = request.getParameter("role_code_a");
		String roleId = request.getParameter("role_id");
		try {
			Role role = roleService.roleCodeValid(roleCode);
			if(CommonUtils.isNull(roleId) || "0".equals(roleId)){
				if(role==null){
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				}else{
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
			}else{
				if(role ==null || Integer.valueOf(roleId)==role.getRole_id()){
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				}else{
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
			}
		} catch (Exception e) {
			js.put(Constants.VALID, Constants.FLAG_FALSE);
			e.printStackTrace();
		}
		logger.debug("<<< RoleController.roleCodeValid end");
        return js.toJSONString();
	}
	
	/**
	 * 保存角色信息
	 * @param session
	 * @param role
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/saveRole")
	public String saveRole(HttpSession session,Role role){
		logger.debug(">>> RoleController.saveRole start");
		JSONObject js = new JSONObject();
		String msg = "";
		String flag = "S";
		int effectRow = 0;
		Timestamp date = new Timestamp(new Date().getTime());
		int userId = 0;//(Integer)session.getAttribute("currentUserId");
		try{
			if(role.getRole_id()>0){
				role.setLast_updated_by(userId);
				role.setLast_updated_date(date);
			}else{
				role.setCreated_by(userId);
				role.setCreated_date(date);
				role.setLast_updated_by(userId);
				role.setLast_updated_date(date);
			}
			effectRow = roleService.saveRole(role);
			
			if(effectRow != 1){
				flag = "E";
				msg = "数据保存失败，请稍后继续！";
			}
		}catch(Exception e){
			e.printStackTrace();
			flag = "E";
			msg = e.getMessage();
		}
		if("E".equalsIgnoreCase(flag)){
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, msg);
		}else{
			js.put(Constants.FLAG, Constants.FLAG_SUC);
			js.put(Constants.MSG, Constants.MSG_SUC);
		}
		
		logger.debug("<<< RoleController.saveRole end");
		return js.toJSONString();
	}
	
	/**
	 * 启用角色
	 * @param ids
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/rolesEnable")
	public String rolesEnable( @RequestBody List<String>ids){
		logger.debug("<<< RoleController.rolesEnable start");
		JSONObject json = new JSONObject();
		int userId = 0;//(Integer)session.getAttribute("currentUserId");
		if (ids!=null && ids.size()>0){
			try{
				roleService.rolesEnable(ids,userId);
				json.put(Constants.FLAG, Constants.FLAG_SUC);
				json.put(Constants.MSG, Constants.MSG_SUC);
				
			}catch(Exception e){
				e.printStackTrace();
				json.put(Constants.FLAG, Constants.FLAG_FAIL);
				json.put(Constants.MSG, e.getMessage());
			}
		}else{
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, "没有需要启用的数据!");
		}
		logger.debug("<<< RoleController.rolesEnable end");
		return json.toString();
	}
	
	/**
	 * 批量禁用角色
	 * @param ids
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/rolesDisable")
	public String rolesDisable( @RequestBody List<String>ids){
		logger.debug("<<< RoleController.rolesDisable start");
		JSONObject json = new JSONObject();
		int userId = 0;//(Integer)session.getAttribute("currentUserId");
		if (ids!=null && ids.size()>0){
			try{
				roleService.rolesDisable(ids,userId);
				json.put(Constants.FLAG, Constants.FLAG_SUC);
				json.put(Constants.MSG, Constants.MSG_SUC);
				
			}catch(Exception e){
				e.printStackTrace();
				json.put(Constants.FLAG, Constants.FLAG_FAIL);
				json.put(Constants.MSG, e.getMessage());
			}
		}else{
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, "没哟需要启用的数据!");
		}
		logger.debug("<<< RoleController.rolesDisable end");
		return json.toString();
	}
	
	/**
	 * 角色菜单分配页面查询菜单列表
	 * @param request
	 * @param response
	 * @param roleId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getMenuTreeNodeByRole")
	public String getMenuTreeNodeByRole(HttpServletRequest request, HttpServletResponse response ,int roleId) {
		logger.debug("<<< RoleController.getMenuTreeNodeByRole start");
		JSONObject js = new JSONObject();
		try {
			List<TreeNode> mainMenu = roleService.getMenuTreeNodeByRole(BIZConstants.MENU_LIST_NODE_ID,roleId);
			js.put(Constants.DATA, mainMenu);
			js.put(Constants.FLAG, Constants.FLAG_SUC);
			js.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
		}
		logger.debug("<<< RoleController.getMenuTreeNodeByRole end");
		return js.toJSONString();
	}
	
	/**
	 * 保存角色和菜单的映射
	 * @param menuIds
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/saveRoleMenuMapping")
	public String saveRoleMenuMapping( HttpServletRequest request,int roleId,String menuIds){
		logger.debug("<<< RoleController.saveRoleMenuMapping start");
		JSONObject json = new JSONObject();
		int userId = 0;//(Integer)session.getAttribute("currentUserId");
		try{
			roleService.saveRoleMenuMapping(menuIds,roleId,userId);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
			json.put(Constants.MSG, Constants.MSG_SUC);
			
		}catch(Exception e){
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		logger.debug("<<< RoleController.saveRoleMenuMapping end");
		return json.toString();
	}

}
