package com.pobo.model;

import com.pobo.dao.mapper.IBookingMapper;
import com.pobo.dao.mapper.ILogMapper;
import com.pobo.entity.BookingInfo;
import com.pobo.exception.AmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-28 17:01
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class BookingAction {
	@Autowired
	private IBookingMapper bookingMapper;

	@Autowired
	private ILogMapper logMapper;

	public int addBookingInfo(String loginName, String productId, String phone, String orgId) {
		BookingInfo info = new BookingInfo();
		try {
			info.setLoginName(loginName);
			info.setOrgId(orgId);
			info.setPhone(phone);
			info.setProductId(productId);
			bookingMapper.insertBookingInfo(info);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return Integer.valueOf(info.getBookingId());
	}


	public List<Map<String, Object>> getBookingInfo(String loginName, String orgId, String status,
	                                                String fromDate, String toDate) {
		List<Map<String, Object>> list;
		try {
			list = bookingMapper.queryBookingInfo(loginName, orgId, status, fromDate, toDate);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return list;
	}
}
