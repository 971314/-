package com.pobo.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-2 16:36
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Repository
public interface ILogMapper {
	public int insertCustomerOpInfo(@Param("loginname") String loginName,
	                                @Param("orgid") String orgId,
	                                @Param("content") String content,
	                                @Param("ip") String ip);

	public int insertBookingLog(@Param("loginname") String loginName,
	                            @Param("orgid") String orgId,
	                            @Param("productid") String productId,
	                            @Param("bookingid") String bookingId,
	                            @Param("content") String content,
	                            @Param("ip") String ip);
}
