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
    public List<Contracts> getList(int offset, int limit, String sortName, String sortOrder, String contract_no,
                                   String contract_stu,
                                   String contract_room_no,
                                   String contract_stu_name) throws Exception {
        return contractsDao.getList(offset, limit, sortName, sortOrder, contract_no,
                contract_stu,
                contract_room_no,
                contract_stu_name

        );
    }

    @Override
    public int findCount(String contract_no,
                         String contract_stu,
                         String contract_room_no,
                         String contract_stu_name) throws Exception {
        return contractsDao.findCount(contract_no,contract_stu,
                contract_room_no,
                contract_stu_name);
    }

    @Override
    public void saveContracts(Contracts contracts) throws Exception {
        Contracts contractsFind = findContracts(contracts.getContract_no()+"",contracts.getContract_stu()+"",contracts.getContract_room_no()+"",null);
        if(null!=contractsFind){
            throw new Exception("已经存在对应关系");
        }

        contractsDao.saveContracts(contracts);
    }

    @Override
    public void updateContracts(Contracts contracts) throws Exception {
        Contracts contractsFind = findContracts(contracts.getContract_no()+"",contracts.getContract_stu()+"",contracts.getContract_room_no()+"",null);
        if(null!=contractsFind && contractsFind.getContract_no()!=contracts.getContract_no()){
            throw new Exception("已经存在对应关系");
        }
        contractsDao.updateContracts(contracts);

    }

    @Override
    public void deleteContracts(String contract_no) throws Exception {
        contractsDao.deleteContracts(contract_no);

    }

    @Override
    public Contracts findContracts(String contract_no,
                                   String contract_stu,
                                   String contract_room_no,
                                   String contract_stu_name) throws Exception {
        return contractsDao.findContracts(contract_no, contract_stu,
                contract_room_no,
                contract_stu_name);


    }
    @Override
    public List<Contracts> findContractsList(String contract_no,
                                             String contract_stu,
                                             String contract_room_no,
                                             String contract_stu_name) throws Exception {
        return contractsDao.findContractsList(contract_no, contract_stu,
                contract_room_no,
                contract_stu_name);


    }
}
