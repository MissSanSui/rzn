package com.frame.kernel.user.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.common.Constants;
import com.frame.kernel.common.DICConstants;
import com.frame.kernel.dic.model.DictionaryItem;
import com.frame.kernel.dic.util.DicUtil;
import com.frame.kernel.org.model.Org;
import com.frame.kernel.org.service.OrgService;
import com.frame.kernel.user.model.User;
import com.frame.kernel.user.model.UserOrg;
import com.frame.kernel.user.model.UserUpdate;
import com.frame.kernel.user.service.UserService;
import com.frame.kernel.util.CommonUtils;
import com.frame.kernel.util.Md5Utill;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/user")
public class UserController {
    
	@Autowired
	private UserService userService;
	@Autowired
	private OrgService orgService;
//	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("userList")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mv = new ModelAndView("user/userList");//指定视图
		Org org = orgService.findByOrgId(0, "Y");
		
		String org_id = request.getParameter("org_id");
		if(!StringUtils.isEmpty(org_id)){
			Org or =  orgService.findByOrgId(Integer.parseInt(org_id), "Y");
			mv.addObject("org_name", or.getOrg_name());
		}
		 mv.addObject("initOrg", org);
		 mv.addObject("org_id", org_id);
		
		return mv;
	}
	@ResponseBody
	@RequestMapping("userEdit")
	public ModelAndView userEdit(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mv = new ModelAndView("user/userEdit");//指定视图
		String type = request.getParameter("type");
		String user_id = request.getParameter("user_id");
		String org_id = request.getParameter("uEFOrg_id");
		String org_name = request.getParameter("uEForg_name");
		try {
			if(StringUtils.isEmpty(org_id)){
				throw new Exception("获取组织信息失败。");
			}
			User user =  new User();
			Org org = orgService.findByOrgId(Integer.parseInt(org_id), "Y");
			if(!CommonUtils.isEmpty(type) && "update".equals(type) ){
				 user = userService.findUserById(user_id,org_id);
			}else{
				//如果新增则获取顶层组织
				user.setCompany_name(org.getOrg_name());
			}
			if("new".equals(type)){
				user.setUser_id(-1);
			}
			user.setDept_name(org_name);
			mv.addObject("initOrg", org);
			mv.addObject("type", type);
			mv.addObject("org_name", org_name);
			mv.addObject("org_id", org_id);
			if(StringUtils.isEmpty(user.getBirth_temp())&&!CommonUtils.isEmpty(user.getBirth())){
				SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
				user.setBirth_temp(sf.format(user.getBirth()));
			}

			mv.addObject("updateUser", user);


			List<DictionaryItem> sexList = DicUtil.getDictionaryItem(DICConstants.SEX);
			List<DictionaryItem> YNLis = DicUtil.getDictionaryItem(DICConstants.YES_NO);

			mv.addObject("sexList", sexList);
			mv.addObject("YNLis", YNLis);
		} catch (Exception e) {
			mv = new ModelAndView("404");//指定视图
			e.printStackTrace();
		}
		return mv;
	}
	@ResponseBody
	@RequestMapping("userView")
	public ModelAndView userView(HttpServletRequest request, HttpServletResponse response){
		ModelAndView mv = new ModelAndView("user/userView");//指定视图
		String user_id = request.getParameter("user_id");
		String org_id = request.getParameter("org_id");
		try {
			if(StringUtils.isEmpty(org_id)){
				throw new Exception("获取组织信息失败。");
			}
			User user =  new User();
			Org org = orgService.findByOrgId(Integer.parseInt(org_id), "Y");
			user = userService.findUserById(user_id,org_id);
			
			mv.addObject("initOrg", org);
			mv.addObject("type", "update");
			mv.addObject("org_id", org_id);
			if(StringUtils.isEmpty(user.getBirth_temp())&&!CommonUtils.isEmpty(user.getBirth())){
				SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
				user.setBirth_temp(sf.format(user.getBirth()));
			}
			mv.addObject("updateUser", user);
			List<DictionaryItem> sexList = DicUtil.getDictionaryItem(DICConstants.SEX);
			List<DictionaryItem> YNLis = DicUtil.getDictionaryItem(DICConstants.YES_NO);

			mv.addObject("sexList", sexList);
			mv.addObject("YNLis", YNLis);
		} catch (Exception e) {
			mv = new ModelAndView("404");//指定视图
			e.printStackTrace();
		}
		return mv;
	}
	@ResponseBody
	@RequestMapping("userEditView")
	public String userEditView(HttpServletRequest request, HttpServletResponse response){
		String user_id = request.getParameter("user_id");
		JSONObject json = new JSONObject();
		try {
			List<UserOrg> UOList = userService.getUserOrgMapping(null,user_id);
			if(CommonUtils.isEmpty(UOList) ||UOList.size()<1){
				throw new Exception("用户不存在有效组织。");
			}
			User user =  new User();
			user = userService.findUserById(user_id,UOList.get(0).getOrg_id()+"");
			json.put(Constants.DATA, user);
			json.put(Constants.FLAG, Constants.FLAG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
		return json.toJSONString();
	}
	@ResponseBody
	@RequestMapping("userPageList")
	public String  userPageList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		try {
			String OrgId =  request.getParameter("org_id");
			/*
			查询用户需要知道orgID如果orgID为空着返回空列表
			 */
			if(StringUtils.isEmpty(OrgId)){
				js.put("total", 0);
				js.put("rows", new ArrayList<User>());
				return js.toJSONString();
			}
			String sortName = request.getParameter("sortName");
			String sortOrder = request.getParameter("sortOrder");
			String offset = request.getParameter("offset");
			String limit = request.getParameter("limit");
			String emp_name = request.getParameter("emp_name");
			String email = request.getParameter("email"); 
			String telphone =request.getParameter("telphone");  
			String user_status =request.getParameter("user_status");  
			String choose_user_type =request.getParameter("choose_user_type");
			String user_id =request.getParameter("user_id");
			String type =request.getParameter("type");
			/*if(CommonUtils.isEmpty(user_status)){
				user_status = BIZConstants.USER_STATUES_OPEN;
			}*/
			int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
			int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
			List<User> list = new ArrayList<User>();
			list = userService.getList( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"emp_name":sortName, CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, emp_name,email,telphone,user_status,OrgId,choose_user_type,user_id,type);
			int total = userService.findUserCount(emp_name,email,telphone,user_status,OrgId,choose_user_type,user_id,type);
			 js.put("total", total);
			 js.put("rows", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
        return js.toJSONString();
	}
	
	@ResponseBody
	@RequestMapping("saveUserInfo")
    public String saveUserInfo(HttpServletRequest request, HttpServletResponse response, User user) {
		JSONObject json = new JSONObject();
		try {
			String OrgId =  request.getParameter("org_id");
			int userId = (int) request.getSession().getAttribute("currentUserId");
			String newpassWords =  Md5Utill.getMD5(BIZConstants.INIT_PASSWOD);
			if(CommonUtils.isEmpty(user.getPassword())){
				user.setPassword(newpassWords);
			}else{
				String pw = Md5Utill.getMD5(BIZConstants.INIT_PASSWOD);
				user.setPassword(pw);
			}
			user.setUser_status(BIZConstants.USER_STATUES_OPEN);
			user.setLast_updated_date(new Timestamp(new Date().getTime()));
			user.setCreated_date(new Timestamp(new Date().getTime()));
			userService.saveUserInfo(user, userId, OrgId);
			json.put(Constants.DATA, OrgId);
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
	@RequestMapping("UpdateUserInfo")
    public String UpdateUserInfo(HttpServletRequest request, HttpServletResponse response, User user) {
		JSONObject json = new JSONObject();
		try {
			String OrgId =  request.getParameter("org_id");
			String choose_user_type =  request.getParameter("choose_user_type");
			String editType =  request.getParameter("editType");
			int userId = (int) request.getSession().getAttribute("currentUserId");
			if("choose_old_user".equals(choose_user_type) && !"update".equals(editType)){
				if(StringUtils.isEmpty(OrgId)){
					throw  new Exception("获取用户组织信息失败。");
				}
				UserOrg uo = new UserOrg();
				uo.setOrg_id(Integer.parseInt(OrgId));
				uo.setUser_id(user.getUser_id());
				uo.setCreated_by(userId);
				uo.setLast_updated_by(userId);
			}else{
				user.setLast_updated_date(new Timestamp(new Date().getTime()));
				userService.updateUser(user);
			}

			json.put(Constants.DATA, OrgId);
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
	@RequestMapping(value="disableUser", method=RequestMethod.POST, consumes="application/json") 
    public String disableUser(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String>ids) {
		JSONObject json = new JSONObject();
		try {
			
			List<User> userList = userService.findUserByRolesDetail(ids.toArray(new String[ids.size()]));
			List<User>  userListFilter = userList.stream().filter(u -> "系统管理员".equals(u.getRole_name()) ).collect(Collectors.toList());
			if(!userListFilter.isEmpty() && userListFilter.size()>0){
				String sysUserNames  = "" ;
				for(User o:userListFilter){
					sysUserNames = sysUserNames+o.getUser_name()+",";
				}
				
				json.put(Constants.FLAG, Constants.FLAG_FAIL);
				json.put(Constants.MSG, "不能终止系统管理员用户："+ sysUserNames.substring(0,(sysUserNames.length()-1)));
			}else{
				userService.disableUser(ids);
				json.put(Constants.FLAG, Constants.FLAG_SUC);
				json.put(Constants.MSG, Constants.MSG_SUC);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
        return json.toJSONString();
    }
	@ResponseBody
	@RequestMapping(value="ableUser", method=RequestMethod.POST, consumes="application/json") 
    public String ableUser(HttpServletRequest request, HttpServletResponse response, @RequestBody List<String>ids) {
		JSONObject json = new JSONObject();
		try {
			userService.ableUser(ids);
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
	@RequestMapping(value="validateUserName")
	public String validateUserName(HttpServletRequest request, HttpServletResponse response) {
		JSONObject js = new JSONObject();
		// oldname='+oldName+"&menu_id="+mid;
		String userName = request.getParameter("user_name");
		String oldName = request.getParameter("oldName");
		try {
			String falg = "Y";
			if (!CommonUtils.isEmpty(oldName) && !CommonUtils.isEmpty(userName)
					&& userName.equals(userName)) {
				falg = "N";
			}
			switch (falg) {
			case "N":
				js.put(Constants.VALID, Constants.FLAG_TRUE);
				break;
			case "Y":
				int total = userService.findUserSameName(userName);
				if (total == 0) {
					js.put(Constants.VALID, Constants.FLAG_TRUE);
				} else {
					js.put(Constants.VALID, Constants.FLAG_FALSE);
				}
				break;
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			js.put(Constants.FLAG, Constants.FLAG_FAIL);
			js.put(Constants.MSG, e.getMessage());
		}
        return js.toJSONString();
    }

	
	@ResponseBody
	@RequestMapping("UpdateUserInfoIndex")
    public String UpdateUserInfoIndex(HttpServletRequest request, HttpServletResponse response, UserUpdate userUpdate) {
		JSONObject json = new JSONObject();
		try {
			int user_id = (int) request.getSession().getAttribute("currentUserId");
			/*
			 * 获取登录人信息
			 */
			List<UserOrg> UOList = userService.getUserOrgMapping(null,user_id+"");
			if(CommonUtils.isEmpty(UOList) ||UOList.size()<1){
				throw new Exception("用户不存在有效组织。");
			}

			User user = userService.findUserById(userUpdate.getUser_id()+"",UOList.get(0).getOrg_id()+"");
			String editPsFlag= "N";
			if(!StringUtils.isEmpty(userUpdate.getEditNewPassword())&&!StringUtils.isEmpty(userUpdate.getEditOldPassword()) ){
				String ps = Md5Utill.getMD5(userUpdate.getEditOldPassword());
				String ops = user.getPassword();
				if(!ps.equals(ops)){
					json.put(Constants.FLAG, Constants.FLAG_FAIL);
					json.put(Constants.MSG, "原密码输入错误，请重新输入！");
					return json.toJSONString();
				}else{
					user.setPassword(Md5Utill.getMD5(userUpdate.getEditNewPassword()));
					editPsFlag = "Y";				}
			}
			user.setEmp_name(userUpdate.getEditEmpName());
			if(!StringUtils.isEmpty(userUpdate.getEditEmpEgName())){
				user.setEnglish_name(userUpdate.getEditEmpEgName());
			}
			user.setTelphone(userUpdate.getEditTel());
			user.setEmail(userUpdate.getEditEmail());
			user.setMobile(userUpdate.getEditMobile());
			user.setLast_updated_date(new Timestamp(new Date().getTime()));
			user.setLast_updated_by(user_id);
			userService.updateUserHasPs(user);
			if("Y".equals(editPsFlag)){
				json.put(Constants.FLAG, "3");
			}else{
				json.put(Constants.FLAG, Constants.FLAG_SUC);
			}
			
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
        return json.toJSONString();
    }
	@ResponseBody
	@RequestMapping("initUserPassword")
    public String initUserPassword(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			/*
			 * 获取登录人信息
			 */
			int user_id = (int) request.getSession().getAttribute("currentUserId");
			String editUserId = request.getParameter("editUserId");
			String org_id = request.getParameter("org_id");
			User user = userService.findUserById(editUserId,org_id);
			user.setPassword(Md5Utill.getMD5(BIZConstants.INIT_PASSWOD));
			user.setLast_updated_by(user_id);
			user.setLast_updated_date(new Timestamp(new Date().getTime()));
			userService.updateUserHasPs(user);
			if( Integer.toString(user_id).equals(editUserId)){
				json.put(Constants.FLAG, "3");
			}else{
				json.put(Constants.FLAG, Constants.FLAG_SUC);
			}
			json.put(Constants.MSG, Constants.MSG_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			json.put(Constants.FLAG, Constants.FLAG_FAIL);
			json.put(Constants.MSG, e.getMessage());
		}
        return json.toJSONString();
	}
	
	/**
	 * 该方法用于公共查询人员组件
	 * @author wangsen 2017.11.26
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("commonUserPageList")
	public String  commonUserPageList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();
		int user_id = (int) request.getSession().getAttribute("currentUserId");
		try {
			String sortName = request.getParameter("sortName");
			String sortOrder = request.getParameter("sortOrder");
			String offset = request.getParameter("offset");
			String limit = request.getParameter("limit");
			String emp_name = request.getParameter("emp_name_q");
			String role_code = request.getParameter("role_code_q"); 
			int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
			int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
			List<User> list = new ArrayList<User>();
			list = userService.commonUserPageList( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"emp_name":sortName, CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, emp_name,role_code,user_id);
			int total = userService.commonUserPageCount(emp_name,role_code,user_id);
			 js.put("total", total);
			 js.put("rows", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
        return js.toJSONString();
	}
}