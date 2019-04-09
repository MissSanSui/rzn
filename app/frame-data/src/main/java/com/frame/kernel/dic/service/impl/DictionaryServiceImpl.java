package com.frame.kernel.dic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frame.kernel.dic.dao.DictionaryDao;
import com.frame.kernel.dic.model.Dictionary;
import com.frame.kernel.dic.model.DictionaryItem;
import com.frame.kernel.dic.service.DictionaryService;

@Service
public class DictionaryServiceImpl implements DictionaryService {

	@Autowired
	private DictionaryDao dictionaryDao;
	
	@Override
	public Dictionary getDictionaryByDicId(int dic_id) throws Exception {
		
		return dictionaryDao.getDictionaryByDicId(dic_id);
	}
	
	@Override
	public List<Dictionary> getDictionaryList(String dic_code, String dic_name,String sortName , String sortOrder, int startInt, int limitInt)
			throws Exception {

		return dictionaryDao.getDictionaryList(dic_code, dic_name,sortName ,sortOrder, startInt, limitInt);
	}

	@Override
	public int getDictionaryListCount(String dic_code, String dic_name) throws Exception {

		return dictionaryDao.getDictionaryListCount(dic_code, dic_name);
	}

	@Override
	public boolean saveDictionaryInfo(Dictionary dictionary) throws Exception {
		
		return dictionaryDao.saveDictionaryInfo(dictionary);
	}

	@Override
	public boolean updateDictionaryInfo(Dictionary dictionary) throws Exception {

		return dictionaryDao.updateDictionaryInfo(dictionary);
	}

	@Override
	public int dictionaryValid(String dic_code_a) throws Exception {

		return dictionaryDao.dictionaryValid( dic_code_a);
	}

	@Override
	public int dictionaryValidById(String dic_id, String dic_code_a) throws Exception {
		
		return dictionaryDao.dictionaryValidById( dic_id,  dic_code_a);
	}

	@Override
	public List<DictionaryItem> getDictionaryItem(String dictionaryCode) throws Exception {
		
		return dictionaryDao.getDictionaryItem(dictionaryCode);
	}

	@Override
	public int getSquenceNum(String dicSequence) {
		return dictionaryDao.getSquenceNum( dicSequence);
	}

	

}
