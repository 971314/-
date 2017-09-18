package com.pobo.cache;

import java.util.HashMap;
import java.util.Map;
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

public class UserCacheManager extends CacheManager {
	private static int MAX_USER = 1;      // 最大登录用户数
	private static int ISKICK = 1;   // 新用户替换老用户，还是新用户不允许登录, =1 表示将老用户踢出

	private static long DEFAULT_EXPIRE = 60 * 60 * 1000;      // 默认 20 分钟

	public static void setMaxUser(int maxUser) {
		MAX_USER = maxUser;
	}

	public static void setISKICK(int ISKICK) {
		UserCacheManager.ISKICK = ISKICK;
	}

	public static void setDefaultExpire(long defaultExpire) {
		DEFAULT_EXPIRE = defaultExpire;
	}

	private static class SingletonHolder {
		private static final UserCacheManager INSTANCE = new UserCacheManager();
	}

	private UserCacheManager() {
		cacheMap = new ConcurrentHashMap<>();
	}

	public static UserCacheManager getInstance() {
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

	/**
	 * 每当一个客户登录此账号时，将登录对应的 TOKEN 存入
	 *
	 * @param account 客户ID
	 * @param token   客户 Session 对应 TOKEN
	 * @return void
	 */
	public boolean addSession(String account, String token) {
		if (!isExist(account, CacheKey.TOKEN_SET)) {
			// 当前无用户登录，新增
			Map<String, Long> tokens = new HashMap<>();
			tokens.put(token, System.currentTimeMillis());
			add(account, CacheKey.TOKEN_SET, tokens);
		} else {
			Map<String, Long> tokens = (Map<String, Long>) get(account, CacheKey.TOKEN_SET);
			if (MAX_USER == 1) {
				tokens.clear();
				tokens.put(token, System.currentTimeMillis());
			} else {
				if (isFull(account)) {
					// 当前登录用户已满
					if (ISKICK == 1) {
						// 将老用户踢出
						String kickedId = chooseKickedTOKEN(account);
						tokens.remove(kickedId);
						SessionCacheManager.getInstance().del(account, kickedId);
					} else {
						// 不将老用户踢出，新用户不允许登录
						return false;
					}
				} else {
					// 当前登录用户未满
					tokens.put(token, System.currentTimeMillis());
				}
			}
			logger.info("account = [{}] 下新增会话 token = [{}], 当前会话 [{}] 人", account, token, tokens.size());
		}
		return true;
	}

	/**
	 * 每当一个客户登出此账号时，将会话对应的 TOKEN 删除
	 *
	 * @param account 客户ID
	 * @param token   客户 Session 对应 TOKEN
	 */
	public void removeSession(String account, String token) {
		if (isExist(account, CacheKey.TOKEN_SET)) {
			synchronized (this) {
				Map<String, Long> tokens = (Map<String, Long>) get(account, CacheKey.TOKEN_SET);
				tokens.remove(token);
				logger.info("account = [{}] 下清除会话 token = [{}], 当前会话 [{}] 人", account, token, tokens.size());
			}
		}
	}

	/**
	 * 判断此 TOKEN 是否为该账户的合法登录的 TOKEN
	 *
	 * @param account 客户ID
	 * @param token   客户会话 对应 TOKEN
	 * @return boolean
	 */
	public boolean hasSession(String account, String token) {
		if (!isExist(account, CacheKey.TOKEN_SET)) {
			return false;
		} else {
			synchronized (this) {
				Map<String, Long> tokens = (Map<String, Long>) get(account, CacheKey.TOKEN_SET);
				return tokens.containsKey(token);
			}
		}
	}

	/**
	 * 判断是否以达到登录用户数上线
	 *
	 * @param account 客户ID
	 * @return boolean
	 */
	public boolean isFull(String account) {
		if (!isExist(account, CacheKey.TOKEN_SET)) {
			return false;
		} else {
			synchronized (this) {
				Map<String, Long> tokens = (Map<String, Long>) get(account, CacheKey.TOKEN_SET);
				if (tokens.size() < MAX_USER) return false;
				else return true;
			}
		}
	}

	/**
	 * 判断选择出该被踢出的客户, 按照时间顺序，踢出最早登录的
	 * 可以根据要求编写踢出策略，修改此方法即可
	 *
	 * @param account 客户ID
	 * @return String 需要被踢出的 TOKEN
	 */
	private String chooseKickedTOKEN(String account) {
		Map<String, Long> tokens = (Map<String, Long>) get(account, CacheKey.TOKEN_SET);

		String ret = "";
		Long timestamp = Long.MAX_VALUE;
		for (String token : tokens.keySet()) {
			if (tokens.get(token) < timestamp) {
				ret = token;
				timestamp = tokens.get(token);
			}
		}
		return ret;
	}
}
