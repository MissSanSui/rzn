package com.frame.kernel.menu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.menu.model.Menu;

public interface MenuDao {

    /**
     * Creator: Johnny Wang<br>
     * Create date: 2017-2-4 23:05:21<br>
     * Description: 根据父菜单id查询其所有子菜单,SQL中默认enable_flag为Y.
     * 
     * @param pMenuId
     *            父菜单id
     * @return List<Menu> 该父菜单下所有子菜单
     */
    public List<Menu> findByParentMenuId(int pMenuId);

	public Menu findByMenuId(int menuId);

	public List<Menu> getPagList(@Param("offset") int offset, @Param("limit") int limit, @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("menu_name") String menu_name,
								 @Param("pmenu_id") String parent_id, @Param("enable_flag") String enable_flag);

	public int findMenuPagCount(@Param("menu_name") String menu_name, @Param("pmenu_id") String parent_id);
	public int findMenuSameName(@Param("menu_name") String menu_name, @Param("pmenu_id") String parent_id);
	public void saveMenu(Menu menu);
	public void updateMenu(Menu menu);
	public void disableMenu(@Param("ids") List<String> ids);
	public void ableMenu(@Param("ids") List<String> ids);
	
}
