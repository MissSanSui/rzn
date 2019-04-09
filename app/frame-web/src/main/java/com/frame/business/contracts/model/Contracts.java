package com.frame.business.contracts.model;

import com.frame.kernel.base.model.impl.BaseModelImpl;

import java.sql.Timestamp;

public class Contracts extends BaseModelImpl {
    private static final long serialVersionUID = 1L;
    private int contract_no;
    private int contract_stu;
    private String emp_name_fus;
    private String  contract_room_no;
    private double contract_amount;
    private double contract_hour;
    private double contract_rest_hour;
    private String attribute1;
    private String attribute2;
    private String attribute3;
    private String attribute4;
    private String attribute5;
    private Timestamp created_date;
    private int created_by;
    private Timestamp last_updated_date;
    private int last_updated_by;

    public int getLast_updated_by() {
        return last_updated_by;
    }

    public void setLast_updated_by(int last_updated_by) {
        this.last_updated_by = last_updated_by;
    }

    public int getContract_no() {
        return contract_no;
    }

    public void setContract_no(int contract_no) {
        this.contract_no = contract_no;
    }

    public String getEmp_name_fus() {
        return emp_name_fus;
    }

    public void setEmp_name_fus(String emp_name_fus) {
        this.emp_name_fus = emp_name_fus;
    }

    public String getContract_room_no() {
        return contract_room_no;
    }

    public void setContract_room_no(String contract_room_no) {
        this.contract_room_no = contract_room_no;
    }

    public int getContract_stu() {
        return contract_stu;
    }

    public void setContract_stu(int contract_stu) {
        this.contract_stu = contract_stu;
    }

    public double getContract_amount() {
        return contract_amount;
    }

    public void setContract_amount(double contract_amount) {
        this.contract_amount = contract_amount;
    }

    public double getContract_hour() {
        return contract_hour;
    }

    public void setContract_hour(double contract_hour) {
        this.contract_hour = contract_hour;
    }

    public double getContract_rest_hour() {
        return contract_rest_hour;
    }

    public void setContract_rest_hour(double contract_rest_hour) {
        this.contract_rest_hour = contract_rest_hour;
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
}
