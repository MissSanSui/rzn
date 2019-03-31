package com.frame.kernel.dic.dao;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.dic.model.DictionaryItem;

public interface DictionaryItemDao {
	
	public List<DictionaryItem> getDictionaryItemList(@Param("dic_code") String dic_code,
													  @Param("dic_name") String dic_name, @Param("dic_item_code") String dic_item_code,
													  @Param("dic_item_name") String dic_item_name, @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("startInt") int limit, @Param("limitInt") int offset);

	public int getDictionaryItemListCount(@Param("dic_code") String dic_code, @Param("dic_name") String dic_name,
										  @Param("dic_item_code") String dic_item_code, @Param("dic_item_name") String dic_item_name);

	public boolean updateDictionaryItemInfo(DictionaryItem dictionaryItem);

	public boolean saveDictionaryItemInfo(DictionaryItem dictionaryItem);

	public boolean ableDictionaryItem(@Param("ids") List<String> ids, @Param("userId") int userId, @Param("systimestamp") Timestamp systimestamp);

	public boolean disableDictionaryItem(@Param("ids") List<String> ids, @Param("userId") int userId, @Param("systimestamp") Timestamp systimestamp);
}
