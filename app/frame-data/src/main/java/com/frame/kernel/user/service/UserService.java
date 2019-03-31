package com.frame.kernel.user.service;

import com.frame.kernel.user.model.User;
import com.frame.kernel.user.model.UserOrg;

import java.util.List;
import java.util.Set;

public interface UserService {
    public List<User> getList(int limit, int offset, String sortName, String sortOrder, String emp_name, String email, String telphone, String user_status, String org_id, String choose_user_type, String user_id, String type) throws Exception;

    public int findUserCount(String emp_name, String email, String telphone, String user_status, String org_id, String choose_user_type, String user_id, String type) throws Exception;

    public void saveUser(User user) throws Exception;

    public void updateUser(User user) throws Exception;

    public void updateUserHasPs(User user) throws Exception;

    public void disableUser(List<String> ids) throws Exception;

    public void ableUser(List<String> ids) throws Exception;

    public int findUserSameName(String userName) throws Exception;

    public User findUserById(String user_id, String org_id) throws Exception;

    public User findUserInfoById(String user_id) throws Exception;


    public List<UserOrg> getUserOrgMapping(String org_id, String user_id) throws Exception;

    public List<User> findUserByRoles(String[] roleIds) throws Exception;

    public List<User> findUserByRolesDetail(String[] user_id) throws Exception;

    public void saveUserInfo(User user, int currencyUserId, String OrgId) throws Exception;

    public List<User> commonUserPageList(int offset, int limit, String sortName, String sortOrder, String emp_name, String role_code, int user_id) throws Exception;

    public int commonUserPageCount(String emp_name, String role_code, int user_id) throws Exception;

    public List<User> findUserByRoleCode(String groupId) throws Exception;


    public void updateSelfInfo(User user) throws Exception;

    public User queryUserByName(String userName);

    public Set<String> queryRolesByName(String userName);

}
