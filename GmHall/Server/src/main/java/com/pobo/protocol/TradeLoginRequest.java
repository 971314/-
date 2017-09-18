package com.pobo.protocol;

import java.util.HashMap;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/2 17:41
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class TradeLoginRequest {
	private String func;
	private String pwd;
	private String account;
	private String begin = "";
	private String count = "";
	private String fields = "";
	private List<HashMap<String, String>> data;

	public String getFunc() {
		return func;
	}

	public void setFunc(String func) {
		this.func = func;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getBegin() {
		return begin;
	}

	public void setBegin(String begin) {
		this.begin = begin;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) {
		this.fields = fields;
	}

	public List<HashMap<String, String>> getData() {
		return data;
	}

	public void setData(List<HashMap<String, String>> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "TradeLoginRequest {" +
				"func='" + func + '\'' +
				", pwd='" + pwd + '\'' +
				", account='" + account + '\'' +
				", begin='" + begin + '\'' +
				", count='" + count + '\'' +
				", fields='" + fields + '\'' +
				", data=" + data +
				'}';
	}
}
