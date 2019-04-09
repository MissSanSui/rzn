package com.frame.kernel.menu.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.menu.model.MenuNode;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.user.model.User;

public interface MenuService {

    /**
     * Creator: Johnny Wang<br>
     * Create date: 2017-2-4 22:58:51<br>
     * Description: 根据父菜单id查询其所有子菜单,SQL中默认enable_flag为Y.
     * 
     * @param parentMenuId
     *            父菜单id
     * @return List<Menu> 该父菜单下所有子菜单
     */
    public List<Menu> findByParentMenuId(int parentMenuId);
    public List<MenuNode> getMainMenu(int rootMenuId);
    /**
     * Creator: Johnny Wang<br>
     * Create date: 2017-2-4 23:00:50<br>
     * Description: 根据菜单id查询主菜单
     * 
     * @param rootMenuId
     *            根菜单id
     * @return List<MenuNode> 主菜单
     */
    public List<MenuNode> getMenuTree(int rootMenuId);
    
    public List<TreeNode> getMenuTreeNode(int rootMenuId);

    public Menu findByMenuId(int menuId);

	public List<Menu> getPagList(int offsetInt, int limitInt, String sortName, String sortOrder, String menu_name,
                                 String parent_id, String enable_flag);

    public int findMenuPagCount(String menu_name, String parent_id);
    public int findMenuSameName(String menu_name, String parent_id);
    public void saveMenuInfo(Menu menu) throws Exception;
	public void updateMenu(Menu menu);
	public void disableMenu(List<String> ids);
	public void ableMenu(List<String> ids);

}
