package com.pobo.cache;

import com.pobo.bean.PropertyConfigurer;
import com.pobo.constant.RetCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/7/7 14:32
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class CacheMonitor extends TimerTask implements ServletContextListener {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	private static int WAITMILLS;

	private CacheManager[] CacheManagers = new CacheManager[]{
			SessionCacheManager.getInstance(),
			UserCacheManager.getInstance()
	};

	public void run() {
		try {
			while (true) {
				for (CacheManager cacheManager : CacheManagers) {
					System.out.println("Cache Monitor Alive [" + System.currentTimeMillis() + "]");

					for (String key : cacheManager.cacheMap.keySet()) {
						if (cacheManager.cacheMap.get(key) == null)
							continue;

						for (String name : cacheManager.cacheMap.get(key).keySet()) {
							if (cacheManager.isExpire(key, name)) {
								logger.info("定期清理缓存信息， key = [{}]， name = [{}]", key, name);
								cacheManager.del(key, name);
							}
						}

						if (cacheManager.cacheMap.get(key).isEmpty()) {
							logger.info("定期清理缓存信息， key = [{}]", key);
							cacheManager.delAll(key);
						}
					}
				}

				// 让线程休眠 1分钟
				Thread.sleep(WAITMILLS);
			}
		} catch (InterruptedException e) {
			logger.error(RetCode.getDesc(-11), e);
		}
	}

	private void init() {
		WAITMILLS = Integer.parseInt(PropertyConfigurer.getProperty("cache.waitmills"));
		int sessiontime = Integer.parseInt(PropertyConfigurer.getProperty("cache.session"));
		SessionCacheManager.setDefaultExpire(sessiontime * 60 * 1000);
		int usertime = Integer.parseInt(PropertyConfigurer.getProperty("cache.user"));
		UserCacheManager.setDefaultExpire(usertime * 60 * 1000);
		UserCacheManager.setISKICK(Integer.parseInt(PropertyConfigurer.getProperty("user.kickable")));
		UserCacheManager.setMaxUser(Integer.parseInt(PropertyConfigurer.getProperty("user.maxlogin")));
	}

	/**
	 * * Notification that the web application initialization
	 * * process is starting.
	 * * All ServletContextListeners are notified of context
	 * * initialization before any filter or servlet in the web
	 * * application is initialized.
	 *
	 * @param sce
	 */
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		init();
		Timer timer = new Timer();
		try {
			Thread.sleep(10000);    // 等待 10s 启动缓存监视线程
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		timer.schedule(new CacheMonitor(), 0);
	}

	/**
	 * * Notification that the servlet context is about to be shut down.
	 * * All servlets and filters have been destroy()ed before any
	 * * ServletContextListeners are notified of context
	 * * destruction.
	 *
	 * @param sce
	 */
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		logger.info("Exiting Cache Montor");
	}
}
