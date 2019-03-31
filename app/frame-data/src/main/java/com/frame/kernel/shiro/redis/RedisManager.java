package com.frame.kernel.shiro.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.Set;

public class RedisManager<K, V> {
	
	@Autowired
	private RedisTemplate<K, V> template;
	
	private String host = "127.0.0.1";
	
	private int port = 6379;
	
	// 0 - never expire
	private int expire = 0;
	
	//timeout for jedis try to connect to redis server, not expire time! In milliseconds
	private int timeout = 0;
	
	private String password = "";
	
	private static JedisPool jedisPool = null;
	
	public RedisManager(){
		
	}
	
	/**
	 * 初始化方法
	 */
//	public void init(){
//		if(jedisPool == null){
//			if(password != null && !"".equals(password)){
//				jedisPool = new JedisPool(new JedisPoolConfig(), host, port, timeout, password);
//			}else if(timeout != 0){
//				jedisPool = new JedisPool(new JedisPoolConfig(), host, port,timeout);
//			}else{
//				jedisPool = new JedisPool(new JedisPoolConfig(), host, port);
//			}
//			
//		}
//	}
	
	/**
	 * get value from redis
	 * @param key
	 * @return
	 */
	public byte[] get(byte[] key){
		String str = new String((byte [])template.opsForValue().get(key));
		return str.getBytes();
	}
	
	/**
	 * set 
	 * @param key
	 * @param value
	 * @return
	 */
	public void set(K key,V value){
		template.opsForValue().set(key, value);
	}
	
	/**
	 * set 
	 * @param key
	 * @param value
	 * @param expire
	 * @return
	 */
//	public byte[] set(byte[] key,byte[] value,int expire){
//		Jedis jedis = jedisPool.getResource();
//		try{
//			jedis.set(key,value);
//			if(expire != 0){
//				jedis.expire(key, expire);
//		 	}
//		}finally{
//			jedisPool.returnResource(jedis);
//		}
//		return value;
//	}
	
	/**
	 * del
	 * @param key
	 */
	public void del(K key){
		template.delete(key);
	}
	
	/**
	 * flush
	 */
	public void flushDB(){
		Jedis jedis = jedisPool.getResource();
		try{
			jedis.flushDB();
		}finally{
			jedisPool.returnResource(jedis);
		}
	}
	
	/**
	 * size
	 */
	public Long dbSize(){
		Long dbSize = 0L;
		Jedis jedis = jedisPool.getResource();
		try{
			dbSize = jedis.dbSize();
		}finally{
			jedisPool.returnResource(jedis);
		}
		return dbSize;
	}

	/**
	 * keys
	 * @param regex
	 * @return
	 */
	public Set keys(K pattern){
		return template.keys(pattern);
		
	}
	
	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public int getExpire() {
		return expire;
	}

	public void setExpire(int expire) {
		this.expire = expire;
	}

	public int getTimeout() {
		return timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
