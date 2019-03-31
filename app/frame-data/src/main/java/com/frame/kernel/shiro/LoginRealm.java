package com.frame.kernel.shiro;

import com.frame.kernel.user.exception.WrongFlagException;
import com.frame.kernel.user.model.User;
import com.frame.kernel.user.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * LoginRealm
 * @author
 * @date 2019年4月20日
 */
public class LoginRealm extends AuthorizingRealm {

	@Autowired
	private UserService userService;

	private Cache<String, User> keycache;


	public void setCacheManager(CacheManager cacheManager) {
		this.keycache = cacheManager.getCache("primary-key");
	}

	/**
	 * 为当前登录的Subject授予角色和权限
	 * 
	 * @see 经测试:本例中该方法的调用时机为需授权资源被访问时
	 * @see 经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache
	 * @see 个人感觉若使用了Spring3
	 *      .1开始提供的ConcurrentMapCache支持,则可灵活决定是否启用AuthorizationCache
	 * @see 比如说这里从数据库获取权限信息时,先去访问Spring3.1提供的缓存,而不使用Shior提供的AuthorizationCache
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){
//		String username = (String) principals.getPrimaryPrincipal();
//		ArchCommon user = loginService.findByUsername(username);
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
//		authorizationInfo.setRoles(loginService.findRoles(user.getUserId()));
//		authorizationInfo.setStringPermissions(loginService.findPermissionSet(user.getUserId()));
		return authorizationInfo;
	}

	/**
	 * 验证当前登录的Subject
	 * 
	 * @see 经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {

		String username = (String) token.getPrincipal();
		if (username.startsWith("sso#")) {
			return null;
		}

		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
		String password = new String(upToken.getPassword());
		System.out.println(username + "--" + password);
		
		//update test
		
		
		User user = userService.queryUserByName(username);

		if (user == null) {
			throw new UnknownAccountException();// 没找到帐号
		}else if("N".equals(user.getFlag())){
			throw new WrongFlagException();//账号锁定
		}
//		setTimezone_DST(user);
		keycache.put(username, user);//将account和主键传入cache
		upToken.setPassword(password.toUpperCase().toCharArray());

		// 交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
				user, // 用户名
				user.getPassword(), // 密码
				// ByteSource.Util.bytes(user.getCredentialsSalt()), //
				// salt=username+salt
				getName() // realm name
		);
		return authenticationInfo;
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
	//向user中添加时区（夏令时）
	/*private ArchUser setTimezone_DST(ArchUser user){
		SysVisaCenter dept = deptService.findByDeptId(user.getDept_id());
		String timezone_DTS;
		if(!"Y".equals(dept.getSeason_flag())){
			timezone_DTS = dept.getTime_zone();
		}else{
			Date current = new Date();
			Date dtsStart = dept.getDst_start_date();
			Date dtsEnd = dept.getDst_end_date();

			if(current.before(dtsStart) || current.after(dtsEnd)){
				timezone_DTS = dept.getTime_zone();
			}else{
				String timezone[] = dept.getTime_zone().split(":");
				int hours = Integer.parseInt(timezone[0]);
				int mins = Integer.parseInt(timezone[1]);
				String shiftStr = dept.getSeason_time();
				int shift = Integer.parseInt(shiftStr);
				if(hours<0){
					mins = 60*hours - mins + shift;
				}else{
					mins = 60*hours + mins + shift;
				}
				String sign = "+";
				if(mins<0){
					sign = "-";
				}
				mins = Math.abs(mins);
				hours = mins/60;
				mins = mins%60;
				String hStr = String.valueOf(hours);
				if(hours<10) hStr="0"+hStr;
				String mStr = String.valueOf(mins);
				if(mins<10) mStr="0"+mStr;
				timezone_DTS = sign + hStr + ":" + mStr;
			}
		}

		user.setTimezone_DTS(timezone_DTS);
		return user;
	}*/
}
