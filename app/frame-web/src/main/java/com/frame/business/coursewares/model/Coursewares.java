package com.frame.business.coursewares.model;

import com.frame.kernel.base.model.impl.BaseModelImpl;

import java.sql.Timestamp;

public class Coursewares extends BaseModelImpl {
    private static final long serialVersionUID = 1L;
    private String coursewares_no;
    private String coursewares_tea;
    private String coursewares_content;
    private String coursewares_images;
    private String attribute1;
    private String attribute2;
    private String attribute3;
    private String attribute4;
    private String attribute5;
    private Timestamp created_date;
    private int created_by;
    private Timestamp last_updated_date;
    private int last_updated_by;

    public String getCoursewares_no() {
        return coursewares_no;
    }

    public void setCoursewares_no(String coursewares_no) {
        this.coursewares_no = coursewares_no;
    }

    public String getCoursewares_tea() {
        return coursewares_tea;
    }

    public void setCoursewares_tea(String coursewares_tea) {
        this.coursewares_tea = coursewares_tea;
    }

    public String getCoursewares_content() {
        return coursewares_content;
    }

    public void setCoursewares_content(String coursewares_content) {
        this.coursewares_content = coursewares_content;
    }

    public String getCoursewares_images() {
        return coursewares_images;
    }

    public void setCoursewares_images(String coursewares_images) {
        this.coursewares_images = coursewares_images;
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
