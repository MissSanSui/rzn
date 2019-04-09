package com.frame.kernel.shiro.redis;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.util.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class RedisSessionDAO extends AbstractSessionDAO {

	private static Logger logger = LoggerFactory
			.getLogger(RedisSessionDAO.class);
	
	@Autowired
	private RedisTemplate redisTemplate;
	
	private String keyPrefix="shiro_redis_session";
	private Cache<String, Session> redisSession;
	

	public void setCacheManager(CacheManager cacheManager) {
		this.redisSession = cacheManager.getCache(keyPrefix);
	}

	protected Serializable doCreate(Session session) {

        Serializable sessionId = generateSessionId(session);
        assignSessionId(session, sessionId);
        storeSession(sessionId, session);
        return sessionId;
    }

    protected Session storeSession(Serializable id, Session session) {
        if (id == null) {
            throw new NullPointerException("id argument cannot be null.");
        }
        redisSession.put(id.toString(), session);
        return session;
    }

    protected Session doReadSession(Serializable sessionId) {
        return redisSession.get(sessionId.toString());
    }

    public void update(Session session) throws UnknownSessionException {
        storeSession(session.getId(), session);
    }

    public void delete(Session session) {
        if (session == null) {
            throw new NullPointerException("session argument cannot be null.");
        }
        Serializable id = session.getId();
        if (id != null) {
        	redisSession.remove(id.toString());
        }
    }

	public Collection<Session> getActiveSessions() {
		Set<String> keys = redisTemplate.keys(keyPrefix+":*");
		System.out.println("系统现有个cache的session:"+keys.size()+"$$$$$$$$$$$$$$$");
		Set<Session> sessions = new HashSet<Session>();
		for (String key : keys) {
			key=key.substring(key.indexOf(":")+1);
			System.out.println(key+"#######:"+redisSession.get(key));
			sessions.add(redisSession.get(key));
		}

		if (CollectionUtils.isEmpty(sessions)) {
			return Collections.emptySet();
		} else {
			return Collections.unmodifiableCollection(sessions);
		}
	}

}
