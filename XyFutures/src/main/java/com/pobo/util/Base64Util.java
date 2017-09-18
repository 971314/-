package com.pobo.util;

import org.apache.commons.codec.binary.Base64;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-7-21 13:12
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class Base64Util {

	public static String decode(String encodeStr) {
		return new String(Base64.decodeBase64(encodeStr.getBytes()));
	}

	public static String encode(String decodeStr) {
		return Base64.encodeBase64String(decodeStr.getBytes());
	}

	public static void main(String[] args) {
		System.out.println(decode("MTIzNDU2Nzg5"));
		System.out.println(decode("MTIzNDU2Nzg5++**--//"));
		System.out.println(encode("123456789"));
	}
}
