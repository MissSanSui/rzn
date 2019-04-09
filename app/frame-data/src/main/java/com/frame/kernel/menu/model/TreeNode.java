package com.frame.kernel.menu.model;

import java.util.List;

import com.frame.kernel.base.model.impl.BaseModelImpl;

public class TreeNode extends BaseModelImpl {
	private static final long serialVersionUID = 1L;
	private String text;
	private List<TreeNode> nodes;
	private String id;
	private State state;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<TreeNode> getNodes() {
		return nodes;
	}

	public void setNodes(List<TreeNode> nodes) {
		this.nodes = nodes;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
	
	

}
