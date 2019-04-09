package com.frame.kernel.user.model;

import com.alibaba.fastjson.annotation.JSONField;
import com.frame.kernel.base.model.impl.BaseModelImpl;
import com.frame.kernel.util.CommonUtils;
import org.apache.commons.lang3.StringUtils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class User extends BaseModelImpl {
    private static final long serialVersionUID = 1L;
    private String role_name;
    private String sex;
    private String work_space;
    private String bank_name;
    private String bank_branch_name;
    private String bank_account;
    private byte[] photo;
    private StringBuffer photo_str;

    private int user_id;
    private String flag;
    private String user_name;
    private String password;
    private String emp_number;
    private String emp_name;
    private String english_name;
    private String id_card;
    private Date birth;
    private String birth_temp;
    private String email;
    private String telephone;
    private String mobile;
    private String alternate_contact;
    private String alternate_contact_mobile;
    private int org_id;
    private String company_name;
    private int dept_id;
    private String dept_name;
    private int supervisor;
    private String supervisor_name;
    private String job;
    private String user_status;
    private String attribute1;
    private String attribute2;
    private String attribute3;
    private String attribute4;
    private String attribute5;
    private String role;
    private String province;
    private String city;
    private String address;
    private String interests;
    private String good;
    private String isLive;

    private Timestamp created_date;
    private int created_by;
    private Timestamp last_updated_date;
    private int last_updated_by;


    /*
     * 分页相关参数
     */
    private int page_start;
    private int page_end;

    public User() {
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getWork_space() {
        return work_space;
    }

    public void setWork_space(String work_space) {
        this.work_space = work_space;
    }

    public String getBank_name() {
        return bank_name;
    }

    public void setBank_name(String bank_name) {
        this.bank_name = bank_name;
    }

    public String getBank_branch_name() {
        return bank_branch_name;
    }

    public void setBank_branch_name(String bank_branch_name) {
        this.bank_branch_name = bank_branch_name;
    }

    public String getBank_account() {
        return bank_account;
    }

    public void setBank_account(String bank_account) {
        this.bank_account = bank_account;
    }

    @JSONField(serialize = false)
    public byte[] getPhoto() {
        return photo;
    }

    @JSONField(deserialize = false)
    public void setPhoto(byte[] photo) {

        this.photo = photo;
        if (!CommonUtils.isEmpty(photo)) {
            this.photo_str = new StringBuffer().append(new String(photo));
        }
    }

    public StringBuffer getPhoto_str() {
        return photo_str;
    }

    public void setPhoto_str(StringBuffer photo_str) {
        if (!StringUtils.isEmpty(photo_str)) {
            this.photo_str = photo_str;
        }

    }

    public String getRole_name() {
        return role_name;
    }


    public void setRole_name(String role_name) {
        this.role_name = role_name;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmp_number() {
        return emp_number;
    }

    public void setEmp_number(String emp_number) {
        this.emp_number = emp_number;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public String getEnglish_name() {
        return english_name;
    }

    public void setEnglish_name(String english_name) {
        this.english_name = english_name;
    }

    public String getId_card() {
        return id_card;
    }

    public void setId_card(String id_card) {
        this.id_card = id_card;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        if (!StringUtils.isEmpty(this.birth_temp)) {
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                this.birth = sf.parse(this.birth_temp);
            } catch (Exception e) {
                this.birth = birth;
            }
        } else {
            this.birth = birth;
        }

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBirth_temp() {
        return birth_temp;
    }

    public void setBirth_temp(String birth_temp) {
        if (!StringUtils.isEmpty(birth_temp)) {
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                this.birth = sf.parse(birth_temp);
            } catch (Exception e) {
                this.birth = birth;
            }
        } else {
            this.birth = birth;
        }

        this.birth_temp = birth_temp;
    }

    public String getAlternate_contact() {
        return alternate_contact;
    }

    public void setAlternate_contact(String alternate_contact) {
        this.alternate_contact = alternate_contact;
    }

    public String getAlternate_contact_mobile() {
        return alternate_contact_mobile;
    }

    public void setAlternate_contact_mobile(String alternate_contact_mobile) {
        this.alternate_contact_mobile = alternate_contact_mobile;
    }

    public int getOrg_id() {
        return org_id;
    }

    public void setOrg_id(int org_id) {
        this.org_id = org_id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public int getDept_id() {
        return dept_id;
    }

    public void setDept_id(int dept_id) {
        this.dept_id = dept_id;
    }

    public String getDept_name() {
        return dept_name;
    }

    public void setDept_name(String dept_name) {
        this.dept_name = dept_name;
    }

    public int getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(int supervisor) {
        this.supervisor = supervisor;
    }

    public String getSupervisor_name() {
        return supervisor_name;
    }

    public void setSupervisor_name(String supervisor_name) {
        this.supervisor_name = supervisor_name;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getUser_status() {
        return user_status;
    }

    public void setUser_status(String user_status) {
        this.user_status = user_status;
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

    public int getPage_start() {
        return page_start;
    }

    public void setPage_start(int page_start) {
        this.page_start = page_start;
    }

    public int getPage_end() {
        return page_end;
    }

    public void setPage_end(int page_end) {
        this.page_end = page_end;
    }

    public String getIsLive() {
        return isLive;
    }

    public void setIsLive(String isLive) {
        this.isLive = isLive;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getGood() {
        return good;
    }

    public void setGood(String good) {
        this.good = good;
    }
}
