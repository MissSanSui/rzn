package com.frame.business.contracts.dao;

import com.frame.business.contracts.model.Contracts;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ContractsDao {

    public List<Contracts> getList(@Param("offset") int offset, @Param("limit") int limit
            , @Param("sortName") String sortName, @Param("sortOrder") String sortOrder,
                                   @Param("contract_no") String contract_no,
                                   @Param("contract_stu") String contract_stu,
                                   @Param("contract_room_no") String contract_room_no,
                                   @Param("contract_stu_name") String contract_stu_name) throws Exception;

    public int findCount(@Param("contract_no") String contract_no,
                         @Param("contract_stu") String contract_stu,
                         @Param("contract_room_no") String contract_room_no,
                         @Param("contract_stu_name") String contract_stu_name) throws Exception;

    public void saveContracts(Contracts contracts) throws Exception;

    public void updateContracts(Contracts contracts) throws Exception;
    public void deleteContracts(String contract_no) throws Exception;
    public Contracts findContracts(@Param("contract_no") String contract_no,
                                   @Param("contract_stu") String contract_stu,
                                   @Param("contract_room_no") String contract_room_no,
                                   @Param("contract_stu_name") String contract_stu_name) throws Exception;
    public List<Contracts> findContractsList(@Param("contract_no") String contract_no,
                                   @Param("contract_stu") String contract_stu,
                                   @Param("contract_room_no") String contract_room_no,
                                   @Param("contract_stu_name") String contract_stu_name) throws Exception;

}
