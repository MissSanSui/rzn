package com.frame.kernel.org.model;

import java.sql.Timestamp;

import com.frame.kernel.base.model.impl.BaseModelImpl;

public class Org extends BaseModelImpl {

	private static final long serialVersionUID = 1L;

	private int org_id;

	private String org_code;

	private String org_name;

	private String org_desc;

	private int display_order;

	private int porg_id;

	private String company_flag;
	private String company_flag_display;

	private String enable_flag;
	private String enable_flag_display;

	private String attribute1;

	private String attribute2;

	private String attribute3;

	private String attribute4;

	private String attribute5;

	private Timestamp created_date;

	private int created_by;
	private String created_by_name;

	private Timestamp last_updated_date;

	private int last_updated_by;

	public int getOrg_id() {
		return org_id;
	}

	public void setOrg_id(int org_id) {
		this.org_id = org_id;
	}

	public String getOrg_code() {
		return org_code;
	}

	public void setOrg_code(String org_code) {
		this.org_code = org_code;
	}

	public String getOrg_name() {
		return org_name;
	}

	public void setOrg_name(String org_name) {
		this.org_name = org_name;
	}

	public String getOrg_desc() {
		return org_desc;
	}

	public void setOrg_desc(String org_desc) {
		this.org_desc = org_desc;
	}

	public int getDisplay_order() {
		return display_order;
	}

	public void setDisplay_order(int display_order) {
		this.display_order = display_order;
	}

	public int getPorg_id() {
		return porg_id;
	}

	public void setPorg_id(int porg_id) {
		this.porg_id = porg_id;
	}

	public String getCompany_flag() {
		return company_flag;
	}

	public void setCompany_flag(String company_flag) {
		this.company_flag = company_flag;
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

	public String getCompany_flag_display() {
		return company_flag_display;
	}

	public void setCompany_flag_display(String company_flag_display) {
		this.company_flag_display = company_flag_display;
	}

	public String getEnable_flag_display() {
		return enable_flag_display;
	}

	public void setEnable_flag_display(String enable_flag_display) {
		this.enable_flag_display = enable_flag_display;
	}

	public String getCreated_by_name() {
		return created_by_name;
	}

	public void setCreated_by_name(String created_by_name) {
		this.created_by_name = created_by_name;
	}

}
