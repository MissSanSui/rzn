<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html>
<head>
<title>User Management</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
</head>


<script type="text/javascript">
	var TableInit = function() {
		var oTableInit = new Object();
		//初始化Table
		oTableInit.Init = function() {
			$('#tb_menulist').bootstrapTable({
				url : '${ctx}/menu/menuPageList', //请求后台的URL（*）
				method : 'get', //请求方式（*）
				//toolbar: '#toolbar',                //工具按钮用哪个容器
				striped : true, //是否显示行间隔色
				cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination : true, //是否显示分页（*）
				sortable : true, //是否启用排序
				sortName : 'display_order',
				sortOrder : "asc", //排序方式
				queryParams : oTableInit.queryParams,//传递参数（*）
				sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
				pageNumber : 1, //初始化加载第一页，默认第一页
				pageSize : 10, //每页的记录行数（*）
				pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
				search : false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				strictSearch : true,
				showColumns : false, //是否显示所有的列
				showRefresh : false, //是否显示刷新按钮
				minimumCountColumns : 2, //最少允许的列数
				clickToSelect : true, //是否启用点击选中行
				height : 450, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId : "user_id", //每一行的唯一标识，一般为主键列
				showToggle : false, //是否显示详细视图和列表视图的切换按钮
				cardView : false, //是否显示详细视图
				detailView : false, //是否显示父子表
				columns : [ {
					checkbox : true
				}, {
					field : 'display_order',
					title : '序列',
					sortable : true
				}, {
					field : 'menu_name',
					title : '菜单名称',
					sortable : true
				}, {
					field : 'url',
					title : '菜单地址',
					sortable : true
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
	            }  ]
			});
		};

		//得到查询的参数
		oTableInit.queryParams = function(params) {
			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit : params.limit, //页面大小
				offset : params.offset, //页码
				menu_name : $("#menu_name_query").val(),
				parent_id : $("#parent_id").val(),
				enable_flag : $("#enadbleFlag").val(),
				sortName : params.sort,
				sortOrder : params.order
			};
			return temp;
		};
		return oTableInit;
	};
	var ButtonInit = function() {
		var oInit = new Object();
		var postdata = {};

		oInit.Init = function() {
			//初始化页面上面的按钮事件
		};

		return oInit;
	};
	$(function() {
		function getSelections() {
	        return $.map($('#tb_menulist').bootstrapTable('getSelections'), function (row) {
	            return row;
	        });
		  }
		/*
		*增加update表达校验
		*/
		function formUpdateValidator(oldName,mid,pid){
			var url= "${ctx}/menu/menuNameValid?oldname="+oldName+"&menu_id="+mid+"&parent_id="+pid;
			$('#menuUpdateEdit').bootstrapValidator({
		        message: 'This value is not valid',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	update_menu_name: {
			                validators: {
			                	 notEmpty: {//非空验证：提示消息
			                         message: '菜单名称不能为空'
			                     },
			                     threshold :  1 , //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
			                     remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
			                         url: url ,//验证地址
			                         message: '菜单名称已存在',//提示消息
			                         delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
			                         type: 'POST'//请求方式
			                         /**自定义提交数据，默认值提交当前input value
			                          *  data: function(validator) {
			                               return {
			                                   password: $('[name="passwordNameAttributeInYourForm"]').val(),
			                                   whatever: $('[name="whateverNameAttributeInYourForm"]').val()
			                               };
			                            }
			                          */
			                     }
			                }
			            },
			            update_menu_desc: {
			                validators: {
			                	 notEmpty: {//非空验证：提示消息
			                         message: '菜单描述不能为空'
			                     } 
			                }
			            },
			            update_url: {
			                validators: {
			                	 notEmpty: {//非空验证：提示消息
			                         message: '菜单地址不能为空'
			                     } 
			                }
			            },
			            update_display_order: {
			                validators: {
			                	 notEmpty: {//非空验证：提示消息
			                         message: '展示顺序不能为空'
			                     },
			            		numeric: {message: '请输入数字'}  
			                }
			            }
		            }
		    })
		}
		/*  
		 增加表单校验
		*/
		function formAddValidator(pid){
			var url= '${ctx}/menu/menuNameValid?parent_id='+pid;
			$('#menuEdit')
		    .bootstrapValidator({
		        message: 'This value is not valid',
		        feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	menu_name: {
		                validators: {
		                	 notEmpty: {//非空验证：提示消息
		                         message: '菜单名称不能为空'
		                     },
		                     threshold :  1 , //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
		                     remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
		                         url: url ,//验证地址
		                         message: '菜单名称已存在',//提示消息
		                         delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
		                         type: 'POST'//请求方式
		                         /**自定义提交数据，默认值提交当前input value
		                          *  data: function(validator) {
		                               return {
		                                   password: $('[name="passwordNameAttributeInYourForm"]').val(),
		                                   whatever: $('[name="whateverNameAttributeInYourForm"]').val()
		                               };
		                            }
		                          */
		                     }
		                }
		            },
		            menu_desc: {
		                validators: {
		                	 notEmpty: {//非空验证：提示消息
		                         message: '菜单描述不能为空'
		                     } 
		                }
		            },
		            url: {
		                validators: {
		                	 notEmpty: {//非空验证：提示消息
		                         message: '菜单地址不能为空'
		                     } 
		                }
		            },
		            display_order: {
		                validators: {
		                	 notEmpty: {//非空验证：提示消息
		                         message: '展示顺序不能为空'
		                     },
		            		numeric: {message: '请输入数字'}  
		                }
		            }
		            
		        }
		    })
		}
		//1.初始化Table
		var oTable = new TableInit();
		oTable.Init();

		//2.初始化Button的点击事件
		var oButtonInit = new ButtonInit();
		oButtonInit.Init();
		$.ajax({
			url : '${ctx}/menu/menuTree',
			async : false,
			type : 'POST',
			dataType : 'JSON',
			success : function(result) {
				if (result.flag == "0") {
					var data = result.data;
					$('#tree').treeview({
						data : data,
						onNodeSelected : function(event, data) {
							$('#parent_id').val(data.id)
							$('#tb_menulist').bootstrapTable('refresh', {
								url : '${ctx}/menu/menuPageList'
							});
						}
					})
					//展开所有节点
					$('#tree').treeview('expandAll', { levels: 1, silent: true });
				} else {
					 FrameUtils.alert('加载出错！');
				}
			}
		});
		/*
		* 查询
		*/
		$('#query').click(function() {
			if($('#parent_id').val()==null ||$('#parent_id').val() ==""){
				  FrameUtils.alert("请选择父菜单！");
				  return
			  }
			$('#tb_menulist').bootstrapTable('refresh', {
				url : '${ctx}/menu/menuPageList'
			});
		});
		/*
		* 新增
		*/
		  $('#btn_add').click(function () { 
			  if($('#parent_id').val()==null ||$('#parent_id').val() ==""){
				  FrameUtils.alert("请选择父菜单！");
				  return
			  }
			  formAddValidator($('#parent_id').val());
	          $("#modal-container-new").modal("show");
		  });
		/*
		* 取消新增
		*/
		  $('#cancelMenu').click(function () { 
			  $("#menuEdit").data('bootstrapValidator').resetForm();  
	    	  $("#modal-container-new").modal("hide");
              $("#modal-container-new").on("hidden.bs.modal", function(event) {
             	 var modal = $(this);
             	  modal.find('#menu_name').val('');
              	  modal.find('#menu_desc').val('');
              	  modal.find('#url').val('');
              	  modal.find('#display_order').val('');
             	 
          	});
		  });
		
		/*
		* 保存新增
		*/
		  $('#saveMenu').click(function () {
			  var bootstrapValidator = $("#menuEdit").data('bootstrapValidator');
			  bootstrapValidator.validate();
			   if(!bootstrapValidator.isValid()){
				 return;
			   } 
			   $.ajax({
		            url: '${ctx}/menu/saveMenuInfo',
		            data: { 
		            	menu_name:$('#menu_name').val(),
		                menu_desc:$('#menu_desc').val(),
		                pmenu_id:$('#parent_id').val(),
		                url:$('#url').val(),
		                display_order:$('#display_order').val() 
		            },
		            async: false,
		            type: 'POST',
		            dataType: 'JSON',
		            success: function(result) {
		                if (result.flag=="0") {
		                	$.ajax({
		            			url : '${ctx}/menu/menuTree',
		            			async : false,
		            			type : 'POST',
		            			dataType : 'JSON',
		            			success : function(result) {
		            				if (result.flag == "0") {
		            					var data = result.data;
		            					$('#tree').treeview({
		            						data : data,
		            						onNodeSelected : function(event, data) {
		            							$('#parent_id').val(data.id)
		            							$('#tb_menulist').bootstrapTable('refresh', {
		            								url : '${ctx}/menu/menuPageList'
		            							});
		            						}
		            					})
		            					//展开所有节点
		            					$('#tree').treeview('expandAll', { levels: 1, silent: true });
		            				} else {
		            					 FrameUtils.alert('加载出错！');
		            				}
		            			}
		            		});
		                	//清空modal里的bootstrapValidator的校验痕迹
		                	$("#menuEdit").data('bootstrapValidator').resetForm();  
		                    $("#modal-container-new").modal("hide");
		                    $("#modal-container-new").on("hidden.bs.modal", function(event) {
		                   	 var modal = $(this);
		               		  modal.find('#menu_name').val('');
		                   	  modal.find('#menu_desc').val('');
		                   	  modal.find('#url').val('');
		                   	  modal.find('#display_order').val('');
		                	});
		                    $('#tb_menulist').bootstrapTable('refresh', {
		        				url : '${ctx}/menu/menuPageList'
		        			});
		                } else {
		                    FrameUtils.alert(result.msg);
		                }
		            }
		        });
		  });
		
		  /*
			* 编辑
			*/
			  $('#btn_edit').click(function () { 
				  if($('#parent_id').val()==null ||$('#parent_id').val() ==""){
					  FrameUtils.alert("请选择父菜单！");
					  return
				  }
				  var aArray =  getSelections();
		          if(aArray.length < 1){
		        	  FrameUtils.alert("请选择需要编辑的数据！");
		        	  return;
		          }else if(aArray.length > 1){
		        	  FrameUtils.alert("只能选择一条数据编辑！");
		        	  return;
		          }
		          var menuTemp = aArray[0];
		          formUpdateValidator(menuTemp.menu_name,menuTemp.menu_id,$('#parent_id').val());
		          $("#modal-container-update").on('shown.bs.modal', function (event) {
		        	  var modal = $(this)
		        	  modal.find('#update_menu_id').val(menuTemp.menu_id);
		        	  modal.find('#update_menu_name').val(menuTemp.menu_name);
		        	  modal.find('#menu_old_name').val(menuTemp.menu_name);
		        	  modal.find('#update_menu_desc').val(menuTemp.menu_desc);
		        	  modal.find('#update_url').val(menuTemp.url);
		        	  modal.find('#update_display_order').val(menuTemp.display_order);
		        	 });
		          $("#modal-container-update").modal("show");
			  });
			/*
			* 取消修改
			*/
			  $('#cancelUpdateMenu').click(function () { 
				  $("#menuUpdateEdit").data('bootstrapValidator').resetForm();  
		    	  $("#modal-container-update").modal("hide");
	              $("#modal-container-update").on("hidden.bs.modal", function(event) {
	             	 var modal = $(this);
	          	});
			  });
			/*
			*保存修改
			*/
			  $('#saveUpdateMenu').click(function () {  
				  $.ajax({
			            url: '${ctx}/menu/UpdateMenuInfo',
			            data: {
			            	menu_id:$('#update_menu_id').val(),
			            	menu_name:$('#update_menu_name').val(),
			            	menu_desc:$('#update_menu_desc').val(),
			            	url:$('#update_url').val(),
			            	display_order:$('#update_display_order').val()
			            },
			            async: false,
			            type: 'POST',
			            dataType: 'JSON',
			            success: function(result) {
			                if (result.flag=="0") {
			                	$.ajax({
			            			url : '${ctx}/menu/menuTree',
			            			async : false,
			            			type : 'POST',
			            			dataType : 'JSON',
			            			success : function(result) {
			            				if (result.flag == "0") {
			            					var data = result.data;
			            					$('#tree').treeview({
			            						data : data,
			            						onNodeSelected : function(event, data) {
			            							$('#parent_id').val(data.id)
			            							$('#tb_menulist').bootstrapTable('refresh', {
			            								url : '${ctx}/menu/menuPageList'
			            							});
			            						}
			            					})
			            					//展开所有节点
			            					$('#tree').treeview('expandAll', { levels: 1, silent: true });
			            					//清空modal里的bootstrapValidator的校验痕迹
			    		                	$("#menuUpdateEdit").data('bootstrapValidator').resetForm();  
			    		                    $("#modal-container-update").modal("hide");
			    		                    $('#tb_menulist').bootstrapTable('refresh', {
			    		        				url : '${ctx}/menu/menuPageList'
			    		        			});
			            				} else {
			            					 FrameUtils.alert('加载出错！');
			            				}
			            			}
			            		});
			                } else {
			                    FrameUtils.alert(result.msg);
			                }
			            }
			        });
			  });
			  $('#btn_disable').click(function () { 
		    	  var aArray =  getSelections();
		          if(aArray.length < 1){
		        	  FrameUtils.alert("请选择需要终止的菜单！");
		        	  return;
		          } 
		          var count = 0;
		          var ids = [];
		          for(var o in aArray){
		        	  if(aArray[o].enable_flag == 'N'){
		        		  count++;
		        	  }
		        	  ids.push(aArray[o].menu_id);
		          }
		          if(count>0){
		        	  FrameUtils.alert("不能重复终止菜单！");
		        	  return;
		          } 
		          $.ajax({
		        	  type:"POST", 
		        	  contentType : "application/json;charset=UTF-8",  
		              url: '${ctx}/menu/disableMenu',
		              data: JSON.stringify(ids),
		              async: false,
		              dataType: 'JSON',
		              success: function(result) {
		                  if (result.flag=="0") {
		                	  $.ajax({
			            			url : '${ctx}/menu/menuTree',
			            			async : false,
			            			type : 'POST',
			            			dataType : 'JSON',
			            			success : function(result) {
			            				if (result.flag == "0") {
			            					var data = result.data;
			            					$('#tree').treeview({
			            						data : data,
			            						onNodeSelected : function(event, data) {
			            							$('#parent_id').val(data.id)
			            							$('#tb_menulist').bootstrapTable('refresh', {
			            								url : '${ctx}/menu/menuPageList'
			            							});
			            						}
			            					})
			            					//展开所有节点
			            					$('#tree').treeview('expandAll', { levels: 1, silent: true });
			            				} else {
			            					 FrameUtils.alert('加载出错！');
			            				}
			            			}
			            		});
		                	  $('#tb_menulist').bootstrapTable('refresh', {
			        				url : '${ctx}/menu/menuPageList'
			        			});
		                  } else {
		                      FrameUtils.alert(result.msg);
		                  }
		              }
		          });
		      });
		      $('#btn_able').click(function () { 
		    	  var aArray =  getSelections();
		          if(aArray.length < 1){
		        	  FrameUtils.alert("请选择需要启用的用户！");
		        	  return;
		          } 
		          var count = 0;
		          
		          var count = 0;
		          var ids = [];
		          for(var o in aArray){
		        	  if(aArray[o].enable_flag == 'Y'){
		        		  count++;
		        	  }
		        	  ids.push(aArray[o].menu_id);
		          }
		          if(count>0){
		        	  FrameUtils.alert("不能重复启用菜单！");
		        	  return;
		          } 
		          $.ajax({
		        	  type:"POST", 
		        	  contentType : "application/json;charset=UTF-8",  
		        	  url: '${ctx}/menu/ableMenu',
		              data: JSON.stringify(ids),
		              async: false,
		              dataType: 'JSON',
		              success: function(result) {
		                  if (result.flag=="0") {
		                	  $.ajax({
			            			url : '${ctx}/menu/menuTree',
			            			async : false,
			            			type : 'POST',
			            			dataType : 'JSON',
			            			success : function(result) {
			            				if (result.flag == "0") {
			            					var data = result.data;
			            					$('#tree').treeview({
			            						data : data,
			            						onNodeSelected : function(event, data) {
			            							$('#parent_id').val(data.id)
			            							$('#tb_menulist').bootstrapTable('refresh', {
			            								url : '${ctx}/menu/menuPageList'
			            							});
			            						}
			            					})
			            					//展开所有节点
			            					$('#tree').treeview('expandAll', { levels: 1, silent: true });
			            				} else {
			            					 FrameUtils.alert('加载出错！');
			            				}
			            			}
			            		});
		                	  $('#tb_menulist').bootstrapTable('refresh', {
			        				url : '${ctx}/menu/menuPageList'
			        			});
		                  } else {
		                      FrameUtils.alert(result.msg);
		                  }
		              }
		          });
		      });
	});
