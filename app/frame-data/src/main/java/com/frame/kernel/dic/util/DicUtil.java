package com.frame.kernel.dic.util;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import com.frame.kernel.dic.model.DictionaryItem;
import com.frame.kernel.dic.service.DictionaryService;
@Component
public class DicUtil {
	@Autowired
	private DictionaryService dictionaryService;
	private static DicUtil  dicUtil ;
	@PostConstruct     
    public void init() {  
		dicUtil = this;  
		dicUtil.dictionaryService = this.dictionaryService;   // 初使化时将已静态化的dictionaryService实例化
    } 
	 public void setDictionaryService(DictionaryService  dictionaryService) {  
	        this.dictionaryService = dictionaryService;  
	    }  
	public static List<DictionaryItem> getDictionaryItem( String dictionaryCode) {
		List<DictionaryItem> list  = new ArrayList<DictionaryItem>();
		try {
			list  = dicUtil.dictionaryService.getDictionaryItem(dictionaryCode);
		} catch (Exception e) {
			e.printStackTrace();
			return list;
		}
		return list;
	}
	
	public static int getDicSquenceNum(String dicSqe) {
		return dicUtil.dictionaryService.getSquenceNum(dicSqe);
	}
}
