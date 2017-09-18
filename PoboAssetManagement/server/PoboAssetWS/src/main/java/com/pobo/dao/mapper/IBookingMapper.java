package com.pobo.dao.mapper;

import com.pobo.entity.BookingInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-3 10:14
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Repository
public interface IBookingMapper {
	/**
	 * 根据客户 id 查找客户所预约的产品
	 * 若带有状态，则查询所有该状态的产品
	 *
	 * @return 返回预约产品列表
	 */
	public List<Map<String, Object>> queryBookingInfo(@Param("loginname") String loginName,
	                                                  @Param("orgid") String orgId,
	                                                  @Param("status") String status,
	                                                  @Param("fromdate") String fromDate,
	                                                  @Param("todate") String toDate);

	/**
	 * 客户预约产品，新插入预约信息
	 *
	 * @return 返回新增预约订单编号
	 */
	public int insertBookingInfo(BookingInfo info);
}
