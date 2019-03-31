package com.frame.business.contracts.service.impl;

import com.frame.business.contracts.dao.ContractsDao;
import com.frame.business.contracts.model.Contracts;
import com.frame.business.contracts.service.ContractsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class ContractsServiceimpl implements ContractsService {
    @Autowired
    private ContractsDao contractsDao;

    @Override
    public List<Contracts> getList(int offset, int limit, String sortName, String sortOrder, String contract_no, String contract_stu, String contract_tea) throws Exception {
        return contractsDao.getList(offset,limit,sortName,sortOrder,contract_no,contract_stu,contract_tea);
    }

    @Override
    public int findCount(String contract_no, String contract_stu, String contract_tea) throws Exception {
        return  contractsDao.findCount(contract_no,contract_stu,contract_tea);
    }

    @Override
    public void saveContracts(Contracts contracts) throws Exception {
        contractsDao.saveContracts(contracts);
    }

    @Override
    public void updateContracts(Contracts contracts) throws Exception {
        contractsDao.updateContracts(contracts);

    }
    @Override
    public void deleteContracts(String contract_no) throws Exception{
        contractsDao.deleteContracts(contract_no);

    }
    @Override
    public Contracts findContracts(String contract_no,
                                   String contract_stu,
                                   String contract_tea) throws Exception{
        return contractsDao.findContracts(contract_no,contract_stu,contract_tea);
    }
}
