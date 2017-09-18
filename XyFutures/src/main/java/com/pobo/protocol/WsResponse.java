package com.pobo.protocol;

import com.pobo.constant.RetCode;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Project: MyHallWebService
 * Comments: <对此类的描述，可以引用系统设计中的描述>
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
	private int func;
	private int type;
	private String timestamp;
	private List<HashMap<String, Object>> data;
	private HashMap<String, String> custom;
	private String desc;

	private final static DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	private final static int CORRECT = 1;

	@JsonIgnore
	protected Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 构造函数，无参
	 */
	public WsResponse() {
		this.timestamp = df.format(new Date());
	}

	/**
	 * 构造函数
	 *
	 * @param func 功能码，用于指明接口
	 * @param type 接口类型，0 - WS 系统，1 - 交易，2 - CRM
	 */
	public WsResponse(int func, int type) {
		this.func = func;
		this.type = type;
		this.timestamp = df.format(new Date());
	}

	/**
	 * 构造函数，用于直接创建 WsResponse 错误格式
	 *
	 * @param func 功能码，用于指明接口
	 * @param desc 描述
	 */
	public WsResponse(int func, String desc) {
		this.func = func;
		this.timestamp = df.format(new Date());
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
		this.desc = RetCode.getDesc(1);

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
	 * @see com.pobo.constant.RetCode
	 */
	public WsResponse setError(int retHead) {
		this.retHead = retHead;
		this.desc = RetCode.getDesc(retHead);
		logger.error("错误码: [{}], 错误描述: [{}]", retHead, RetCode.getDesc(retHead));
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
	 * @see com.pobo.constant.RetCode
	 */
	public WsResponse setError(int retHead, String desc) {
		this.retHead = retHead;
		if (RetCode.getDesc(retHead).equals("")) {
			this.desc = desc;
		} else {
			this.desc = RetCode.getDesc(retHead) + ", " + desc;
		}
		logger.error("错误码: [{}], 错误描述: [{}]", retHead, this.desc);
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
				", func=" + func +
				", type=" + type +
				", timestamp='" + timestamp + '\'' +
				", data=" + data +
				", custom=" + custom +
				", desc='" + desc + '\'' +
				'}';
	}
}
