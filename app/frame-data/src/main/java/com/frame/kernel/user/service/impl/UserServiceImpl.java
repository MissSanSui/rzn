package com.frame.kernel.user.service.impl;

import com.frame.kernel.user.dao.UserDao;
import com.frame.kernel.user.model.User;
import com.frame.kernel.user.model.UserOrg;
import com.frame.kernel.user.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getList(int limit, int offset, String sortName, String sortOrder, String emp_name, String email, String telphone, String user_status, String org_id, String choose_user_type, String user_id, String type) throws Exception {
        if (!StringUtils.isEmpty(org_id) && Integer.parseInt(org_id) == 0) {
            org_id = null;
        }
        return userDao.getList(limit, offset, sortName, sortOrder, emp_name, email, telphone, user_status, org_id, choose_user_type, user_id, type);
    }

    @Override
    public void saveUser(User user) throws Exception {
        userDao.saveUser(user);
    }

    @Override
    public void updateUser(User user) throws Exception {
        userDao.updateUser(user);
    }

    @Override
    public void updateUserHasPs(User user) throws Exception {
        userDao.updateUserHasPs(user);
    }

    @Override
    public int findUserCount(String emp_name, String email, String telphone, String user_status, String org_id, String choose_user_type, String user_id, String type) throws Exception {
        if (!StringUtils.isEmpty(org_id) && Integer.parseInt(org_id) == 0) {
            org_id = null;
        }
        return userDao.findUserCount(emp_name, email, telphone, user_status, org_id, choose_user_type, user_id, type);
    }

    @Override
    public void disableUser(List<String> ids) throws Exception {
        userDao.disableUser(ids);
    }

    @Override
    public void ableUser(List<String> ids) throws Exception {
        userDao.ableUser(ids);
    }

    @Override
    public int findUserSameName(String userName) throws Exception {
        return userDao.findUserSameName(userName);
    }

    @Override
    public User findUserById(String user_id, String org_id) throws Exception {
        return userDao.findUserById(user_id, org_id);
    }

    @Override
    public User findUserInfoById(String user_id) throws Exception {
        return userDao.findUserInfoById(user_id);
    }




    @Override
    public List<UserOrg> getUserOrgMapping(String org_id, String user_id) throws Exception {
        return userDao.getUserOrgMapping(org_id, user_id);
    }

    @Override
    public List<User> findUserByRoles(String[] roleIds) throws Exception {
        return null;
    }

    @Override
    public List<User> findUserByRolesDetail(String[] user_id) throws Exception {
        return null;
    }


    @Override
    public void saveUserInfo(User user, int currencyUserId, String OrgId) throws Exception {
        if (StringUtils.isEmpty(OrgId)) {
            throw new RuntimeException("获取组织信息出错。");
        }
        saveUser(user);
        UserOrg uo = new UserOrg();
        uo.setUser_id(user.getUser_id());
        uo.setOrg_id(Integer.parseInt(OrgId));
        uo.setCreated_by(currencyUserId);
        uo.setLast_updated_by(currencyUserId);


    }

    @Override
    public List<User> commonUserPageList(int offset, int limit, String sortName, String sortOrder, String emp_name,
                                         String role_code, int user_id) throws Exception {
        // TODO Auto-generated method stub
        return userDao.commonUserPageList(offset, limit, sortName, sortOrder, emp_name, role_code, user_id);
    }

    @Override
    public int commonUserPageCount(String emp_name, String role_code, int user_id) throws Exception {
        // TODO Auto-generated method stub
        return userDao.commonUserPageCount(emp_name, role_code, user_id);
    }

    @Override
    public List<User> findUserByRoleCode(String groupId) throws Exception {
        return userDao.findUserByRoleCode(groupId);
    }



    @Override
    public void updateSelfInfo(User user) throws Exception {
        userDao.updateSelfInfo(user);
    }

    @Override
    public User queryUserByName(String userName) {
        return userDao.queryUserByName(userName);
    }

    @Override
    public Set<String> queryRolesByName(String userName) {
        return userDao.queryRolesByName(userName);
    }
}
