package com.frame.kernel.dic.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.dic.model.Dictionary;
import com.frame.kernel.dic.model.DictionaryItem;

public interface DictionaryDao {
	
	public Dictionary getDictionaryByDicId(int dic_id);
	
	public List<Dictionary> getDictionaryList(@Param("dic_code") String dic_code, @Param("dic_name") String dic_name, @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("startInt") int limit, @Param("limitInt") int offset);

	public int getDictionaryListCount(@Param("dic_code") String dic_code, @Param("dic_name") String dic_name);

	public boolean saveDictionaryInfo(Dictionary dictionary);

	public boolean updateDictionaryInfo(Dictionary dictionary);

	public int dictionaryValid(String dic_code_a);

	public int dictionaryValidById(@Param("dic_id") String dic_id, @Param("dic_code_a") String dic_code_a);

	public List<DictionaryItem> getDictionaryItem(String dictionaryCode);

	public int getSquenceNum(String dicSequence);
}
