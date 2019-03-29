package com.frame.kernel.org.service;

import com.frame.kernel.org.model.Org;
import com.frame.kernel.org.model.OrgTreeNode;

import java.util.Collection;
import java.util.List;

public interface OrgService {

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 22:52:28<br>
	 * Description: 根据父组织id查询其所有子组织,SQL中默认enable_flag为Y.
	 *
	 * @param parentOrgId 父组织id
	 * @return List<Org> 该父组织下所有子组织
	 */
	List<Org> findByParentOrgId(int parentOrgId, String enableFlag);

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 23:58:04<br>
	 * Description: 根据组织id查询组织,SQL中默认enable_flag为Y.
	 *
	 * @param orgId 父组织id
	 * @return Org
	 */
	Org findByOrgId(int orgId, String enableFlag);

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-4 23:07:45<br>
	 * Description: 根据根组织id递归查询一颗组织树
	 *
	 * @param rootOrgId 根组织id
	 * @return OrgTreeNode 组织树的根节点
	 */
	OrgTreeNode getNodeTree(int rootOrgId);

	List<Org> getPageList(int offset, int limit, String sortName, String sortOrder, String parentId,
						  String orgName);

	int getPageCount(String parentId, String orgName);

	void saveOrg(Org org);

	void updateOrg(Org org);

	void enableOrg(Collection<String> ids);

	void disableOrg(Collection<String> ids);

	/**
	 * 2017-2-12 03:15:10
	 *
	 * @param parent_id
	 * @param org_code
	 * @param org_name
	 * @return
	 */
	int validateExistence(String parent_id, String org_code, String org_name);

	String checkDisable(int orgId);

	String checkEnable(int pOrgId);
}
