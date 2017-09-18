package com.pobo.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Project: PoboAssetWS
 * Comments: 功能类, 用于配置文件中读取配置
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-7-27 19:54
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class PropertyConfigurer extends PropertyPlaceholderConfigurer {
	private static Map<String, String> propertiesMap;

	@Override
	protected void processProperties(ConfigurableListableBeanFactory beanFactory,
	                                 Properties props) throws BeansException {
		super.processProperties(beanFactory, props);

		propertiesMap = new HashMap<>();
		for (Object key : props.keySet()) {
			String keyStr = key.toString();
			String value = props.getProperty(keyStr);
			propertiesMap.put(keyStr, value);
		}
	}

	public static String getProperty(String name) {
		return propertiesMap.get(name);
	}
}
