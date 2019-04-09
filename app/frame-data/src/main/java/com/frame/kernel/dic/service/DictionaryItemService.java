package com.frame.kernel.dic.service;

import java.sql.Timestamp;
import java.util.List;

import com.frame.kernel.dic.model.DictionaryItem;

public interface DictionaryItemService {
	public List<DictionaryItem> getDictionaryItemList(String dic_code, String dic_name, String dic_item_code,
													  String dic_item_name, String sortName, String sortOrder, int limit, int offset) throws Exception;

	public int getDictionaryItemListCount(String dic_code, String dic_name, String dic_item_code, String dic_item_name)
			throws Exception;

	public boolean updateDictionaryItemInfo(DictionaryItem dictionaryItem)throws Exception;

	public boolean saveDictionaryItemInfo(DictionaryItem dictionaryItem)throws Exception;

	public boolean ableDictionaryItem(List<String> ids, int userId, Timestamp systimestamp)throws Exception;

	public boolean disableDictionaryItem(List<String> ids, int userId, Timestamp systimestamp)throws Exception;
}
