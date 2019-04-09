package com.frame.kernel.role.service;

import java.util.List;

import com.frame.kernel.common.Constants;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.role.model.Role;

public interface RoleService {
	
	/**
	 * 查询角色列表
	 * @param offsetInt
	 * @param limitInt
	 * @param sortName
	 * @param sortOrder
	 * @param role_name
	 * @param role_type
	 * @return
	 * @throws Exception
	 */
	public List<Role> getRoleList(int offsetInt, int limitInt, String sortName, String sortOrder, String role_name, String role_type, String enable_flag) throws Exception;
	
	/**
	 * 角色个数
	 * @param role_name
	 * @param role_type
	 * @return
	 * @throws Exception
	 */
	public int getRoleCount(String role_name, String role_type, String enable_flag) throws Exception;
	
	/**
	 * 校验角色是否存在
	 * @param roleName
	 * @return
	 * @throws Exception
	 */
	public Role roleNameValid(String roleName) throws Exception;
	
	/**
	 * 校验角色代码是否存在
	 * @param roleName
	 * @return
	 * @throws Exception
	 */
	public Role roleCodeValid(String roleCode) throws Exception;
	
	/**
	 * 保存角色
	 * @param role
	 * @return
	 * @throws Exception
	 */
	public int saveRole(Role role) throws Exception;

	/**
	 * 批量启用角色
	 * @param ids
	 * @param userId 
	 */
	public int rolesEnable(List<String> ids, int userId)throws Exception;

	/**
	 * 批量禁用角色
	 * @param ids
	 * @param userId 
	 * @return
	 */
	public int rolesDisable(List<String> ids, int userId) throws Exception;

	/**
	 * 角色菜单分配页面菜单树
	 * @param menuListNodeId
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	public List<TreeNode> getMenuTreeNodeByRole(int rootId, int roleId) throws Exception;
	
	/**
	 * 保存角色与菜单的映射关系
	 * @param ids
	 * @param userId
	 * @param userId 
	 * @throws Exception
	 */
	public void saveRoleMenuMapping(String menuIds, int roleId, int userId) throws Exception;

	

	
	
	
}
