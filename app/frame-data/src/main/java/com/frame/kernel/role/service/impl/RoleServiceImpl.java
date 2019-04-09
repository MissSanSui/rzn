package com.frame.kernel.role.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.frame.kernel.menu.dao.MenuDao;
import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.menu.model.State;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.role.dao.RoleDao;
import com.frame.kernel.role.model.Role;
import com.frame.kernel.role.service.RoleService;
import com.frame.kernel.util.CommonUtils;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleDao dao;
	
	@Autowired
    private MenuDao menuDao;

	@Override
	public List<Role> getRoleList(int offsetInt, int limitInt, String sortName, String sortOrder, String role_name,
			String role_type,String enable_flag) throws Exception {
		return dao.getRoleList(offsetInt, limitInt, sortName, sortOrder, role_name, role_type,enable_flag);
	}

	@Override
	public int getRoleCount(String role_name, String role_type,String enable_flag) throws Exception {
		return dao.getRoleCount(role_name, role_type, enable_flag);
	}
	
	@Override
	public Role roleCodeValid(String roleCode) throws Exception {
		// TODO Auto-generated method stub
		return dao.roleCodeValid(roleCode);
	}
	
	@Override
	public Role roleNameValid(String roleName) throws Exception {
		return dao.roleNameValid(roleName);
	}

	@Override
	public int saveRole(Role role) throws Exception {
		if(role.getRole_id()>0){
			return  dao.updateRole(role);
		}else{
			return dao.saveRole(role);
		}
	}

	@Override
	public int rolesEnable(List<String> ids, int userId) throws Exception{
		return dao.rolesEnable(ids,userId);
	}
	
	
	@Override
	public int rolesDisable(List<String> ids, int userId) throws Exception {
		return dao.rolesDisable(ids,userId);
	}
	
    /**
     * 根据菜单ID查询菜单
     * @param menuId
     * @return
     */
	private Menu findByMenuId(int menuId) throws Exception{
		return menuDao.findByMenuId(menuId);
	}
	
	/**
	 * 查询当前菜单ID对应的子菜单
	 * @param parentMenuId
	 * @return
	 */
	private List<Menu> findByParentMenuId(int parentMenuId)throws Exception {
		return menuDao.findByParentMenuId(parentMenuId);
	}

	@Override
	public List<TreeNode> getMenuTreeNodeByRole(int rootId, int roleId) throws Exception {
		List<TreeNode> menuNodes = new ArrayList<TreeNode>();
        List<TreeNode> mainMenu = new ArrayList<TreeNode>();
        mainMenu  = getMenuTreeChild(rootId,roleId); 
        Menu root = findByMenuId(rootId);
        TreeNode rootNode = new TreeNode();
        int id = root.getMenu_id(); // id
        String text = root.getMenu_name(); // 名称
        rootNode.setId(id + "");
        rootNode.setText(text);
        rootNode.setNodes(mainMenu);
        State state = new State();
        rootNode.setState(state);
        menuNodes.add(rootNode);
        return menuNodes;
	}
	
	public List<TreeNode> getMenuTreeChild(int menuId,int roleId) throws Exception{
		List<TreeNode> menuNodes = null;
		int count = 0;
		List<Menu> menuList = findByParentMenuId(menuId);
		if (!CollectionUtils.isEmpty(menuList)) {
			menuNodes = new ArrayList<TreeNode>();
			for (Menu menu : menuList) {
				TreeNode node = new TreeNode();
				int id = menu.getMenu_id(); // id
				String text = menu.getMenu_name(); // 名称
				node.setId(id + "");
				node.setText(text);
				count = hasRoleMenuMappping(roleId,menu.getMenu_id());
				State state = new State();
				if(count > 0){
					state.setChecked(true);
				}
				node.setState(state);
				List<TreeNode> sonNodes = getMenuTreeChild(id,roleId); // 有儿子就递归
				node.setNodes(sonNodes); // 添加儿子
				menuNodes.add(node);
			}
		}
		return menuNodes;
	}
	
	/**
	 * 查询菜单ID和角色ID是否具有映射关系
	 * @param roleId
	 * @param menuId
	 * @return
	 * @throws Exception
	 */
	public int hasRoleMenuMappping(int roleId,int menuId) throws Exception{
		return dao.hasRoleMenuMappping(roleId,menuId);
	}

	/**
	 * 保存角色和菜单的映射
	 */

	@Override
	public void saveRoleMenuMapping(String menuIds, int roleId, int userId) throws Exception {
		dao.delRoleMenuMapping(roleId);
		if(!CommonUtils.isNull(menuIds)){
			String[] menus = menuIds.split(",");
			for(int i=0;i<menus.length;i++){
				dao.saveRoleMenuMapping(menus[i],roleId,userId);
			}
		}
		
	}

	

}
