package com.pobo.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-15 15:43
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class DateUtil {

	// 默认日期格式
	private final static DateFormat DF = new SimpleDateFormat("yyyyMMdd");

	public static DateFormat getDf() {
		return DF;
	}

	public static DateFormat getDf(String format) {
		return new SimpleDateFormat(format);
	}

	/**
	 * 计算日期加减，输入字符串类型的日期，计算该日期的加减
	 *
	 * @param date  日期，例如 "20120229"
	 * @param type  类型，例如 Calender.MONTH
	 * @param count 间隔
	 *              <p/>
	 *              如果输入的是 "20120102", Calendar.MONTH, 2, 这就表示在 20120102 基础上增加 2 个月，
	 *              返回结果为 "20120302"
	 */
	public static String add(String date, int type, int count) {

		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(DF.parse(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.add(type, count);
		String ret = DF.format(calendar.getTime());
		return ret;
	}
}
