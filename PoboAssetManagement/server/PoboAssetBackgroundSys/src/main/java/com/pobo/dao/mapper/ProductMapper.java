package com.pobo.dao.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.pobo.model.Nav;
import com.pobo.model.ProductCustomerPatameters;
import com.pobo.model.ProductList;
import com.pobo.model.ProductModel;
import com.pobo.model.ProductQueryParameters;

@Repository
public interface ProductMapper {

	public List<ProductList> GetPageList(ProductQueryParameters pqp);

	public List<Map> GetCustomerList(ProductCustomerPatameters pcp);

	public int CustomerListCount(ProductCustomerPatameters pcp);

	public int UpdateProductStatus(HashMap<String, String> map);

	public int CreateNewProduct(ProductModel pm);

	public int CreateNewProductInfo(ProductModel pm);

	public int InsertProductNav(Nav nav);

	public ProductModel GetProductInfo(String trim);

	public int UpdateProduct(ProductModel pm);

	public int UpdateProductInfo(ProductModel pm);

	public void deleteProductNav(String productid);




}
