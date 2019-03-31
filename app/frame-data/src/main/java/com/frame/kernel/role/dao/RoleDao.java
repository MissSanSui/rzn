package com.frame.kernel.role.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.role.model.Role;

public interface RoleDao {
	
	public List<Role> getRoleList(@Param("offset") int offset, @Param("limit") int limit, @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("p_role_name") String p_role_name,
								  @Param("p_role_type") String p_role_type, @Param("enable_flag") String enable_flag) throws Exception;
	
	public int getRoleCount(@Param("p_role_name") String p_role_name, @Param("p_role_type") String p_role_type, @Param("enable_flag") String enable_flag) throws Exception;
	
	public Role roleNameValid(@Param("roleName") String roleName)  throws Exception;

	public Role roleCodeValid(@Param("roleCode") String roleCode)  throws Exception;
	
	public int saveRole(Role role) throws Exception;
	
	public int updateRole(Role role) throws Exception;

	public int rolesEnable(@Param("ids") List<String> ids, @Param("userId") int userId) throws Exception;
	
	public int rolesDisable(@Param("ids") List<String> ids, @Param("userId") int userId) throws Exception;

	public int hasRoleMenuMappping(@Param("roleId") int roleId, @Param("menuId") int menuId) throws Exception;

	public void delRoleMenuMapping(@Param("roleId") int roleId) throws Exception;

	public int saveRoleMenuMapping(@Param("menuId") String menuId, @Param("roleId") int roleId, @Param("userId") int userId) throws Exception;

	
}
