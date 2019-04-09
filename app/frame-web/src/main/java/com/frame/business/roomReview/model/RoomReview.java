package com.frame.business.roomReview.model;

import com.frame.business.roomReviewCoursewares.model.RoomReviewCoursewares;
import com.frame.kernel.base.model.impl.BaseModelImpl;

import java.sql.Timestamp;
import java.util.List;

public class RoomReview extends BaseModelImpl {
    private static final long serialVersionUID = 1L;
    private int review_id;
    private int review_white_id;
    private int review_stu;
    private int review_tea;
    private String emp_name_stu;
    private String emp_name_tea;
    private String review_content;
    private String roomReviewCoursewares;

    private List<RoomReviewCoursewares> roomReviewCoursewaresList;

    private String attribute1;
    private String attribute2;
    private String attribute3;
    private String attribute4;
    private String attribute5;
    private Timestamp created_date;
    private int created_by;
    private Timestamp last_updated_date;
    private int last_updated_by;

    public int getReview_id() {
        return review_id;
    }

    public void setReview_id(int review_id) {
        this.review_id = review_id;
    }

    public int getReview_white_id() {
        return review_white_id;
    }

    public void setReview_white_id(int review_white_id) {
        this.review_white_id = review_white_id;
    }

    public int getReview_stu() {
        return review_stu;
    }

    public void setReview_stu(int review_stu) {
        this.review_stu = review_stu;
    }

    public int getReview_tea() {
        return review_tea;
    }

    public void setReview_tea(int review_tea) {
        this.review_tea = review_tea;
    }

    public String getEmp_name_stu() {
        return emp_name_stu;
    }

    public void setEmp_name_stu(String emp_name_stu) {
        this.emp_name_stu = emp_name_stu;
    }

    public String getEmp_name_tea() {
        return emp_name_tea;
    }

    public void setEmp_name_tea(String emp_name_tea) {
        this.emp_name_tea = emp_name_tea;
    }

    public String getReview_content() {
        return review_content;
    }

    public void setReview_content(String review_content) {
        this.review_content = review_content;
    }

    public String getRoomReviewCoursewares() {
        return roomReviewCoursewares;
    }

    public void setRoomReviewCoursewares(String roomReviewCoursewares) {
        this.roomReviewCoursewares = roomReviewCoursewares;
    }

    public List<RoomReviewCoursewares> getRoomReviewCoursewaresList() {
        return roomReviewCoursewaresList;
    }

    public void setRoomReviewCoursewaresList(List<RoomReviewCoursewares> roomReviewCoursewaresList) {
        this.roomReviewCoursewaresList = roomReviewCoursewaresList;
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
