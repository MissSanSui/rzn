package com.frame.kernel.menu.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.frame.kernel.menu.dao.MenuDao;
import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.menu.model.MenuNode;
import com.frame.kernel.menu.model.State;
import com.frame.kernel.menu.model.TreeNode;
import com.frame.kernel.menu.service.MenuService;
import com.frame.kernel.util.CommonUtils;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuDao menuDao;

    
    @Override
    public List<MenuNode> getMainMenu(int rootMenuId) {
        List<MenuNode> mainMenu = menuNodeRecursion(rootMenuId);
        return mainMenu;
    }
    
	@Override
	public List<Menu> findByParentMenuId(int parentMenuId) {
		return menuDao.findByParentMenuId(parentMenuId);
	}

	@Override
	public Menu findByMenuId(int menuId) {
		return menuDao.findByMenuId(menuId);
	}
	@Override
	public List<MenuNode> getMenuTree(int rootMenuId) {
		List<MenuNode> menuNodes = new ArrayList<MenuNode>();
		List<Menu> menuList = findByParentMenuId(rootMenuId);
		if (!CollectionUtils.isEmpty(menuList)) {
			for (Menu menu : menuList) {
				MenuNode node = new MenuNode();
				int menuId = menu.getMenu_id(); // 菜单id
				String menuName = menu.getMenu_name(); // 菜单名称
				String url = menu.getUrl(); // 菜单路径
				int displayOrder = menu.getDisplay_order(); // 序号
				node.setMenu_id(menuId);
				node.setMenu_name(menuName);
				node.setUrl(url);
				node.setDisplay_order(displayOrder);
				List<MenuNode> sonNodes = getMenuTree(menuId); // 有儿子就递归
				node.setChildren(sonNodes); // 添加儿子
				menuNodes.add(node);
			}
		}
		return menuNodes;
	}


    /**
     * Creator: Johnny Wang<br>
     * Create date: 2017-2-5 01:42:09<br>
     * Description: 菜单树查询的递归方法
     * 
     * @param rootMenuId
     * @return
     */
    public List<MenuNode> menuNodeRecursion(int rootMenuId) {
        List<MenuNode> menuNodes = new ArrayList<MenuNode>();
        List<Menu> menuList = findByParentMenuId(rootMenuId);
        if (!CollectionUtils.isEmpty(menuList)) {
            for (Menu menu : menuList) {
                MenuNode node = buildMenuNode(menu, menuNodeRecursion(menu.getMenu_id()));
                menuNodes.add(node);
            }
        }
        return menuNodes;
    }
    /**
     * Creator: Johnny Wang<br>
     * Create date: 2017-2-5 00:29:22<br>
     * Description: 根据菜单和子节点构造一个树节点,该节点是给主菜单用的.
     * 
     * @param org
     * @param sonNodes
     * @return OrgTreeNode
     */
    private MenuNode buildMenuNode(Menu menu, List<MenuNode> sonNodes) {
        MenuNode node = new MenuNode();
        node.setMenu_id(menu.getMenu_id());
        node.setMenu_name(menu.getMenu_name());
        node.setUrl(menu.getUrl());
        node.setDisplay_order(menu.getDisplay_order());
        node.setChildren(sonNodes);
        return node;
    }

    @Override
    public List<TreeNode> getMenuTreeNode(int rootMenuId) {
        List<TreeNode> menuNodes = new ArrayList<TreeNode>();
        List<TreeNode> mainMenu = new ArrayList<TreeNode>();
        mainMenu  = getMenuTreeChild(rootMenuId); 
        Menu root = findByMenuId(rootMenuId);
        TreeNode rootNode = new TreeNode();
        int id = root.getMenu_id(); // id
        String text = root.getMenu_name(); // 名称
        rootNode.setId(id + "");
        rootNode.setText(text);
        State state = new State();
        rootNode.setState(state);
        rootNode.setNodes(mainMenu);
        menuNodes.add(rootNode);
        return menuNodes;
    }
    
    public List<TreeNode> getMenuTreeChild(int rootMenuId) {
		List<TreeNode> menuNodes = null;
		List<Menu> menuList = findByParentMenuId(rootMenuId);
		if (!CollectionUtils.isEmpty(menuList)) {
			menuNodes = new ArrayList<TreeNode>();
			for (Menu menu : menuList) {
				TreeNode node = new TreeNode();
				int id = menu.getMenu_id(); // id
				String text = menu.getMenu_name(); // 名称
				node.setId(id + "");
				node.setText(text);
				State state = new State();
				node.setState(state);
				List<TreeNode> sonNodes = getMenuTreeChild(id); // 有儿子就递归
				node.setNodes(sonNodes); // 添加儿子
				menuNodes.add(node);
			}
		}
		return menuNodes;
	}
   
    @Override
	public List<Menu> getPagList(int offsetInt, int limitInt, String sortName, String sortOrder, String menu_name,
			String parent_id,String enable_flag) {
		return menuDao.getPagList(offsetInt, limitInt, sortName, sortOrder, menu_name, parent_id,enable_flag);
	}

    @Override
    public int findMenuPagCount(String menu_name, String parent_id) {
        return menuDao.findMenuPagCount(menu_name, parent_id);
    }
    @Override
    public int findMenuSameName(String menu_name, String parent_id) {
    	return menuDao.findMenuSameName(menu_name, parent_id);
    }

	@Override
	public void saveMenuInfo(Menu menu) throws Exception {
		menuDao.saveMenu(menu);
	}

	@Override
	public void updateMenu(Menu menu) {
		menuDao.updateMenu(menu);
		
	}

	@Override
	public void disableMenu(List<String> ids) {
		menuDao.disableMenu(ids);
	}

	@Override
	public void ableMenu(List<String> ids) {
		menuDao.ableMenu(ids);
	}
 

}
