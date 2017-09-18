package com.pobo.protocol;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * Project: PoboAssetWS
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

	private String uid;
	private String sid;
	private String loginname;
	private String orgid;
	private List<HashMap<String, Object>> data;

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getOrgid() {
		return orgid;
	}

	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}

	public List<HashMap<String, Object>> getData() {
		return data;
	}

	public void setData(List<HashMap<String, Object>> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "WsRequest{" +
				"uid='" + uid + '\'' +
				", sid='" + sid + '\'' +
				", loginname='" + loginname + '\'' +
				", orgid='" + orgid + '\'' +
				", data=" + data +
				'}';
	}
}
