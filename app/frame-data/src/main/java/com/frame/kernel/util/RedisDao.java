package com.frame.kernel.util;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.RedisSerializer;

/**
 * @author Julius
 * @date 2016年9月13日
 */
public class RedisDao {

	private static RedisTemplate redisTemplate = (RedisTemplate) SpringContextManager.getBean("redisTemplate");

	protected static ValueOperations<String, Long> valueOper = redisTemplate.opsForValue();

	public static Long getIcrCallNum(String key, Long initNum, int delta) {
		if (find(key) == null) {
			return valueOper.increment(key, initNum);
		}
		long value = valueOper.increment(key, delta);
		return value;
	}

	public static Long getCallNum(String key) {
		return valueOper.get(key);
	}

	public static void setCallNum(String key, Long num) {
		valueOper.set(key, num);
	}

	@SuppressWarnings("unchecked")
	public static boolean save(String key, String value) {
		boolean res = (boolean) redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keys = serializer.serialize(key);
				byte[] values = serializer.serialize(value);
				// set not exits
				return connection.setNX(keys, values);
			}
		});
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public static Long publishStr(String channel, String message) {
		Long res =   (Long) redisTemplate.execute(new RedisCallback<Long>() {
			public Long doInRedis(RedisConnection connection) throws DataAccessException {
//				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				// set not exits
				return connection.publish(channel.getBytes(), message.getBytes());
			}
		});
		return res;
	}

	@SuppressWarnings("unchecked")
	public static boolean update(String key, String value) {
		boolean result = (boolean) redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keys = serializer.serialize(key);
				byte[] values = serializer.serialize(value);
				// set
				connection.set(keys, values);
				return true;
			}
		});
		return result;
	}

	@SuppressWarnings("unchecked")
	public static String find(final String key) {
		String res = (String) redisTemplate.execute(new RedisCallback<String>() {
			public String doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keys = serializer.serialize(key);
				byte[] value = connection.get(keys);
				if (value == null) {
					return null;
				}
				return serializer.deserialize(value);
			}
		});
		return res;
	}

	@SuppressWarnings("unchecked")
	public static boolean delete(final String key) {
		boolean result = (boolean) redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keys = serializer.serialize(key);
				// delete
				connection.del(keys);
				return true;
			}
		});
		return result;
	}
}
