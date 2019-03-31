package com.frame.kernel.org.dao;

import java.util.Collection;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.org.model.Org;

public interface OrgDao {

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 22:40:41<br>
	 * Description: 根据父组织id查询其所有子组织,SQL中默认enable_flag为Y.
	 *
	 * @param pOrgId 父组织id
	 * @return List<Org> 该父组织下所有子组织
	 */
	List<Org> findByParentOrgId(@Param("pOrgId") int pOrgId, @Param("enableFlag") String enableFlag);

	Integer countByParentOrgId(@Param("pOrgId") int pOrgId, @Param("enableFlag") String enableFlag);

	Integer countByOrgId(@Param("orgId") int orgId, @Param("enableFlag") String enableFlag);

	Integer countByUserOrg(@Param("orgId") int orgId);

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 23:54:32<br>
	 * Description: 根据组织id查询组织,SQL中默认enable_flag为Y.
	 *
	 * @param orgId 组织id
	 * @return Org
	 */
	Org findByOrgId(@Param("orgId") int orgId, @Param("enableFlag") String enableFlag);

	List<Org> getPageList(@Param("offset") int offset, @Param("limit") int limit,
						  @Param("sortName") String sortName, @Param("sortOrder") String sortOrder, @Param("porg_id") String parentId,
						  @Param("org_name") String orgName);

	int getPageCount(@Param("porg_id") String parentId, @Param("org_name") String orgName);

	void saveOrg(Org org);

	void updateOrg(Org org);

	void enableOrg(@Param("ids") Collection<String> ids);

	void disableOrg(@Param("ids") Collection<String> ids);

	/**
	 * 2017-2-12 03:15:38
	 *
	 * @param parent_id
	 * @param org_code
	 * @param org_name
	 * @return
	 */
	int validateExistance(@Param("porg_id") String parent_id, @Param("org_code") String org_code,
						  @Param("org_name") String org_name);

}
