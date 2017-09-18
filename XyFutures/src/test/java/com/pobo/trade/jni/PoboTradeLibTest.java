package com.pobo.trade.jni;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/7/5 17:44
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class PoboTradeLibTest {
	@Before
	public void before() throws Exception {
	}

	@After
	public void after() throws Exception {
	}

	/**
	 * Method: DesSetPwd(String data, String key)
	 */
	@Test
	public void testDesSetPwd() throws Exception {
		System.out.println("testDesSetPwd()");

		String pwd = PoboTradeLib.DesSetPwd("5893520", "802477");
		System.out.println(pwd);

//		Map<String, String> map = new HashMap<>();
//		//map.put("pszConfigFile", "C:/Program Files/Java/jdk1.8.0_77/bin/server.ini");
//		map.put("pszConfigFile", "");
//		try {
//			String pampre = om.writeValueAsString(map);
//			System.out.println(pampre);
//			PoboTradeLib.InitLib(pampre);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

		String pwd2 = PoboTradeLib.DesSetPwd("5893520", "802477");
		System.out.println(pwd2);
//		pwd = PoboTradeLib.DesSetPwd("921015", "802477");
//		System.out.println(pwd);

		assertEquals("CGTLQqrEvHk=", com.pobo.trade.jni.PoboTradeLib.DesSetPwd("5893520", "802477"));
	}
}
