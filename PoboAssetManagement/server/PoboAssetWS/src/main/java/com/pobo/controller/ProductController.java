package com.pobo.controller;

import com.pobo.exception.AmException;
import com.pobo.model.ProductAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.*;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-1 21:00
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller
public class ProductController {
	@Autowired
	private ProductAction productAction;

	public WsResponse getProdList(WsRequest data, WsResponse response) {
		String orgId = data.getOrgid();
		List<Map<String, Object>> list = productAction.getProductList(orgId);

		// list1 资管产品，list2 财富产品
		List list1 = new ArrayList<HashMap<String, String>>();
		List list2 = new ArrayList<HashMap<String, String>>();

		try {
			for (Map map : list) {
				if ((int) map.get("opertype") == 1) {
					list1.add(map);
				} else if ((int) map.get("opertype") == 2) {
					list2.add(map);
				}
			}
		} catch (Exception e) {
			throw new AmException(-21);
		}

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("count1", list1.size());
		rmap.put("list1", list1);
		rmap.put("count2", list2.size());
		rmap.put("list2", list2);
		rdata.add(rmap);
		response.setCorrect(rdata);

		return response;
	}

	public WsResponse getProdDetail(WsRequest data, WsResponse response) {
		String productid;
		try {
			productid = (String) data.getData().get(0).get("productid");
		} catch (Exception e) {
			throw new AmException(-101);
		}

		Map map = productAction.getProductDetail(productid);
		if (map == null) {
			throw new AmException(-105);
		}

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("info", map);
		rdata.add(rmap);
		response.setCorrect(rdata);

		return response;
	}

	public WsResponse getProdNav(WsRequest data, WsResponse response) {
		String productid;
		int pagenum;
		int pagesize;
		try {
			productid = (String) data.getData().get(0).get("productid");
			Object obj = data.getData().get(0).get("pagenum");
			if (obj == null) {
				pagenum = 1;
			} else {
				pagenum = Integer.valueOf((String)obj);
			}
			obj = data.getData().get(0).get("pagesize");
			if (obj == null) {
				pagesize = 10;
			} else {
				pagesize = Integer.valueOf((String)obj);
			}
		} catch (Exception e) {
			throw new AmException(-101);
		}

		List list = productAction.getProductNav(productid, pagenum, pagesize);
		if (list == null) {
			throw new AmException(-107);
		}

		response.setCorrect(list);
		return response;
	}
}
