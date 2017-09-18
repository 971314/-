package com.pobo.model;

public class CustomerQueryParameters {
	String c_CustomerName;
	String c_PhoneNum;
	int c_RiskEvaluation;
	String orderField;
	String orderType;
	int currentPageIndex;
	int rowsPerPage;

	public String getC_CustomerName() {
		return c_CustomerName;
	}

	public void setC_CustomerName(String c_CustomerName) {
		this.c_CustomerName = c_CustomerName;
	}

	public String getC_PhoneNum() {
		return c_PhoneNum;
	}

	public void setC_PhoneNum(String c_PhoneNum) {
		this.c_PhoneNum = c_PhoneNum;
	}

	public int getC_RiskEvaluation() {
		return c_RiskEvaluation;
	}

	public void setC_RiskEvaluation(int c_RiskEvaluation) {
		this.c_RiskEvaluation = c_RiskEvaluation;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public int getCurrentPageIndex() {
		return currentPageIndex;
	}

	public void setCurrentPageIndex(int currentPageIndex) {
		this.currentPageIndex = currentPageIndex;
	}

	public int getRowsPerPage() {
		return rowsPerPage;
	}

	public void setRowsPerPage(int rowsPerPage) {
		this.rowsPerPage = rowsPerPage;
	}
}
