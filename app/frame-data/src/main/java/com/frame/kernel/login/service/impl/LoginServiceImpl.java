package com.frame.kernel.login.service.impl;

import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.login.dao.LoginDao;
import com.frame.kernel.login.service.LoginService;
import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.menu.model.MenuNode;
import com.frame.kernel.user.model.User;
import com.frame.kernel.util.CommonUtils;
import com.frame.kernel.util.Md5Utill;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 登录
	 */
	@Override
	public String login(HttpSession session,String userName,String password) {
		logger.debug(">>>LoginServiceImpl login start");
		String result = "S";
		String md5str = Md5Utill.getMD5(password);
		String pwd = null;
		if(CommonUtils.isNull(md5str)){
			result = "密码输入错误！";
		}else{
			User user = loginDao.getUserByUserName(userName);
			if (user!=null){
				pwd = user.getPassword();
				if(CommonUtils.isNull(pwd) || !pwd.equals(md5str)){
					result = "用户名密码不匹配!";
				}else{
					//设置系统全局变量
					session.setAttribute("currentUserId", user.getUser_id());
					session.setAttribute("currentUserName", user.getUser_name());
					session.setAttribute("currentEnglishName", user.getEnglish_name());
					session.setAttribute("currentEmpName", user.getEmp_name());
					session.setAttribute("currentEmpEmail", user.getEmail());
					session.setAttribute("currentEmpTelphone", user.getTelphone());
					session.setAttribute("currentEmpMobile", user.getMobile());
					
					//设置当前用户登录菜单
					List<MenuNode> mainMenu = getMenuNodeByUserId(user.getUser_id(), BIZConstants.MENU_LIST_NODE_ID);
					session.setAttribute("mainMenu", mainMenu);
				}
			}else{
				result = "请输入合法用户!";
			}
		}
		logger.debug("<<<LoginServiceImpl login end");
		return result;
	}
	
	/**
	 * 根据当前用户查询可用的菜单树集合
	 * @param userId
	 * @param rootMenuId
	 * @return
	 */
	@Override
	public List<MenuNode> getMenuNodeByUserId(int userId, int rootMenuId) {
		
		List<MenuNode> menuNodes = new ArrayList<MenuNode>();
        List<Menu> menuList = findByParentMenuId(userId,rootMenuId);
        if (!CollectionUtils.isEmpty(menuList)) {
            for (Menu menu : menuList) {
            	MenuNode node = new MenuNode();
                node.setMenu_id(menu.getMenu_id());
                node.setMenu_name(menu.getMenu_name());
                node.setUrl(menu.getUrl());
                node.setDisplay_order(menu.getDisplay_order());
                node.setChildren(getMenuNodeByUserId(userId,menu.getMenu_id()));
                menuNodes.add(node);
            }
        }
        return menuNodes;
	}
	
	/**
	 * 根据用户id和菜单ID查询种子菜单
	 * @param userId
	 * @param rootMenuId
	 * @return
	 */
	private List<Menu> findByParentMenuId(int userId, int rootMenuId) {
		return loginDao.findByParentMenuId(userId,rootMenuId);
	}

	
	
	

}
