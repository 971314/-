package com.pobo.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.pobo.model.Nav;

public class ExcelUtil {
	private static final String OFFICE_EXCEL_2003_POSTFIX = "xls";
	private static final String OFFICE_EXCEL_2010_POSTFIX = "xlsx";
	private static final String EMPTY = "";
	private static final String POINT = ".";
	private static final String NOT_EXCEL_FILE = " : Not the Excel file!";
	private static final String PROCESSING = "Processing...";

	public static List<Nav> readExcel(String path) throws IOException {
		if (path == null || EMPTY.equals(path)) {
			return null;
		} else {
			String postfix = getPostfix(path);
			if (!EMPTY.equals(postfix)) {
				if (OFFICE_EXCEL_2003_POSTFIX.equals(postfix)) {
					return readXls(path);
				} else if (OFFICE_EXCEL_2010_POSTFIX.equals(postfix)) {
					return null;// readXlsx(path);
				}
			} else {
				System.out.println(path + NOT_EXCEL_FILE);
			}
		}
		return null;
	}

	public List<Nav> readXlsx(String path) throws IOException {
		System.out.println(PROCESSING + path);
		InputStream is = new FileInputStream(path);
		XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);
		Nav nav = null;
		List<Nav> list = new ArrayList<Nav>(); // Read the Sheet
		for (int numSheet = 0; numSheet < xssfWorkbook.getNumberOfSheets(); numSheet++) {
			XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(numSheet);
			if (xssfSheet == null) {
				continue;
			}
			// Read the Row
			for (int rowNum = 1; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
				XSSFRow xssfRow = xssfSheet.getRow(rowNum);
				if (xssfRow != null) {
					nav = new Nav();
					XSSFCell date = xssfRow.getCell(0);
					XSSFCell unav = xssfRow.getCell(1);
					XSSFCell anav = xssfRow.getCell(2);
					nav.setDatetime(getValue(date));
					nav.setUnitNav(getValue(unav));
					nav.setAccNav(getValue(anav));
					list.add(nav);
				}
			}
		}
		return list;
	}

	private static List<Nav> readXls(String path) throws IOException {
		System.out.println(PROCESSING + path);
		InputStream is = new FileInputStream(path);
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		Nav nav = null;
		List<Nav> list = new ArrayList<Nav>();
		// Read the Sheet
		for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
			HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
			if (hssfSheet == null) {
				continue;
			}
			// Read the Row
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				HSSFRow hssfRow = hssfSheet.getRow(rowNum);
				if (hssfRow != null) {
					nav = new Nav();
					HSSFCell date = hssfRow.getCell(0);
					HSSFCell unav = hssfRow.getCell(1);
					HSSFCell anav = hssfRow.getCell(2);
					nav.setDatetime(getValue(date));
					nav.setUnitNav(getValue(unav));
					nav.setAccNav(getValue(anav));
					list.add(nav);
				}
			}
		}
		return list;
	}

	@SuppressWarnings("static-access")
	private String getValue(XSSFCell xssfCell) {
		if (xssfCell.getCellType() == xssfCell.CELL_TYPE_NUMERIC) {
			short format = xssfCell.getCellStyle().getDataFormat();
			SimpleDateFormat sdf = null;
			if (format == 14 || format == 31 || format == 57 || format == 58) {
				sdf = new SimpleDateFormat("yyyy-MM-dd");
				return sdf.format(xssfCell.getDateCellValue());
			} else {
				return String.valueOf(xssfCell.getNumericCellValue());
			}
		} else {
			return String.valueOf(xssfCell.getStringCellValue());
		}
	}

	@SuppressWarnings("static-access")
	private static String getValue(HSSFCell hssfCell) {
		if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
			short format = hssfCell.getCellStyle().getDataFormat();
			SimpleDateFormat sdf = null;
			if (format == 14 || format == 31 || format == 57 || format == 58) {
				sdf = new SimpleDateFormat("yyyy-MM-dd");
				return sdf.format(hssfCell.getDateCellValue());
			} else {
				return String.valueOf(hssfCell.getNumericCellValue());
			}
		} else {
			return String.valueOf(hssfCell.getStringCellValue());
		}
	}

	private static String getPostfix(String path) {
		if (path == null || EMPTY.equals(path.trim())) {
			return EMPTY;
		}
		if (path.contains(POINT)) {
			return path.substring(path.lastIndexOf(POINT) + 1, path.length());
		}
		return EMPTY;
	}
}
