package com.frame.business.rooms.model;

import com.frame.kernel.base.model.impl.BaseModelImpl;

import java.sql.Timestamp;

public class Rooms extends BaseModelImpl {
    private static final long serialVersionUID = 1L;
    private String room_no;
    private String room_owner;
    private String white_id;
    private String video_id;
    private String room_grade;
    private String room_course;
    private String room_password;
    private String room_introduce;
    private String room_background;
    private String room_start;
    private String attribute1;
    private String attribute2;
    private String attribute3;
    private String attribute4;
    private String attribute5;
    private Timestamp created_date;
    private int created_by;
    private Timestamp last_updated_date;
    private int last_updated_by;

    public String getRoom_no() {
        return room_no;
    }

    public void setRoom_no(String room_no) {
        this.room_no = room_no;
    }

    public String getRoom_owner() {
        return room_owner;
    }

    public void setRoom_owner(String room_owner) {
        this.room_owner = room_owner;
    }

    public String getWhite_id() {
        return white_id;
    }

    public void setWhite_id(String white_id) {
        this.white_id = white_id;
    }

    public String getVideo_id() {
        return video_id;
    }

    public void setVideo_id(String video_id) {
        this.video_id = video_id;
    }

    public String getRoom_grade() {
        return room_grade;
    }

    public void setRoom_grade(String room_grade) {
        this.room_grade = room_grade;
    }

    public String getRoom_course() {
        return room_course;
    }

    public void setRoom_course(String room_course) {
        this.room_course = room_course;
    }

    public String getRoom_password() {
        return room_password;
    }

    public void setRoom_password(String room_password) {
        this.room_password = room_password;
    }

    public String getRoom_introduce() {
        return room_introduce;
    }

    public void setRoom_introduce(String room_introduce) {
        this.room_introduce = room_introduce;
    }

    public String getRoom_background() {
        return room_background;
    }

    public void setRoom_background(String room_background) {
        this.room_background = room_background;
    }

    public String getRoom_start() {
        return room_start;
    }

    public void setRoom_start(String room_start) {
        this.room_start = room_start;
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
