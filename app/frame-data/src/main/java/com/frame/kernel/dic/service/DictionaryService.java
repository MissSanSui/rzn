package com.frame.kernel.dic.service;

import java.util.List;

import com.frame.kernel.dic.model.Dictionary;
import com.frame.kernel.dic.model.DictionaryItem;

public interface DictionaryService {
	
	public Dictionary getDictionaryByDicId(int dic_id)throws Exception;
	
	public List<Dictionary> getDictionaryList(String dic_code, String dic_name, String sortName, String sortOrder, int startInt, int limitInt) throws Exception;

	public int getDictionaryListCount(String dic_code, String dic_name) throws Exception;

	public boolean saveDictionaryInfo(Dictionary dictionary) throws Exception;

	public boolean updateDictionaryInfo(Dictionary dictionary) throws Exception;

	public int dictionaryValid(String dic_code_a) throws Exception;

	public int dictionaryValidById(String dic_id, String dic_code_a)throws Exception;

	public List<DictionaryItem> getDictionaryItem(String dictionaryCode)throws Exception;
	public  int getSquenceNum(String dicSequence);
}
