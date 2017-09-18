package com.pobo.model;

import com.pobo.dao.mapper.IProductMapper;
import com.pobo.exception.AmException;
import com.pobo.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

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
public class ProductAction {
	@Autowired
	private IProductMapper productMapper;

	// 查询产品列表
	public List<Map<String, Object>> getProductList(String orgId) {
		List<Map<String, Object>> list;
		try {
			list = productMapper.queryProductList(orgId);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return list;
	}

	// 查询产品详情
	public Map<String, Object> getProductDetail(String productId) {
		Map<String, Object> map;
		try {
			map = productMapper.queryProductDetails(productId);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		if (map == null) {
			throw new AmException(-105);
		}
		Map tmp = getNavIndex(productId);
		if (tmp != null && tmp.size() != 0) {
			map.putAll(tmp);
		}
		return map;
	}

	// 查询产品净值
	public List<Map<String, Object>> getProductNav(String productId, int pagenum, int pagesize) {
		List<Map<String, Object>> list;
		try {
			list = productMapper.queryNavList(productId, (pagenum-1)*pagesize, pagesize+1);
		} catch (Exception e) {
			throw new AmException(-20);
		}

		if (list == null || list.isEmpty()) {
			return list;
		}

		Map<String, Object> map1;
		Map<String, Object> map2;

		for (int i = 0; i < list.size()-1; i++) {
			map1 = list.get(i);
			map2 = list.get(i+1);
			double current = Double.parseDouble(String.valueOf(map1.get("unitnav")));
			double next = Double.parseDouble(String.valueOf(map2.get("unitnav")));
			double varnav = (current - next)/next * 100;
			map1.put("varnav", String.format("%.2f", varnav));
		}

		if (list.size() <= pagesize) {
			list.get(list.size()-1).put("varnav", "--");
		} else {
			list.remove(list.size()-1);
		}
		return list;
	}

	/*******************************************************************************/
	// 查询产品净值, 并计算相关指标
	private Map<String, Object> getNavIndex(String productId) {
		List<Map<String, Object>> list;
		try {
			list = productMapper.queryNavList(productId, 0, Integer.MAX_VALUE);
		} catch (Exception e) {
			throw new AmException(-20);
		}

		if (list == null || list.isEmpty()) {
			return null;
		}

		Map<String, Object> rmap = new HashMap<>();

		String maxdd;       // 最大回撤率, %
		String annualroa;   // 年化总回报率, %
		String navyear;     // 年净值增长率, %
		String nav6month;   // 半年净值增长率, %
		String nav3month;   // 季度净值增长率, %
		String nav1month;   // 月净值增长率, %
		String nav1week;    // 周净值增长率, %

		maxdd = calMaxDD(list);
		annualroa = calAnnualRoa(list);

		navyear = calUnitNavRate(list, 365);
		nav6month = calUnitNavRate(list, 30*6);
		nav3month = calUnitNavRate(list, 30*3);
		nav1month = calUnitNavRate(list, 30);
		nav1week = calUnitNavRate(list, 7);

		rmap.put("maxdd", maxdd);
		rmap.put("annualroa", annualroa);
		rmap.put("navyear", navyear);
		rmap.put("nav6month", nav6month);
		rmap.put("nav3month", nav3month);
		rmap.put("nav1month", nav1month);
		rmap.put("nav1week", nav1week);
		return rmap;
	}

	// 计算最大回撤率
	private String calMaxDD(List<Map<String, Object>> list) {
		if (list == null || list.size() < 2) {
			return "--";
		}

		// maxdd = max[(Di - Dj)/Di] = max[ 1 - Dj/Di] = 1 - min(Dj/Di), (i < j)
		int i = 0;
		double peak = 0;
		double min = Double.MAX_VALUE;

		while (i < list.size()) {
			double tmpi = Double.parseDouble(String.valueOf(list.get(i).get("unitnav")));
			if (tmpi > peak)
				peak = tmpi;
			double dd =  tmpi/peak;
			if (dd < min) {
				min = dd;
			}
			i++;
		}

		double maxdd = (1 - min) * 100;
		return String.format("%.2f", maxdd);
	}

	// 计算年化回报率
	private String calAnnualRoa(List<Map<String, Object>> list) {
		if (list == null || list.size() < 2) {
			return "--";
		}
		Map<String, Object> last = list.get(0);
		Map<String, Object> first = list.get(list.size()-1);
		long d = DateUtil.dayToTarget((String) last.get("publishtime"), (String) first.get("publishtime"));

		double lastnav = Double.parseDouble(String.valueOf(last.get("accnav")));
		double firstnav = Double.parseDouble(String.valueOf(first.get("accnav")));

		double result = (Math.pow(lastnav/firstnav, 365/d) - 1)*100;
		return String.format("%.2f", result);
	}

	// 计算净值增长率
	private String calUnitNavRate(List<Map<String, Object>> list, int days) {
		if (list == null || list.size() < 2) {
			return "--";
		}

		Map<String, Object> last = list.get(0);
		String now = DateUtil.getDf().format(new Date());

		long d = DateUtil.dayToTarget((String) last.get("publishtime"), now);

		if (d > days) {
			return "--";
		}

		int index = 0;
		long d0 = Long.MAX_VALUE;
		long d1 = 0;
		String targetDate = DateUtil.add(now, Calendar.DAY_OF_YEAR, -days);
		for (int i = 0; i < list.size(); i++) {
			d1 = DateUtil.dayToTarget((String) list.get(i).get("publishtime"), targetDate);
			if (d1 < d0) {
				d0 = d1;
				index = i;
			} else {
				break;
			}
		}
		Map<String, Object> map = list.get(index);
		double lastaccnav = Double.parseDouble(String.valueOf(last.get("accnav")));
		double startaccnav = Double.parseDouble(String.valueOf(map.get("accnav")));
		double result = (lastaccnav/startaccnav - 1)*100;
		return String.format("%.2f", result);
	}
}
