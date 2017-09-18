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
	private int uid;
	private List<HashMap<String, String>> data;

	public List<HashMap<String, String>> getData() {
		return data;
	}

	public void setData(List<HashMap<String, String>> data) {
		this.data = data;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	@Override
	public String toString() {
		return "WsRequest {" +
				", sid = '" + uid + '\'' +
				", data = " + data +
				'}';
	}
}
