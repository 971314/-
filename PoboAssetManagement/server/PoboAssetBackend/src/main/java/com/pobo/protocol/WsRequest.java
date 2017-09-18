package com.pobo.protocol;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: 该类用于请求的实例化
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/2 16:41
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@XmlRootElement(name = "Root")
@XmlAccessorType(XmlAccessType.FIELD)
public class WsRequest implements Serializable {
	private static final long serialVersionUID = -821656533109689353L;

	private int func;
	private int type;
	private String account;
	private String token;
	private List<HashMap<String, String>> data;

	public int getFunc() {
		return func;
	}

	public void setFunc(int func) {
		this.func = func;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public List<HashMap<String, String>> getData() {
		return data;
	}

	public void setData(List<HashMap<String, String>> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "WsRequest {" +
				"func = " + func +
				", type = " + type +
				", account = '" + account + '\'' +
				", token = '" + token + '\'' +
				", data = " + data +
				'}';
	}
}
