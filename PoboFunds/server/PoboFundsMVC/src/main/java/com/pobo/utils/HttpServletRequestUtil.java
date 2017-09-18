package com.pobo.utils;

import com.pobo.exception.FundsException;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-7-15 13:19
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class HttpServletRequestUtil {

	/**
	 * 通过 HttpServletRequest 获得 request 中的 ip
	 *
	 * @param httpservletrequest HttpServletRequest
	 * @return IP, 以 String 形式
	 */
	public static String getClientIP(HttpServletRequest httpservletrequest) {
		if (httpservletrequest == null)
			return null;
		String s = httpservletrequest.getHeader("X-Forwarded-For");
		if (s == null || s.length() == 0 || "unknown".equalsIgnoreCase(s))
			s = httpservletrequest.getHeader("Proxy-Client-IP");
		if (s == null || s.length() == 0 || "unknown".equalsIgnoreCase(s))
			s = httpservletrequest.getHeader("WL-Proxy-Client-IP");
		if (s == null || s.length() == 0 || "unknown".equalsIgnoreCase(s))
			s = httpservletrequest.getHeader("HTTP_CLIENT_IP");
		if (s == null || s.length() == 0 || "unknown".equalsIgnoreCase(s))
			s = httpservletrequest.getHeader("HTTP_X_FORWARDED_FOR");
		if (s == null || s.length() == 0 || "unknown".equalsIgnoreCase(s))
			s = httpservletrequest.getRemoteAddr();
		if ("127.0.0.1".equals(s) || "0:0:0:0:0:0:0:1".equals(s))
			try {
				s = InetAddress.getLocalHost().getHostAddress();
			} catch (UnknownHostException ignored) {
				throw new FundsException(ignored.getMessage());
			}
		return s;
	}
}
