package com.frame.kernel.org.model;

import java.util.List;

public class OrgTreeNode {

	private String id;

	private String text;

	private List<?> nodes;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<?> getNodes() {
		return nodes;
	}

	public void setNodes(List<?> nodes) {
		this.nodes = nodes;
	}

}