</script>
<body>
	<div class="frame-index">
	    <ul class="breadcrumb frame-index-breadcrumb">
	        <li><a href="#">系统管理</a></li>
	        <li><a href="#">菜单管理</a></li>
	    </ul>
	</div>
	<div class="container frame-container">
		<div class="row frame-row">
			<div class="col-md-3 column">
				<div class="panel frame-panel panel-default">
				<div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title frame-panel-title">组织树</h3>
                </div>
				<div class="frame-workspace"
				
					style="height: 76%; max-height: 76%; overflow-y: auto;">
					<div id="tree"></div>
				</div>
				</div>
			</div>
			<div class="col-md-9 column">
				<div class="panel frame-panel panel-default">
				<div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title frame-panel-title">菜单列表</h3>
                </div>
				<div class="frame-workspace" style="height: 76%; max-height: 76%; overflow-y: auto;">
			
					<div class="form-group frame-form-group form-inline col-md-6">
						<label
							class="control-label frame-control-label frame-sm-label col-md-6"
							style="text-align: 'right'" for="menu_name_query">菜单名称：</label> <input
							type="text"
							class="form-control input-sm frame-form-control frame-input-sm co col-md-12"
							id="menu_name_query" /> <input type="hidden" id="parent_id" />
					</div>
					<div class="form-group frame-form-group form-inline col-md-6">
						<label
							class="control-label frame-control-label frame-sm-label  col-md-6"
							for="enadbleFlag">是否启用：</label> <select
							class="form-control input-sm frame-form-control frame-input-sm col-md-12"
							id="enadbleFlag">
							<option value="">-请选择-</option>
							<option value="Y">启用</option>
							<option value="N">禁用</option>
						</select>
					</div>
					<div class="form-group frame-form-group form-inline col-md-6"
						style="visibility: hidden;">
						<label
							class="control-label frame-control-label frame-sm-label col-md-6"
							for="empty">占位用：</label> <input type="text"
							class="form-control frame-form-control input-sm frame-input-sm col-md-12"
							id="zhanweiyong" />
					</div>

					<div class="navbar-form frame-navbar-form navbar-right">
						<button id="query" type="button"
							class="btn btn-default btn-xs frame-btn-form" role="button">
							<span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
						</button>
						<button id="btn_add" type="button"
							class="btn btn-default btn-xs frame-btn-form" role="button">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
						</button>
						<button id="btn_edit" type="button"
							class="btn btn-default btn-xs frame-btn-form" role="button">
							<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑
						</button>
						<button id="btn_able" type="button"
							class="btn btn-default btn-xs frame-btn-form" role="button">
							<span class="glyphicon glyphicon-ok"> </span>启用
						</button>
						<button id="btn_disable" type="button"
							class="btn btn-default btn-xs frame-btn-form" role="button">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
							禁用
						</button>
					</div>
					<div style="height: 450px;">
						<table id="tb_menulist"></table>
					</div>


					<div class="modal frame-modal fade" id="modal-container-new"
						role="dialog" data-backdrop="static" data-keyboard="false"
						aria-labelledby="AddMenuLabel">
						<div class="modal-dialog frame-modal-dialog">
							<div class="modal-content frame-modal-content">
								<!-- 模态框header -->
								<div class="modal-header frame-modal-header">
									<!-- 右上角的x -->
									<button type="button" class="close frame-close"
										data-dismiss="modal" aria-hidden="true">&times;</button>
									<!-- 模态框标题 -->
									<h3 class="modal-title frame-modal-title" id="AddMenuLabel">新建菜单</h3>
								</div>
								<div class="modal-body frame-modal-body"
									style="overflow-y: auto;">
									<form action="" id="menuEdit">
										<small> <span style="color: red">*</span> <label
											for="menu_name" style="font-weight: normal">菜单名称</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="menu_name" name="menu_name" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="menu_desc" style="font-weight: normal">菜单描述</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="menu_desc" name="menu_desc" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="url" style="font-weight: normal">菜单地址</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm" id="url"
												name="url" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="display_order" style="font-weight: normal">展示顺序</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="display_order" name="display_order" />
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn frame-btn-form btn-default"
										id="cancelMenu">取消</button>
									<button type="submit" class="btn frame-btn-form btn-primary"
										id="saveMenu">保存</button>
								</div>
							</div>
						</div>
					</div>

					<div class="modal frame-modal fade" id="modal-container-update"
						role="dialog" data-backdrop="static" data-keyboard="false"
						aria-labelledby="updateMenuLabel">
						<div class="modal-dialog frame-modal-dialog">
							<div class="modal-content frame-modal-content">
								<!-- 模态框header -->
								<div class="modal-header frame-modal-header">
									<!-- 右上角的x -->
									<button type="button" class="close frame-close"
										data-dismiss="modal" aria-hidden="true">&times;</button>
									<!-- 模态框标题 -->
									<h3 class="modal-title frame-modal-title" id="updateMenuLabel">编辑菜单</h3>
								</div>
								<div class="modal-body frame-modal-body"
									style="overflow-y: auto;">
									<form action="" id="menuUpdateEdit">

										<input type="hidden" id="update_menu_id" /> <input
											type="hidden" id="menu_old_name" /> <small> <span
											style="color: red">*</span> <label for="update_menu_name"
											style="font-weight: normal">菜单名称</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="update_menu_name" name="update_menu_name" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="update_menu_desc" style="font-weight: normal">菜单描述</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="update_menu_desc" name="update_menu_desc" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="update_url" style="font-weight: normal">菜单地址</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="update_url" name="update_url" />
										</div>
										<small> <span style="color: red">*</span> <label
											for="update_display_order" style="font-weight: normal">展示顺序</label>
										</small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="update_display_order" name="update_display_order" />
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn frame-btn-form btn-default"
										id="cancelUpdateMenu">取消</button>
									<button type="submit" class="btn frame-btn-form btn-primary"
										id="saveUpdateMenu">保存</button>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>
			</div>
		</div>
	</div>
</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
