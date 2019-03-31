<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html lang="en">
	<head>
		<title>角色管理</title>
		<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
		<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
		<%@ include file="/WEB-INF/jsp/common/header.jsp" %>
		
		<script type="text/javascript">
			//角色和菜单映射
			function openMenu(obj){
				//设置角色
				$('#selectedRoleId').val(obj);
				if($('#tree').treeview()){
					$('#tree').treeview('remove');
				}
				//定义菜单窗口打开时的事件
			    $("#menu_modal").on('show.bs.modal', function (event) {
			    	$.ajax({
						//url : '${ctx}/menu/menuTree',
						url : '${ctx}/role/getMenuTreeNodeByRole',
						async : false,
						type : 'POST',
						data : {roleId :obj },
						dataType : 'JSON',
						success : function(result) {
							if (result.flag == "0") {
								var data = result.data;
								$('#tree').treeview({
									data : data,
									multiSelect : true,
									showCheckbox : true,
									onNodeChecked : function(event, node) {
										//选中父节点
										checkedParentNode(node);
										//选中当前节点的所有子节点
										selectAll(node);
										
									},
									onNodeUnchecked : function(event, node) {
										//判断当前兄弟节点是否存在选中的节点，如果没有，需要将父节点的选中状态取消
										uncheckedParentNode(node);
										//取消当前节点的所有子节点的选中状态
										unSelectAll(node);
									}
								});
								
								//展开所有节点
								$('#tree').treeview('expandAll', { levels: 2, silent: true });
							} else {
								 FrameUtils.alert('菜单加载出错！');
							}
						}
					});
	        	});
				
				//显示菜单树model
				$("#menu_modal").modal("show");
				
			}
			
			//递归设置父节点选中
			function checkedParentNode(node){
				if(node.parentId){
					$('#tree').treeview('checkNode', [ node.parentId, { silent: true } ]);
					var node1 = $('#tree').treeview('getNode', node.parentId);
					checkedParentNode(node1);
				}
			}
			
			//递归设置父节点取消选中
			function uncheckedParentNode(node){
				var flag = true;
				var siblings = $('#tree').treeview('getSiblings', node.nodeId);
				for(var i =0 ;i<siblings.length;i++){
					if(siblings[i].state.checked){
						flag = false;
						break;
					}
				}
				if(flag && node.parentId){
					$('#tree').treeview('uncheckNode', [ node.parentId, { silent: true } ]);
				}
				if(node.parentId){
					var parentNode = $('#tree').treeview('getNode', node.parentId);
					uncheckedParentNode(parentNode);
				}
			}
			
			//循环遍历选择当前节点的子节点选中
			function selectAll(node){
				if(node.nodeId && node.state.checked == false){
					$('#tree').treeview('checkNode', [ node.nodeId, { silent: true } ]);
				}
				var nodes = node.nodes;
				if(nodes && nodes.length > 0){
					for(var i=0;i<nodes.length;i++){
						selectAll(nodes[i]);
					}
				}
			}
			
			//循环遍历当前节点的子节点取消选中
			function unSelectAll(node){
				if(node.nodeId && node.state.checked == true){
					$('#tree').treeview('uncheckNode', [ node.nodeId, { silent: true } ]);
				}
				var nodes = node.nodes;
				if(nodes && nodes.length > 0){
					for(var i=0;i<nodes.length;i++){
						unSelectAll(nodes[i]);
					}
				}
			}
			
			//JQuery Start
			
			$(function () {
				//打印对象
				function writeObj(obj){ 
					 var description = ""; 
					 for(var i in obj){ 
					 var property=obj[i]; 
					 description+=i+" = "+property+"\n"; 
					 } 
					 FrameUtils.alert(description);
				} 
				
				//初始化表格
				var TableInit = function () {
				    var oTableInit = new Object();
				    //初始化Table
				    oTableInit.Init = function () {
				        $('#tb_rolelist').bootstrapTable({
				            url: '${ctx}/role/roleList',         //请求后台的URL（*）
				            method: 'get',                      //请求方式（*）
				            toolbar: '#toolbar',                //工具按钮用哪个容器
				            striped: true,                      //是否显示行间隔色
				            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				            pagination: true,                   //是否显示分页（*）
				            sortable: true,                     //是否启用排序
				            sortName: 'role_name',
				            sortOrder: "asc",                   //排序方式
				            queryParams: oTableInit.queryParams,//传递参数（*）
				            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
				            pageNumber:1,                       //初始化加载第一页，默认第一页
				            pageSize: 10,                       //每页的记录行数（*）
				            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
				            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				            strictSearch: true,
				            showColumns: false,                  //是否显示所有的列
				            showRefresh: false,                  //是否显示刷新按钮
				            minimumCountColumns: 2,             //最少允许的列数
				            clickToSelect: true,                //是否启用点击选中行
				            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				            uniqueId: "role_id",                     //每一行的唯一标识，一般为主键列
				            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
				            cardView: false,                    //是否显示详细视图
				            detailView: false,                   //是否显示父子表
				            columns: [{
				                checkbox: true
				            },{
								// field: 'Number',//可不加
								title : '序号',
								formatter : function(value, row, index) {
									return index + 1;
								}
							},{
				                field: 'role_id',
				                title: 'role_id',
				                hidden: true
				            },{
				                field: 'role_code',
				                title: '角色代码',
				                sortable: true
				            },{
				                field: 'role_name',
				                title: '角色名称',
				                sortable: true
				            }, {
				                field: 'role_desc',
				                title: '角色描述',
				                sortable: false
				            }, {
				                field: 'role_type',
				                title: '角色类型',
				                sortable: true,
				                formatter: function (value, row, index) {
				                    var displayValue = "";
				                	if(value == 'F'){
				                		displayValue = "功能类";
				                    }else if(value == 'R'){
				                    	displayValue = "报表类";
				                    }else if(value == 'W'){
				                    	displayValue = "流程类";
				                    }else{
				                    	displayValue = value;
				                    }
				                	return displayValue;
				                }
				                
				            }, {
				                field: 'enable_flag',
				                title: '启用标示',
				                sortable: false,
				                formatter: function (value, row, index) {
				                    var displayValue = "";
				                	if(value == 'Y'){
				                		displayValue = "启用";
				                    }else if(value == 'N'){
				                    	displayValue = "禁用";
				                    }else{
				                    	displayValue = value;
				                    }
				                	
				                	return displayValue;
				                }
				            }, {
				                field: 'action',
				                title: '操作',
				                sortable: false,
				                formatter: function (value, row, index) {
				                    var displayValue ="<button  type='button' class='btn btn-link btn-xs' name= 'assignmentMenu' onclick='openMenu("+ row.role_id +");'>分配菜单</button>";
				                    return displayValue;
				                }
				            } ]
				        });
				    };
		
				    //得到查询的参数
				    oTableInit.queryParams = function (params) {
				        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				            limit: params.limit,   //页面大小
				            offset: params.offset,  //页码
				            q_roleName: $("#q_roleName").val(),
				            q_roleType: $("#q_roleType").val(),
				            sortName: params.sort,
				            sortOrder: params.order
				        };
				        return temp;
				    };
				    return oTableInit;
				};
				
				var ButtonInit = function () {
				    var oInit = new Object();
				    var postdata = {};
				    oInit.Init = function () {
				        //初始化页面上面的按钮事件
				    };
				    return oInit;
				};
				//注册校验事件
				function registerValidate(obj){
					var urlCode= "${ctx}/role/roleCodeValid?role_id="+obj;
					var urlName= "${ctx}/role/roleNameValid?role_id="+obj;
					$('#roleEdit').bootstrapValidator({
				        message: '当前值无效',
				        feedbackIcons: {
				            valid: 'glyphicon glyphicon-ok',
				            invalid: 'glyphicon glyphicon-remove',
				            validating: 'glyphicon glyphicon-refresh'
				        },
				        fields: {
				        	role_code_a: {
				                validators: {
				                    notEmpty: {
				                        message: '角色代码不能为空!'
				                    },
				                    remote: {  
				                         url: urlCode ,
				                         message: '角色代码已存在',
				                         type: 'POST'//请求方式
				                    }
				                }
				            },
				        	role_name_a: {
				                validators: {
				                    notEmpty: {
				                        message: '角色名称不能为空!'
				                    },
				                    //threshold : 2 ,//有6字符以上才发送ajax请求
				                    remote: {  
				                         url: urlName ,
				                         message: '角色名称已存在',
				                         //delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
				                         type: 'POST'//请求方式
				                     }
				                   
				                }
				            },
				            role_type_a: {
				                validators: {
				                    notEmpty: {
				                        message: '角色类型不能为空!'
				                    }
				                }
				            }
				            
				        }
				    }).on('success.form.bv', function(e) {
				    	var data;
						if($('#role_id_a').val() =='' || $('#role_id_a').val() == null){
							data = { 
									role_code:$('#role_code_a').val(),
									role_name:$('#role_name_a').val(),
									role_desc:$('#role_desc_a').val(),
									role_type:$('#role_type_a').val(),
									enable_flag:$('#enable_flag_a').val()
						        };
						}else{
							data = {
									role_id:$('#role_id_a').val(), 
									role_code:$('#role_code_a').val(),
									role_name:$('#role_name_a').val(),
									role_desc:$('#role_desc_a').val(),
									role_type:$('#role_type_a').val(),
									enable_flag:$('#enable_flag_a').val()
					        	};
						}
						$.ajax({
							url: '${ctx}/role/saveRole',
							data: data,
							async: false,
							type: 'POST',
							dataType: 'JSON',
							success: function(result) {
								if (result.flag=="0") {
									FrameUtils.alert("保存成功");
									$("#role_modal").modal("hide");
									$('#tb_rolelist').bootstrapTable('refresh',{url: '${ctx}/role/roleList'});
								} else {
									FrameUtils.alert(result.msg);
								}
							}
						});
				    });
				}
				
				//1.初始化Table
			    var oTable = new TableInit();
			    oTable.Init();
			    
			    //2.初始化Button的点击事件
			    var oButtonInit = new ButtonInit();
			    oButtonInit.Init();
			    
			    //隐藏table列
			    $('#tb_rolelist').bootstrapTable('hideColumn', 'role_id');
			    
			    //隐藏弹出层
			    $("#role_modal").on('hidden.bs.modal', function (event) {
		    		var modal = $(this);
		    		$("#roleEdit").data('bootstrapValidator').destroy(); 
		    	});
			    
			    //将选择的数据封装成map
			    function getSelections() {
			        return $.map($('#tb_rolelist').bootstrapTable('getSelections'), function (row) {
			            return row;
			        });
			    }
			    
			    //查询
			    $('#query').click(function () {  
			        $('#tb_rolelist').bootstrapTable('refresh',{url: '${ctx}/role/roleList'});
			    });
			    
			    //新增
			    $('#btn_add').click(function(){
				    $("#role_modal").on('show.bs.modal', function (event) {
		        	   modal = $(this);
		        	   modal.find('#role_code_a').val('');
		        	   modal.find('#role_code_a').removeAttr("readonly");
		        	   modal.find('#role_name_a').val('');
		        	   modal.find('#role_desc_a').val('');
		        	   modal.find('#role_type_a').val('');
		        	   modal.find('#role_id_a').val('');
		        	   modal.find('#enable_flag_a').val('Y');
		        	});
				    registerValidate(0);
		            $("#role_modal").modal("show");
				});
			    
			    //编辑
			    $('#btn_edit').click(function(){
			    	var aArray = {};
			    	aArray = getSelections();
			        if(aArray.length < 1){
			        	FrameUtils.alert("请选择需要编辑的数据！");
			        	return;
			        }else if(aArray.length > 1){
			        	FrameUtils.alert("请选择一条数据进行编辑！");
			        	return;
			        }
			    	var role = aArray[0];
	            	$("#role_modal").on('show.bs.modal', function (event) {
		        	    modal = $(this);
		        	    modal.find('#role_code_a').val(role.role_code);
		        	    modal.find('#role_code_a').attr("readonly","readonly");
		        	    modal.find('#role_name_a').val(role.role_name);
		        	    modal.find('#role_desc_a').val(role.role_desc);
		        	    modal.find('#role_type_a').val(role.role_type);
		        	    modal.find('#role_id_a').val(role.role_id);
		        	    modal.find('#enable_flag_a').val(role.enable_flag);
		        	});
	            	registerValidate(role.role_id);
		            $("#role_modal").modal("show");
			    });
			    
			    //保存数据
			    $("#saveRole").click(function(){
			    	var bootstrapValidator = $("#roleEdit").data('bootstrapValidator');
					bootstrapValidator.validate();
					if(!bootstrapValidator.isValid()){
						return;
					} 
			    });
			    
			    //启用
			    $("#btn_able").click(function(){
			    	var aArray = {};
			    	aArray = getSelections();
			        if(aArray.length < 1){
			        	FrameUtils.alert("请选择需要启用的数据！");
			        	return;
			        }
			        var ids = [];
		            for(var o in aArray){
		        		ids.push(aArray[o].role_id);
		            }
		            $.ajax({
		          	  type:"POST", 
		          	  contentType : "application/json;charset=UTF-8",  
		              url: '${ctx}/role/rolesEnable',
		              data: JSON.stringify(ids),
		              async: false,
		              dataType: 'JSON',
		              success: function(result) {
		                  if (result.flag=="0") {
		                  	$('#tb_rolelist').bootstrapTable('refresh',{url: '${ctx}/role/roleList'});
		                  } else {
		                  	FrameUtils.alert(result.msg);
		                  }
	                  }
		            });
			    });
			    
			    //禁用
			    $("#btn_disable").click(function(){
			    	var aArray = {};
			    	aArray = getSelections();
			        if(aArray.length < 1){
			        	FrameUtils.alert("请选择需要禁用的数据！");
			        	return;
			        }
			        
			        var ids = [];
		            for(var o in aArray){
		        		ids.push(aArray[o].role_id);
		            }
		            
		            $.ajax({
		          	  type:"POST", 
		          	  contentType : "application/json;charset=UTF-8",  
		              url: '${ctx}/role/rolesDisable',
		              data: JSON.stringify(ids),
		              async: false,
		              dataType: 'JSON',
		              success: function(result) {
		                  if (result.flag=="0") {
		                  	$('#tb_rolelist').bootstrapTable('refresh',{url: '${ctx}/role/roleList'});
		                  } else {
		                  	FrameUtils.alert(result.msg);
		                  }
	                  }
		            });
			    });
			    
			    //全选
				$('#btn_selectAll').click(function(){
					var rootNode = $('#tree').treeview('getNode', 0);
					selectAll(rootNode);
				});
			    
				//取消全选
				$('#btn_unSelectAll').click(function(){
					var rootNode = $('#tree').treeview('getNode', 0);
					unSelectAll(rootNode);
				});
			    
			  	//保存角色和菜单的mapping
				$('#btn_saveRoleMenuMappin').click(function(){
					var roleId = $('#selectedRoleId').val();
					var $tree1 = $('#tree');
					var nodes = $tree1.treeview('getChecked', 0); 
					var menuIds = '';
					if(nodes.length > 0){
						for(var i =0 ;i<nodes.length;i++){
							if(i==0){
								menuIds = menuIds+nodes[i].id;
							}else{
								menuIds = menuIds+','+nodes[i].id;
							}
						}
					}
					//保存
					$.ajax({
		          	  type:"GET", 
		          	  contentType : "application/json;charset=UTF-8",  
		              url: '${ctx}/role/saveRoleMenuMapping',
		              data: {roleId:roleId,menuIds:menuIds},
		              async: false,
		              dataType: 'JSON',
		              success: function(result) {
		            	  if (result.flag=="0") {
								FrameUtils.alert(result.msg);
								$("#menu_modal").modal("hide");
								$('#tb_rolelist').bootstrapTable('refresh',{url: '${ctx}/role/roleList'});
							} else {
								FrameUtils.alert(result.msg);
							}
	                  }
		            });
				});
			});
		    
		</script>
		<!-- <style type="text/css">
		    .modal-header {
			    padding: 0px 15px;
			    border-bottom: 1px solid #e5e5e5;
			}
			.list-group-item {
			    position: relative;
			    display: block;
			    padding: 5px 15px;
			    margin-bottom: -1px;
			    background-color: #ffffff;
			    border: 1px solid #dddddd;
			}
		
		</style> -->
		
	</head>

	<body>
		<div class="frame-index">
		    <ul class="breadcrumb frame-index-breadcrumb">
		        <li><a href="#">系统管理</a></li>
		        <li><a href="#">角色管理</a></li>
		    </ul>
		</div>
		<div class="container frame-container">
	        <div class="row frame-row">
	            <div class="frame-workspace">
	                <div class="form-horizontal">
	                    <div class="form-group frame-form-group form-inline col-md-4">
	                        <label class="control-label frame-control-label frame-sm-label col-md-4"  for="q_roleName">角色名称 ：</label>
	                        <input type="text" class="form-control input-sm frame-form-control frame-input-sm co col-md-8" id="q_roleName" />
	                    </div>
	                    
	                    <div class="form-group frame-form-group form-inline col-md-4">
	                        <label class="control-label frame-control-label frame-sm-label  col-md-4" for="q_roleType"> 角色类型：</label>
	                        <select class="form-control input-sm frame-form-control frame-input-sm col-md-8" id="q_roleType">
	                            <option value="">-请选择-</option>
	                            <option value="F">功能类</option>
	                            <option value="R">报表类</option>
	                            <option value="W">流程类</option>
	                        </select>
	                    </div>
	                    
	                    <div class="form-group frame-form-group form-inline col-md-4" style="visibility: hidden;">
	                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="empty">占位用：</label>
	                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="empty" />
                    	</div>
	                </div>
	                
	                <div class="navbar-form frame-navbar-form navbar-right">
	                    <button id="query" type="button" class="btn btn-default btn-xs frame-btn-form" role="button">
	                       <span class="glyphicon glyphicon-search"  aria-hidden="true"></span>查询
	                    </button>
	        			<button id="btn_add" type="button" class="btn btn-default btn-xs frame-btn-form"   role="button">
	        				<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
	        			</button>
	        			<button id="btn_edit" type="button" class="btn btn-default btn-xs frame-btn-form" role="button">
	                       <span class="glyphicon glyphicon-pencil"  aria-hidden="true"></span>编辑
	                    </button>
						<button id="btn_able" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
	                       <span class="glyphicon glyphicon-ok"> </span>启用
	                    </button>
	                     <button id="btn_disable" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
	                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>禁用
	                    </button>       
	                </div>
	                <table id="tb_rolelist"></table>
	        	</div>
	        	<!-- 新增and编辑 弹出框 start -->
				<div class="modal frame-modal fade" id="role_modal" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="addRoleLabel">
					<div class="modal-dialog frame-modal-dialog" style="width: 40%">
						<div class="modal-content frame-modal-content">
							<div class="modal-header frame-modal-header">
								<button type="button" class="close frame-close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h3 class="modal-title frame-modal-title" id="addRoleLabel">角色维护</h3>
							</div>
							<div class="modal-body frame-modal-body" style="overflow-y: auto;">
								<form action="" id="roleEdit">
									<div class="col-md-12 column">
										<small><span style="color:red">*</span><label for="role_code_a" style="font-weight:normal">角色代码</label></small>
										<div class="form-group">
											 <input type="text" class="form-control frame-form-control input-sm"   id="role_code_a" name="role_code_a" />
										</div>
										
										<small><span style="color:red">*</span><label for="role_name_a" style="font-weight:normal">角色名称</label></small>
										<div class="form-group">
											 <input type="text" class="form-control frame-form-control input-sm"   id="role_name_a" name="role_name_a" />
										</div>
										
										<small><label for="role_desc_a" style="font-weight:normal">角色描述</label></small>
										<div class="form-group">
											 <textarea class="form-control frame-form-control input-sm" id="role_desc_a" name="role_desc_a" rows="5"></textarea>
										</div>
										
										<small><span style="color:red">*</span><label for="role_type_a" style="font-weight:normal">角色类型</label></small>
										<div class="form-group">
					                         <select class="form-control frame-form-control input-sm"  id="role_type_a" name="role_type_a">
					                            <option value="">-请选择-</option>
					                            <option value="F">功能类</option>
					                            <option value="R">报表类</option>
					                            <option value="W">流程类</option>
					                         </select>
										</div>
										<input type="hidden" id="role_id_a" name="role_id_a" value=""/>
										<input type="hidden" id="enable_flag_a" name="enable_flag_a" value="" />
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn frame-btn-form btn-default " data-dismiss="modal">取消</button>
								<button type="button" class="btn frame-btn-form btn-primary " id="saveRole">保存</button>
							</div>
						</div>
					</div>
				</div>
				<!-- 新增and编辑 弹出框 end -->
				<!-- 弹出层的模态窗口 start -->
				<div class="modal frame-modal fade" id="menu_modal" role="dialog" data-backdrop="static" data-keyboard="false">
					<div class="modal-dialog frame-modal-dialog" style="width: 40%">
						<div class="modal-content frame-modal-content">
							<div class="modal-header frame-modal-header">
								<button type="button" class="close frame-close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h3 class="modal-title frame-modal-title">分配菜单</h3>
								<input type="hidden" id="selectedRoleId" value=""/>
							</div>
							<div id="tree"></div>
							<div class="modal-footer">
								<button type="button" class="btn frame-btn-form btn-default " id="btn_selectAll">全选</button>
								<button type="button" class="btn frame-btn-form btn-default " id="btn_unSelectAll">取消全选</button>
								<button type="button" class="btn frame-btn-form btn-default " data-dismiss="modal">取消</button>
								<button type="button" class="btn frame-btn-form btn-primary " id="btn_saveRoleMenuMappin">保存</button>
							</div>
						</div>
					</div>
				</div>
				<!-- 弹出层的模态窗口 end -->
	        </div>
        </div>
	</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
