package com.pobo.cache;

import java.util.concurrent.ConcurrentHashMap;

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

public class SessionCacheManager extends CacheManager {

	private static long DEFAULT_EXPIRE = 30 * 60 * 1000;      // 默认 30 min

	public static void setDefaultExpire(long defaultExpire) {
		DEFAULT_EXPIRE = defaultExpire;
	}

	private static class SingletonHolder {
		private static final SessionCacheManager INSTANCE = new SessionCacheManager();
	}

	private SessionCacheManager() {
		cacheMap = new ConcurrentHashMap<>();
	}

	public static SessionCacheManager getInstance() {
		return SingletonHolder.INSTANCE;
	}

	/**
	 * 为客户会话新增一个缓存信息, 如果不存在，则创建，如果已存在，则更新其信息
	 *
	 * @param key  cacheMap 键
	 * @param name 缓存信息的名称
	 * @param obj  缓存的内容
	 */
	public void add(String key, String name, Object obj) {
		super.add(key, name, obj, DEFAULT_EXPIRE, true);
	}
}
