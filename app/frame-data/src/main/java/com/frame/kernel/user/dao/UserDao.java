package com.frame.kernel.user.dao;

import com.frame.kernel.user.model.User;
import com.frame.kernel.user.model.UserOrg;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface UserDao {

    public List<User> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                              @Param("user_id") String user_id,
                              @Param("emp_name") String emp_name,
                              @Param("address") String address,
                              @Param("email") String email,
                              @Param("telephone") String telephone,
                              @Param("user_status") String user_status,
                              @Param("english_name") String english_name,
                              @Param("id_card") String id_card,
                              @Param("sex") String sex,
                              @Param("role") String role,
                              @Param("province") String province,
                              @Param("city") String city) throws Exception;

    public int findUserCount( @Param("user_id") String user_id,
                              @Param("emp_name") String emp_name,
                              @Param("address") String address,
                              @Param("email") String email,
                              @Param("telephone") String telephone,
                              @Param("user_status") String user_status,
                              @Param("english_name") String english_name,
                              @Param("id_card") String id_card,
                              @Param("sex") String sex,
                              @Param("role") String role,
                              @Param("province") String province,
                              @Param("city") String city) throws Exception;

    public void saveUser(User user) throws Exception;

    public void updateUser(User user) throws Exception;

    public void updateUserHasPs(User user) throws Exception;

    public void disableUser(@Param("ids") List<String> ids) throws Exception;

    public void ableUser(@Param("ids") List<String> ids) throws Exception;

    public int findUserSameName(@Param("userName") String userName) throws Exception;

    public User findUserById(@Param("user_id") String user_id, @Param("org_id") String org_id) throws Exception;

    public User findUserInfoById(@Param("user_id") String user_id) throws Exception;


    public List<UserOrg> getUserOrgMapping(@Param("org_id") String org_id, @Param("user_id") String user_id) throws Exception;

    public List<User> commonUserPageList(@Param("offset") int offset, @Param("limit") int limit, @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("emp_name") String emp_name,
                                         @Param("role_code") String role_code, @Param("user_id") int user_id);

    public int commonUserPageCount(@Param("emp_name") String emp_name, @Param("role_code") String role_code, @Param("user_id") int user_id);

    public void updateSelfInfo(User user) throws Exception;

    public List<User> findUserByRoleCode(@Param("groupId") String groupId);

    public User queryUserByName(String userName);

    public Set<String> queryRolesByName(String userName);
}
