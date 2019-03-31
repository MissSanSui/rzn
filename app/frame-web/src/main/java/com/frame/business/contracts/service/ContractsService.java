package com.frame.business.contracts.service;

import com.frame.business.contracts.model.Contracts;

import java.util.List;

public interface ContractsService {
    public List<Contracts> getList(int offset, int limit
            , String sortName, String sortOrder,
                                   String contract_no,
                                   String contract_stu,
                                   String contract_tea) throws Exception;

    public int findCount(String contract_no,
                             String contract_stu,
                             String contract_tea) throws Exception;

    public void saveContracts(Contracts contracts) throws Exception;

    public void updateContracts(Contracts contracts) throws Exception;

    public void deleteContracts(String contract_no) throws Exception;

    public Contracts findContracts(String contract_no,
                                   String contract_stu,
                                   String contract_tea) throws Exception;
}
