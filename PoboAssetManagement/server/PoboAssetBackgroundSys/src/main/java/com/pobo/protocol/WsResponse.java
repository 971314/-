package com.pobo.protocol;

import com.pobo.utils.DateUtil;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: 该类用于返回前端的协议的实例化
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/4/29 11:07
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@XmlRootElement(name = "Root")
@XmlAccessorType(XmlAccessType.FIELD)
public class WsResponse {
	private int retHead;
	private String timestamp;
	private List<HashMap<String, Object>> data;
	private HashMap<String, String> custom;
	private String desc;

	private final static int CORRECT = 1;
	private final static int ERROR = 0;
	private final static String DESC = "OK";

	private final static String dateFormat = "yyyyMMddHHmmssSSS";

	/**
	 * 构造函数，无参
	 */
	public WsResponse() {
		this.timestamp = DateUtil.getDf(dateFormat).format(Calendar.getInstance().getTime());
	}

	/**
	 * 构造函数，用于直接创建 WsResponse 错误格式
	 *
	 * @param desc 描述
	 */
	public WsResponse(String desc) {
		this.timestamp = DateUtil.getDf(dateFormat).format(Calendar.getInstance().getTime());
		this.desc = desc;
	}

	/**
	 * 设置 WsResponse 为正确格式
	 * 正确格式 retHead = CORRECT （= 1）
	 * desc = "OK"
	 * data = []
	 */
	public WsResponse setCorrect() {
		this.retHead = CORRECT;
		this.desc = DESC;
		if (data == null) {
			data = new ArrayList<>();
		}
		return this;
	}

	/**
	 * 设置 WsResponse 为正确格式
	 * 正确格式 retHead = CORRECT （= 1）
	 * desc = "OK"
	 * data = data
	 *
	 * @param data 数据，为 List 结构
	 */
	public WsResponse setCorrect(List<HashMap<String, Object>> data) {
		this.data = data;
		return setCorrect();
	}

	/**
	 * 设置 WsResponse 为正确格式
	 * 正确格式 retHead = CORRECT （= 1）
	 * desc = "OK"
	 * data = data
	 * desc = "OK"
	 *
	 * @param data   数据，为 List 结构
	 * @param custom 自定义数据
	 */
	public WsResponse setCorrect(List<HashMap<String, Object>> data, HashMap<String, String> custom) {
		this.data = data;
		this.custom = custom;
		return setCorrect();
	}

	/**
	 * 设置 WsResponse 为错误格式
	 * 正确格式 retHead = 错误码
	 * data = null
	 * desc = 错误信息
	 *
	 * @param retHead 错误码，根据错误码查看错误信息
	 */
	public WsResponse setError(int retHead) {
		this.retHead = retHead;
		return this;
	}

	/**
	 * 设置 WsResponse 为错误格式
	 * 正确格式 retHead = 错误码
	 * data = null
	 * desc = 自定义错误信息，作为错误信息的补充
	 *
	 * @param desc 自定义错误信息
	 */
	public WsResponse setError(String desc) {
		this.retHead = ERROR;
		this.desc = desc;
		return this;
	}

	/**
	 * 设置 WsResponse 为错误格式
	 * 正确格式 retHead = 错误码
	 * data = null
	 * desc = 自定义错误信息，作为错误信息的补充
	 *
	 * @param retHead 错误码，根据错误码查看错误信息
	 * @param desc    自定义错误信息
	 */
	public WsResponse setError(int retHead, String desc) {
		this.retHead = retHead;
		this.desc = desc;
		return this;
	}

	/**
	 * ***************** Get and Set ********************
	 */
	public int getRetHead() {
		return retHead;
	}

	public void setRetHead(int retHead) {
		this.retHead = retHead;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public List<HashMap<String, Object>> getData() {
		return data;
	}

	public void setData(List<HashMap<String, Object>> data) {
		this.data = data;
	}

	public HashMap<String, String> getCustom() {
		return custom;
	}

	public void setCustom(HashMap<String, String> custom) {
		this.custom = custom;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	@Override
	public String toString() {
		return "WsResponse {" +
				"retHead=" + retHead +
				", timestamp='" + timestamp + '\'' +
				", data=" + data +
				", custom=" + custom +
				", desc='" + desc + '\'' +
				'}';
	}
}
