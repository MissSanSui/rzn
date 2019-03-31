<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html>
<head>
<title>角色管理</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<script src="${ctx}/resources/js/user/ga.js"></script>
<script src="${ctx}/resources/js/user/lodash.min.js"></script>
<script type="text/javascript">

	$(function() {
		 var selections = [];
		 var userRoleIds = $("#userRoleIds").val();
			if (userRoleIds) {
				var aArray = userRoleIds.split(",");
				for ( var o in aArray) {
					selections.push(Number(aArray[o]));
				}
			}
			
			
		 /*
		 *翻页记录复选框勾选
		 */
		 $("#tb_rolelist").on('check.bs.table check-all.bs.table ' +
	                'uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
			 if(!$.isArray(rows)){
				 rows = [rows]
			 }
			 for(var o in rows){
				 if(rows[o][0]){
					 selections.push(rows[o]['role_id'])
				 }else{
					 for(var i in selections) {
						    if(selections[i] == rows[o]['role_id']) {
						    	selections.splice(i, 1);
						      break;
						    }
					  }
				 }
			 }
			 //去重
			 var hash=[],arr=[];
		      for (var i = 0; i < selections.length; i++) {
		        hash[selections[i]]!=null;
		        if(!hash[selections[i]]){
		          arr.push(selections[i]);
		          hash[selections[i]]=true;
		        }
		      }
			 selections = arr;
	        });
		 responseHandler =function (res) {
			  $.each(res.rows, function (i, row) {
		            row.state = $.inArray(row.role_id, selections) !== -1;
		        }); 	
	        return res;
		    }
		//初始化表格
		var TableInit = function() {
			var oTableInit = new Object();
			//初始化Table
			oTableInit.Init = function() {
				$('#tb_rolelist').bootstrapTable({
					url : '${ctx}/role/roleList', //请求后台的URL（*）
					method : 'get', //请求方式（*）
					toolbar : '#toolbar', //工具按钮用哪个容器
					maintainSelected : true, //设置为 true在点击分页按钮或搜索按钮时，将记住checkbox的选择项
					striped : true, //是否显示行间隔色
					cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					pagination : true, //是否显示分页（*）
					sortable : true, //是否启用排序
					sortName : 'role_name',
					sortOrder : "asc", //排序方式
					queryParams : oTableInit.queryParams,//传递参数（*）
					responseHandler: responseHandler ,//加载服务器数据之前的处理程序，可以用来格式化数据。 参数：res为从服务器请求到的数据。
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
					height : 480, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
					uniqueId : "role_id", //每一行的唯一标识，一般为主键列
					showToggle : false, //是否显示详细视图和列表视图的切换按钮
					cardView : false, //是否显示详细视图
					detailView : false, //是否显示父子表
					
					columns : [ {
				            checkbox : true 
					} ,{
						// field: 'Number',//可不加
						title : '序号',// 标题 可不加
						formatter : function(value, row, index) {
							return index + 1;
						}
					}, {
						field : 'role_id',
						title : 'role_id',
		                hidden: true
					},  {
						field : 'role_name',
						title : '角色名称',
						sortable : true
					}, {
						field : 'role_desc',
						title : '角色描述',
						sortable : false
					}, {
						field : 'role_type',
						title : '角色类型',
						sortable : true,
						formatter : function(value, row, index) {
							var displayValue = "";
							if (value == 'F') {
								displayValue = "功能类";
							} else if (value == 'R') {
								displayValue = "报表类";
							} else if (value == 'W') {
								displayValue = "流程类";
							} else {
								displayValue = value;
							}
							return displayValue;
						}

					} ]
				});
			};

			//得到查询的参数
			oTableInit.queryParams = function(params) {
				var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
					limit : params.limit, //页面大小
					offset : params.offset, //页码
					q_roleName : $("#q_roleName").val(),
					q_roleType : $("#q_roleType").val(),
					enable_flag : $("#enable_flag").val(),
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
		//1.初始化Table
		var oTable = new TableInit();
		oTable.Init();
		 
		//2.初始化Button的点击事件
		var oButtonInit = new ButtonInit();
		oButtonInit.Init();
		 //隐藏table列
	    $('#tb_rolelist').bootstrapTable('hideColumn', 'role_id');
		/*
		 * 人员角色默认初始化
		 */
		 $("#tb_rolelist").on('load-success.bs.table', function (data) {
			 var data = {
						field : "role_id",
						values : selections
					};
				$("#tb_rolelist").bootstrapTable("checkBy", data);
	  	 });
		//将选择的数据封装成map
		function getSelections() {
			return $.map($('#tb_rolelist').bootstrapTable('getSelections'),
					function(row) {
						return row;
					});
		}

		//查询
		$('#query').click(function() {
			$('#tb_rolelist').bootstrapTable('refresh', {
				url : '${ctx}/role/roleList'
			});
		});

		//保存数据
		$("#confirmUserRole").click(function() {
			if (selections.length < 1) {
				FrameUtils.alert("请选择需要保存的数据！");
				return;
			}
			var roleIds = "";
			for (var i = 0; i < selections.length; i++) {
				if (i == 0) {
					roleIds = roleIds + selections[i];
				} else {
					roleIds = roleIds + ',' + selections[i];
				}
			}
			var user_id = $("#user_id").val();
			if (!user_id) {
				FrameUtils.alert("获取用户信息失败！");
			}
			//保存
			$.ajax({
				type : "GET",
				contentType : "application/json;charset=UTF-8",
				url : '${ctx}/user/saveRoleUserMapping',
				data : {
					userId : user_id + "",
					roleIds : roleIds
				},
				async : false,
				dataType : 'JSON',
				success : function(result) {
					if (result.flag == "0") {
						FrameUtils.alert('保存成功！');
						window.location.href = "${ctx}/user/userList";
					} else {
						FrameUtils.alert(result.msg);
					}
				}
			});
		});

	});
</script>

</head>

<body>
	<div class="container frame-container">
		<div class="row frame-row" style="padding-bottom: 0px">
			<div class="frame-workspace">
				<div class="form-horizontal">
					<input type="hidden" id="userRoleIds" value="${userRoleIds }">
					<input type="hidden" id="user_id" value="${user_id }">
					<div class="form-group frame-form-group form-inline col-md-4">
					
						<label
							class="control-label frame-control-label frame-sm-label col-md-4"
							for="q_roleName">角色名称 ：</label> <input type="text"
							class="form-control input-sm frame-form-control frame-input-sm co col-md-8"
							id="q_roleName" />
					</div>

					<div class="form-group frame-form-group form-inline col-md-4">
						<label
							class="control-label frame-control-label frame-sm-label  col-md-4"
							for="q_roleType"> 角色类型：</label> <select
							class="form-control input-sm frame-form-control frame-input-sm col-md-8"
							id="q_roleType">
							<option value="">-请选择-</option>
							<option value="F">功能类</option>
							<option value="R">报表类</option>
							<option value="W">流程类</option>
						</select>
					</div>
					<!-- 默认查询启用角色 -->
					<input type="hidden" id="enable_flag"  value="Y"/>
					<div class="form-group frame-form-group form-inline col-md-4"
						style="visibility: hidden;">
						<label
							class="control-label frame-control-label frame-sm-label col-md-4"
							for="empty">占位用：</label> <input type="text"
							class="form-control frame-form-control input-sm frame-input-sm col-md-8"
							id="empty" />
					</div>
				</div>

				<div class="navbar-form frame-navbar-form navbar-right">
					<button id="query" type="button"
						class="btn btn-default btn-xs frame-btn-form  btn-primary"
						role="button">
						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
					</button>
					<button id="confirmUserRole" type="button"
						class="btn btn-default btn-xs frame-btn-form  btn-primary"
						role="button">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>确定
					</button>
					<button type="button"
						class="btn btn-default btn-xs frame-btn-form btn-primary"
						onclick="javascript:window.location.href='${ctx}/user/userList'"
						id="hideUserRole">取消</button>
				</div>
				<table id="tb_rolelist"></table>
			</div>
		</div>
	</div>
</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
