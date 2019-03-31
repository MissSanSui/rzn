package com.frame.kernel.org.service.impl;

import java.sql.Timestamp;
import java.util.*;

import com.frame.kernel.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.org.dao.OrgDao;
import com.frame.kernel.org.model.Org;
import com.frame.kernel.org.model.OrgTreeNode;
import com.frame.kernel.org.service.OrgService;

@Service
public class OrgServiceImpl implements OrgService {

	@Autowired
	private OrgDao orgDao;

	@Override
	public List<Org> findByParentOrgId(int parentOrgId, String enableFlag) {
		return orgDao.findByParentOrgId(parentOrgId, enableFlag);
	}

	@Override
	public Org findByOrgId(int orgId, String enableFlag) {
		return orgDao.findByOrgId(orgId, enableFlag);
	}

	@Override
	public OrgTreeNode getNodeTree(int rootOrgId) {
		Org rootOrg = findByOrgId(rootOrgId, null);
		List<OrgTreeNode> treeNodes = orgTreeNodeRecursion(rootOrgId);
		OrgTreeNode orgNodeTree = buildTreeNode(rootOrg, treeNodes);
		return orgNodeTree;
	}

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-5 00:28:39<br>
	 * Description: 组织树查询的递归方法
	 *
	 * @param orgId
	 * @return List<OrgTreeNode>
	 */
	private List<OrgTreeNode> orgTreeNodeRecursion(int orgId) {
		List<OrgTreeNode> orgTreeNodes = null;
		List<Org> orgList = findByParentOrgId(orgId, null);
		if (!CollectionUtils.isEmpty(orgList)) {
			orgTreeNodes = new ArrayList<>();
			for (Org org : orgList) {
				OrgTreeNode node = buildTreeNode(org, orgTreeNodeRecursion(org.getOrg_id()));
				orgTreeNodes.add(node);
			}
		}
		return orgTreeNodes;
	}

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-2-5 00:29:22<br>
	 * Description: 根据组织和子节点构造一个树节点,该节点是给bootstrap-treeview用的.
	 *
	 * @param org
	 * @param sonNodes
	 * @return OrgTreeNode
	 */
	private OrgTreeNode buildTreeNode(Org org, List<OrgTreeNode> sonNodes) {
		OrgTreeNode node = new OrgTreeNode();
		node.setId(org.getOrg_id() + "");
		node.setText(org.getOrg_name());
		node.setNodes(sonNodes);
		return node;
	}

	@Override
	public List<Org> getPageList(int offset, int limit, String sortName, String sortOrder, String parentId,
								 String orgName) {
		return orgDao.getPageList(offset, limit, sortName, sortOrder, parentId, orgName);
	}

	@Override
	public int getPageCount(String parentId, String orgName) {
		return orgDao.getPageCount(parentId, orgName);
	}

	@Override
	public void saveOrg(Org org) {
		org.setCreated_date(new Timestamp(new Date().getTime()));
		org.setCreated_by(-1);
		org.setLast_updated_date(new Timestamp(new Date().getTime()));
		org.setLast_updated_by(-1);
		org.setCompany_flag(BIZConstants.ENABLE_N);
		org.setEnable_flag(BIZConstants.ENABLE_Y);
		orgDao.saveOrg(org);
	}

	@Override
	public void updateOrg(Org org) {
		org.setLast_updated_date(new Timestamp(new Date().getTime()));
		orgDao.updateOrg(org);
	}

	@Override
	public void enableOrg(Collection<String> ids) {
		orgDao.enableOrg(ids);
	}

	@Override
	public void disableOrg(Collection<String> ids) {
		orgDao.disableOrg(ids);
	}

	@Override
	public int validateExistence(String parent_id, String org_code, String org_name) {
		return orgDao.validateExistance(parent_id, org_code, org_name);
	}

	@Override
	public String checkDisable(int orgId) {
		Integer count = orgDao.countByParentOrgId(orgId, "Y");
		if (count > 0) {
			return "-1";
		}

		count = orgDao.countByUserOrg(orgId);
		if (count > 0) {
			return "-2";
		}

		return "0";
	}

	@Override
	public String checkEnable(int pOrgId) {
		Integer count = orgDao.countByOrgId(pOrgId, "N");
		if (count > 0) {
			return "-1";
		}

		return "0";
	}

}
