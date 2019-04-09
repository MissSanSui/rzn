package com.frame.kernel.user.model;

import com.frame.kernel.base.model.impl.BaseModelImpl;

public class UserUpdate  extends BaseModelImpl{
	private static final long serialVersionUID = 1L;
	private int user_id;
	private String user_name;
	private String editEmpName;
	private String editEmpEgName;
	private String editEmail;
	private String editTel;
	private String editMobile;
	private String editOldPassword;
	private String editNewPassword;
	private String editConNewPassword;
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getEditEmpName() {
		return editEmpName;
	}
	public void setEditEmpName(String editEmpName) {
		this.editEmpName = editEmpName;
	}
	public String getEditEmpEgName() {
		return editEmpEgName;
	}
	public void setEditEmpEgName(String editEmpEgName) {
		this.editEmpEgName = editEmpEgName;
	}
	public String getEditEmail() {
		return editEmail;
	}
	public void setEditEmail(String editEmail) {
		this.editEmail = editEmail;
	}
	public String getEditTel() {
		return editTel;
	}
	public void setEditTel(String editTel) {
		this.editTel = editTel;
	}
	public String getEditMobile() {
		return editMobile;
	}
	public void setEditMobile(String editMobile) {
		this.editMobile = editMobile;
	}
	public String getEditOldPassword() {
		return editOldPassword;
	}
	public void setEditOldPassword(String editOldPassword) {
		this.editOldPassword = editOldPassword;
	}
	public String getEditNewPassword() {
		return editNewPassword;
	}
	public void setEditNewPassword(String editNewPassword) {
		this.editNewPassword = editNewPassword;
	}
	public String getEditConNewPassword() {
		return editConNewPassword;
	}
	public void setEditConNewPassword(String editConNewPassword) {
		this.editConNewPassword = editConNewPassword;
	}

}
