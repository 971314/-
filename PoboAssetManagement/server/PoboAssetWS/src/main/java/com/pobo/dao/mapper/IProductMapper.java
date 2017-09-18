package com.pobo.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-3 9:52
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Repository
public interface IProductMapper {
	public List<Map<String, Object>> queryProductList(@Param("orgid") String orgId);

	public Map<String, Object> queryProductDetails(@Param("productid") String productId);

	public List<Map<String, Object>> queryNavList(@Param("productid") String productId,
	                                              @Param("offset") int offset,
	                                              @Param("pagesize") int pagesize);
}
