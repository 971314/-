package com.pobo.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Project: GmHall
 * Comments: 管理系统会话时产生的缓存
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/7/6 18:31
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class CacheManager {
	protected static Logger logger = LoggerFactory.getLogger(CacheManager.class);

	private static final long DEFAULT_EXPIRE = 30 * 60 * 1000;

	public ConcurrentMap<String, ConcurrentMap<String, CacheEntity>> cacheMap = null;

	/**
	 * 为客户会话新增一个缓存信息, 如果不存在，则创建，如果已存在，则更新其信息
	 *
	 * @param key  cacheMap 键
	 * @param name 缓存信息的名称
	 * @param obj  缓存的内容
	 */
	public void add(String key, String name, Object obj) {
		if (isExist(key, name)) {
			logger.info("缓存信息 key = [{}], name = [{}] 已存在", key, name);
			CacheEntity entity = cacheMap.get(key).get(name);
			logger.info("缓存信息 key = [{}], name = [{}] 的 value = [{}]", key, name, String.valueOf(entity.getData()));
			synchronized (CacheManager.class) {
				entity.setData(obj);
				entity.updateTimestamp();
			}
		} else {
			logger.info("缓存信息 key = [{}], name = [{}] 还不存在，需新增, 可更新", key, name);
			createCache(key, name, obj, DEFAULT_EXPIRE, true);
		}
	}

	/**
	 * 为客户会话新增一个缓存信息, 自定义其过期时间,
	 * 如果不存在，则创建，如果已存在，则更新其信息
	 *
	 * @param key     cacheMap 键
	 * @param name    缓存信息的名称
	 * @param obj     缓存对象
	 * @param expire  过期时间，单位毫秒
	 * @param refresh 过期时间，单位毫秒
	 */
	public void add(String key, String name, Object obj, long expire, boolean refresh) {
		if (isExist(key, name)) {
			logger.info("缓存信息 key = [{}], name = [{}] 已存在", key, name);
			CacheEntity entity = cacheMap.get(key).get(name);
			synchronized (this) {
				entity.setData(obj);
				entity.updateTimestamp();
				entity.setExpire(expire);
				entity.setRefresh(refresh);
			}
			logger.info("缓存信息 key = [{}], name = [{}] 的 value = [{}]", key, name, String.valueOf(entity.getData()));
		} else {
			logger.info("缓存信息 key = [{}], name = [{}] 还不存在，需新增", key, name);
			createCache(key, name, obj, expire, refresh);
		}
	}

	/**
	 * 获得客户会话的缓存信息
	 *
	 * @param key  cacheMap 键
	 * @param name 缓存信息的名称
	 * @return Object 返回客户存的 obj，如果不存在，则返回 null
	 */
	public Object get(String key, String name) {
		CacheEntity entity = getCache(key, name);
		if (entity == null)
			return null;
		return entity.getData();
	}

	/**
	 * 删除客户会话中 key 对应的缓存信息
	 *
	 * @param key  cacheMap 键
	 * @param name 缓存信息的名称
	 */
	public void del(String key, String name) {
		if (isExist(key, name)) {
			logger.info("缓存信息 key = [{}] name = [{}] 缓存被清除", key, name);
			synchronized (this) {
				cacheMap.get(key).remove(name);
			}
		}
	}

	/**
	 * 删除该客户会话中所有缓存信息
	 *
	 * @param key cacheMap 键
	 */
	public void delAll(String key) {
		if (cacheMap.containsKey(key)) {
			synchronized (this) {
				cacheMap.get(key).clear();
				cacheMap.remove(key);
			}
			logger.info("缓存信息 key = [{}] 相关缓存全部清除", key);
		}
	}

	/**
	 * 因客户操作，对已有缓存信息进行时间戳的更新
	 *
	 * @param key cacheMap 键
	 */
	public void activeRefresh(String key) {
		logger.info("操作激活 key = [{}] 现有缓存信息", key);
		if (cacheMap.containsKey(key)) {
			for (String k : cacheMap.get(key).keySet()) {
				refresh(key, k);
			}
		}
	}

	/**
	 * 更新该客户会话中缓存信息时间戳
	 *
	 * @param key cacheMap 键
	 * @return boolean 如果更新成功，返回 true，否则 false
	 */
	public boolean refresh(String key, String name) {
		if (!isExist(key, name)) {
			return false;
		} else {
			CacheEntity entity = getCache(key, name);
			assert entity != null;
			long oldtime = entity.getTimestamp();

			if (entity.isRefresh()) {
				synchronized (this) {
					entity.updateTimestamp();
				}
				long newtime = entity.getTimestamp();
				logger.info("缓存信息 key = [{}], name = [{}] 时间戳更新，由 [{}] -> [{}]",
						key, name, oldtime, newtime);
				return true;
			} else {
				return false;
			}
		}
	}

	/**
	 * 判断该客户会话中缓存信息时间是否已经过期
	 *
	 * @param key  cacheMap 键
	 * @param name 缓存信息的 key
	 * @return boolean 如果过期，返回 true，否则 false
	 */
	public boolean isExpire(String key, String name) {
		if (!isExist(key, name)) {
			return false;
		} else {
			CacheEntity entity = getCache(key, name);
			assert entity != null;
			long timestamp = entity.getTimestamp();
			long expire = entity.getExpire();
			long now = System.currentTimeMillis();
			if (timestamp + expire < now) {
				logger.info("缓存信息 key = [{}], name = [{}] 已过期", key, name);
				return true;
			} else {
				return false;
			}
		}
	}

	public boolean isExist(String key, String name) {
		if (cacheMap.containsKey(key)) {
			return cacheMap.get(key).containsKey(name);
		} else {
			return false;
		}
	}

	/*************************************************************************/
	private CacheEntity getCache(String key, String name) {
		if (!isExist(key, name)) {
			return null;
		} else {
			return cacheMap.get(key).get(name);
		}
	}


	private void createCache(String key, String name, Object obj, long expire, boolean refresh) {
		if (!isExist(key, name)) {
			logger.info("key = [{}] 新增缓存信息 name = [{}], value = [{}]", key, name, String.valueOf(obj));
			if (cacheMap.containsKey(key)) {
				ConcurrentMap<String, CacheEntity> map = cacheMap.get(key);
				CacheEntity entity = new CacheEntity();
				entity.setData(obj);
				entity.setExpire(expire);
				entity.setRefresh(refresh);
				synchronized (this) {
					map.put(name, entity);
				}
			} else {
				ConcurrentMap<String, CacheEntity> map = new ConcurrentHashMap<>();
				CacheEntity entity = new CacheEntity();
				entity.setData(obj);
				entity.setExpire(expire);
				entity.setRefresh(refresh);
				synchronized (this) {
					map.put(name, entity);
					cacheMap.put(key, map);
				}
			}
		}
	}
}
