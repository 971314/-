package com.pobo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.pobo.constant.OperationLogType;
import com.pobo.dao.mapper.LoggerMapper;
import com.pobo.dao.mapper.ProductMapper;
import com.pobo.model.CustomerInfo;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.model.Nav;
import com.pobo.model.OperationLog;
import com.pobo.model.ProductCustomerPatameters;
import com.pobo.model.ProductList;
import com.pobo.model.ProductModel;
import com.pobo.model.ProductQueryParameters;
import com.pobo.protocol.WsRequest;
import com.pobo.utils.HttpServletRequestUtil;

import net.sf.json.JSONObject;

@Controller
public class ProductController {
	@Autowired
	ProductMapper productmapper;
	@Autowired
	LoggerMapper loggermapper;

	public List<ProductList> GetPageList(ProductQueryParameters pqp) {
		return productmapper.GetPageList(pqp);
	}

	public List<Map> GetCustomerList(ProductCustomerPatameters pcp) {
		return productmapper.GetCustomerList(pcp);
	}

	public int CustomerListCount(ProductCustomerPatameters pcp) {
		return productmapper.CustomerListCount(pcp);
	}

	@Transactional
	public int UpdateProductStatus(HttpServletRequest request, HttpServletResponse response, WsRequest wr) {
		int uid = wr.getUid();
		HashMap<String, String> map = wr.getData().get(0);
		int ret = productmapper.UpdateProductStatus(map);
		if (ret == 0) {
			throw new RuntimeException();
		}
		OperationLog ol = new OperationLog();
		ol.setC_AdminId(String.valueOf(uid));
		ol.setC_ProductId(map.get("id"));
		ol.setC_LogContent(JSONObject.fromObject(map).toString());
		ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
		ol.setC_LogType(OperationLogType.ProductLog);
		ret = loggermapper.WriteLog(ol);
		map = null;
		if (ret == 0) {
			throw new RuntimeException();
		}
		return ret;
	}

	public List<GetOpetationLog> GetProductRecords(LogParameters lp) {
		return loggermapper.GetLog(lp);
	}

	@Transactional
	public int CreateNewProduct(HttpServletRequest request, ProductModel pm, List<Nav> list) {
		// 新增产品基础信息
		String uid = pm.getUid();
		int ret = productmapper.CreateNewProduct(pm);
		if (ret == 0) {
			throw new RuntimeException();
		}
		// 更新产品详细信息
		ret = productmapper.CreateNewProductInfo(pm);
		if (ret == 0) {
			throw new RuntimeException();
		}
		// 产品更新记录
		OperationLog ol = new OperationLog();
		ol.setC_AdminId(uid);
		ol.setC_ProductId(pm.getProductid());
		pm.setDescription("新增产品信息");
		ol.setC_LogContent(JSONObject.fromObject(pm).toString());
		ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
		ol.setC_LogType(OperationLogType.ExcelImportLog);
		ret = loggermapper.WriteLog(ol);
		if (ret == 0) {
			throw new RuntimeException();
		}
		if (list!=null&&!list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				Nav nav = list.get(i);
				nav.setProductid(pm.getProductid());
				nav.setUid(pm.getUid());
				ret = productmapper.InsertProductNav(nav);
				if (ret == 0) {
					throw new RuntimeException();
				}
			}
			// 净值导入记录
			ol.setC_AdminId(uid);
			ol.setC_ProductId(pm.getProductid());
			ol.setC_LogContent("{\"description\":\"导入产品净值\"}");
			ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
			ol.setC_LogType(OperationLogType.ProductLog);
			ret = loggermapper.WriteLog(ol);
			if (ret == 0) {
				throw new RuntimeException();
			}
		}
		return ret;
	}

	public ProductModel GetProductInfo(WsRequest wr) {
		HashMap<String, String> map = wr.getData().get(0);
		ProductModel result = productmapper.GetProductInfo(map.get("id").trim());
		map = null;
		return result;
	}

	public int UpdateProduct(HttpServletRequest request, ProductModel pm, List<Nav> list) {
		// 新增产品基础信息
		String uid = pm.getUid();
		int ret = productmapper.UpdateProduct(pm);
		if (ret == 0) {
			throw new RuntimeException();
		}
		// 更新产品详细信息
		ret = productmapper.UpdateProductInfo(pm);
		if (ret == 0) {
			throw new RuntimeException();
		}
		// 产品更新记录
		OperationLog ol = new OperationLog();
		ol.setC_AdminId(uid);
		ol.setC_ProductId(pm.getProductid());
		pm.setDescription("变更产品信息");
		ol.setC_LogContent(JSONObject.fromObject(pm).toString());
		ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
		ol.setC_LogType(OperationLogType.ProductLog);
		ret = loggermapper.WriteLog(ol);
		if (ret == 0) {
			throw new RuntimeException();
		}
		if (list!=null&&!list.isEmpty()) {
			try {
				productmapper.deleteProductNav(pm.getProductid());
			} catch (Exception e) {
				throw new RuntimeException();
			}
			for (int i = 0; i < list.size(); i++) {
				Nav nav = list.get(i);
				nav.setProductid(pm.getProductid());
				nav.setUid(pm.getUid());
				ret = productmapper.InsertProductNav(nav);
				if (ret == 0) {
					throw new RuntimeException();
				}
			}
			// 净值导入记录
			ol.setC_AdminId(uid);
			ol.setC_ProductId(pm.getProductid());
			ol.setC_LogContent("{\"description\":\"导入产品净值\"}");
			ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
			ol.setC_LogType(OperationLogType.ProductLog);
			ret = loggermapper.WriteLog(ol);
			if (ret == 0) {
				throw new RuntimeException();
			}
		}
		return ret;
	}
}
