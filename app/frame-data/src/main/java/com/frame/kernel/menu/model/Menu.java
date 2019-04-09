package com.frame.kernel.menu.model;

import java.sql.Timestamp;

import com.frame.kernel.base.model.impl.BaseModelImpl;

public class Menu extends BaseModelImpl {

	private static final long serialVersionUID = 1L;

	private int menu_id;
	
	private String menu_name;
	
	private String menu_desc;
	
	private String url;
	
	private int display_order;
	
	private int pmenu_id;
	
	private String enable_flag;
	
	private String attribute1;
	
	private String attribute2;
	
	private String attribute3;
	
	private String attribute4;
	
	private String attribute5;
	
	private Timestamp created_date;
	
	private int created_by;
	
	private Timestamp last_updated_date;
	
	private int last_updated_by;

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

	public String getMenu_desc() {
		return menu_desc;
	}

	public void setMenu_desc(String menu_desc) {
		this.menu_desc = menu_desc;
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

	public int getPmenu_id() {
		return pmenu_id;
	}

	public void setPmenu_id(int pmenu_id) {
		this.pmenu_id = pmenu_id;
	}

	public String getEnable_flag() {
		return enable_flag;
	}

	public void setEnable_flag(String enable_flag) {
		this.enable_flag = enable_flag;
	}

	public String getAttribute1() {
		return attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

	public String getAttribute2() {
		return attribute2;
	}

	public void setAttribute2(String attribute2) {
		this.attribute2 = attribute2;
	}

	public String getAttribute3() {
		return attribute3;
	}

	public void setAttribute3(String attribute3) {
		this.attribute3 = attribute3;
	}

	public String getAttribute4() {
		return attribute4;
	}

	public void setAttribute4(String attribute4) {
		this.attribute4 = attribute4;
	}

	public String getAttribute5() {
		return attribute5;
	}

	public void setAttribute5(String attribute5) {
		this.attribute5 = attribute5;
	}

	public Timestamp getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Timestamp created_date) {
		this.created_date = created_date;
	}

	public int getCreated_by() {
		return created_by;
	}

	public void setCreated_by(int created_by) {
		this.created_by = created_by;
	}

	public Timestamp getLast_updated_date() {
		return last_updated_date;
	}

	public void setLast_updated_date(Timestamp last_updated_date) {
		this.last_updated_date = last_updated_date;
	}

	public int getLast_updated_by() {
		return last_updated_by;
	}

	public void setLast_updated_by(int last_updated_by) {
		this.last_updated_by = last_updated_by;
	}

}
