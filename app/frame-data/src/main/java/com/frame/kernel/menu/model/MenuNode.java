package com.frame.kernel.menu.model;

import com.frame.kernel.base.model.impl.BaseModelImpl;

import java.util.List;

public class MenuNode  extends BaseModelImpl {
	private static final long serialVersionUID = 1L;
	private int menu_id;

	private String menu_name;

	private String url;

	private int display_order;

	private List<MenuNode> children; // 子节点信息

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}

	public String getMenu_name() {
		return menu_name;
	}

	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getDisplay_order() {
		return display_order;
	}

	public void setDisplay_order(int display_order) {
		this.display_order = display_order;
	}

	public List<MenuNode> getChildren() {
		return children;
	}

	public void setChildren(List<MenuNode> children) {
		this.children = children;
	}

}
