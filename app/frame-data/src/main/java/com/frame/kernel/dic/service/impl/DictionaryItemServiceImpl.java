package com.frame.kernel.dic.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frame.kernel.dic.dao.DictionaryItemDao;
import com.frame.kernel.dic.model.DictionaryItem;
import com.frame.kernel.dic.service.DictionaryItemService;

@Service
public class DictionaryItemServiceImpl implements DictionaryItemService {
	@Autowired
	private DictionaryItemDao dictionaryItemDao;

	@Override
	public List<DictionaryItem> getDictionaryItemList(String dic_code, String dic_name, String dic_item_code,
			String dic_item_name,String sortName,String sortOrder, int limit, int offset) throws Exception {

		return dictionaryItemDao.getDictionaryItemList(dic_code, dic_name, dic_item_code, dic_item_name, sortName,sortOrder,limit, offset);
	}

	@Override
	public int getDictionaryItemListCount(String dic_code, String dic_name, String dic_item_code, String dic_item_name)
			throws Exception {

		return dictionaryItemDao.getDictionaryItemListCount(dic_code, dic_name, dic_item_code, dic_item_name);
	}

	@Override
	public boolean updateDictionaryItemInfo(DictionaryItem dictionaryItem) throws Exception {

		return dictionaryItemDao.updateDictionaryItemInfo(dictionaryItem);
	}

	@Override
	public boolean saveDictionaryItemInfo(DictionaryItem dictionaryItem) throws Exception {
	
		return dictionaryItemDao.saveDictionaryItemInfo(dictionaryItem);
	}

	@Override
	public boolean ableDictionaryItem(List<String> ids, int userId, Timestamp systimestamp) throws Exception {
		
		return dictionaryItemDao.ableDictionaryItem(ids,userId,systimestamp);
	}

	@Override
	public boolean disableDictionaryItem(List<String> ids, int userId, Timestamp systimestamp) throws Exception {
		
		return dictionaryItemDao.disableDictionaryItem(ids,userId,systimestamp);
	}

}
