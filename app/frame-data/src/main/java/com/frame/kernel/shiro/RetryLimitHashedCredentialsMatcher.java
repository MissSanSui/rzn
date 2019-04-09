package com.frame.kernel.shiro;


import com.frame.kernel.user.model.User;
import com.frame.kernel.user.service.UserService;
import com.frame.kernel.util.Md5Utill;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * RetryLimitHashedCredentialsMatcher
 * @author
 * @date 2019年4月20日
 */
public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

	private Cache<String, AtomicInteger> passwordRetryCache;
	
	private Cache<String, User> keycache;
	
	@Autowired
	private UserService userService;
	
	private int retryTime;

	public int getRetryTime() {
		return retryTime;
	}

	public void setRetryTime(int retryTime) {
		this.retryTime = retryTime;
	}

	public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager) {
		passwordRetryCache = cacheManager.getCache("passwordRetryCache");
		keycache = cacheManager.getCache("primary-key");
	}
	
	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		String username = (String) token.getPrincipal();
		// retry count + 1
		AtomicInteger retryCount = passwordRetryCache.get(username);
		if (retryCount == null) {
			retryCount = new AtomicInteger(0);
			passwordRetryCache.put(username, retryCount);
		}
		
		if (retryCount.incrementAndGet() > retryTime && retryTime != -1) {
			// if retry count > retryTime throw
			User  user = keycache.get(username);
			user.setFlag("N");
			try {
				userService.updateUser(user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			throw new ExcessiveAttemptsException();
		}
		
		passwordRetryCache.put(username, retryCount);
		
		String interPassword = new String((char[]) token.getCredentials());
		String accessPassword = (String) info.getCredentials();
		
//		boolean matches = super.doCredentialsMatch(token, info);
		boolean matches = Md5Utill.getMD5(interPassword).equals(accessPassword);
		if (matches) {
			// clear retry count
			passwordRetryCache.remove(username);
		}
		return matches;
	}
}
