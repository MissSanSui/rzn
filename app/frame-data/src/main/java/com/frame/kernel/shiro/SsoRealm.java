package com.frame.kernel.shiro;

import com.frame.kernel.user.model.User;
import com.frame.kernel.user.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.AllowAllCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.Deque;

/**
 * 单点登录realm类
 * @author
 * @date 2019年3月22日
 */
public class SsoRealm extends AuthorizingRealm{
	
//	@Autowired
//	private AccountManager accountManager;
	@Autowired
	private UserService userService;
	
	private Cache<String, Deque<Serializable>> cache;
	
    public void setCacheManager(CacheManager cacheManager) {
        this.cache = cacheManager.getCache("shiro-kickout-session");
    }
    
	public SsoRealm(){
		//设置无需凭证，因为从sso认证后才会有用户名
		setCredentialsMatcher(new AllowAllCredentialsMatcher());
		
	}
	
	/**
	 * 授权查询回调函数，进行授权但缓存中无用户的授权信息时调用
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String loginName = (String)principals.fromRealm(getName()).iterator().next();
//		User user accountManager.findUserByLoginName(loginName);
//		if(user!=null){
//			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
//			//用户权限放入其中
//			return info;
//		}
		return null;
	}

	/**
	 * 认证回调函数，登录时调用
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authctoken) throws AuthenticationException {

		UsernamePasswordToken token = (UsernamePasswordToken) authctoken;
		Object username = token.getPrincipal();
		
		if(username == null){
			throw new AccountException("用户名不允许为空");// 没找到帐号
		}else if(!((String)username).startsWith("sso#")){
			return null;
		}
		
		String account = ((String)username).split("#")[1];
		User user = userService.queryUserByName(account);
		token.setUsername(account);
		return new SimpleAuthenticationInfo(user, token.getCredentials(), getName());
	}
	
    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }

}
