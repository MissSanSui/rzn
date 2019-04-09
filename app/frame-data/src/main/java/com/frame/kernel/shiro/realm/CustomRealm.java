package com.frame.kernel.shiro.realm;


import com.frame.kernel.user.model.User;
import com.frame.kernel.user.service.UserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



public class CustomRealm extends AuthorizingRealm{
    private static final Logger logger = LoggerFactory.getLogger(CustomRealm.class);
    @Autowired
    private UserService userService;
    /**
     * 用户授权认证
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        logger.info("======用户授权认证======");
        User user = (User) principalCollection.fromRealm(this.getClass().getName()).iterator().next();
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();

        /*
        获取人员角色权限
         */
        simpleAuthorizationInfo.setRoles(userService.queryRolesByName(user.getUser_name()));
        return simpleAuthorizationInfo;
    }
    /**
     * 用户登陆认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        logger.info("======用户登陆认证======");
        String userName = authenticationToken.getPrincipal().toString();
        User user = userService.queryUserByName(userName);
        if (user!=null) {
            AuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(user, user.getPassword(), this.getClass().getName());
            return authenticationInfo;
        }
        return null;
    }

}