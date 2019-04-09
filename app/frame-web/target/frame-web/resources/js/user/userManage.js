/*
 *打开用户角色分配页面 
 */
function openRole (user_id){
	window.location.href = "${ctx}/../userRoleList?user_id="+user_id;
};
/*
 *查看详情
 */
function viewUserInfo(user_id) {
	 window.location.href="${ctx}/../userView?user_id="+user_id+"&org_id="+$('#org_id').val();
};
/*
 * 终止按钮
 */
function disableOne(id,obj) { 
	if ( obj == 'close') {
		FrameUtils.alert("不能重复终止用户！");
		return;
	}
	var ids =[];
	ids.push(id);
	$.ajax({
		type : "POST",
		contentType : "application/json;charset=UTF-8",
		url : '${ctx}/../disableUser',
		data : JSON.stringify(ids),
		async : false,
		dataType : 'JSON',
		success : function(result) {
			if (result.flag == "0") {
				$('#tb_userlist').bootstrapTable('refresh', {
					url : '${ctx}/../userPageList'
				});
			} else {
				FrameUtils.alert(result.msg);
			}
		}
	});
}
	/*
	 * 启用按钮
	 */
function enableOne(id,obj) {

	if (obj == 'open') {
		FrameUtils.alert("不能重复启用用户信息！");
		return;
	}
	var ids =[];
	ids.push(id);
	$.ajax({
		type : "POST",
		contentType : "application/json;charset=UTF-8",
		url : '${ctx}/../ableUser',
		data : JSON.stringify(ids),
		async : false,
		dataType : 'JSON',
		success : function(result) {
			if (result.flag == "0") {
				$('#tb_userlist').bootstrapTable('refresh', {
					url : '${ctx}/../userPageList'
				});
			} else {
				FrameUtils.alert(result.msg);
			}
		}
	});
}
/*
 * 人员列表初始化
 */
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#tb_userlist')
				.bootstrapTable(
						{
							url : '${ctx}/../userPageList', // 请求后台的URL（*）
							method : 'get', // 请求方式（*）
							toolbar : '#toolbar', // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : true, // 是否启用排序
							sortName : 'user_name',
							sortOrder : "asc", // 排序方式
							queryParams : oTableInit.queryParams,// 传递参数（*）
							sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
							pageNumber : 1, // 初始化加载第一页，默认第一页
							pageSize : 10, // 每页的记录行数（*）
							pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
							search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
							strictSearch : true,
							height : 495,
							showColumns : false, // 是否显示所有的列
							showRefresh : false, // 是否显示刷新按钮
							minimumCountColumns : 2, // 最少允许的列数
							clickToSelect : true, // 是否启用点击选中行
							uniqueId : "user_id", // 每一行的唯一标识，一般为主键列
							showToggle : false, // 是否显示详细视图和列表视图的切换按钮
							cardView : false, // 是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										checkbox : true
									},
									{
										// field: 'Number',//可不加
										title : '序号',// 标题 可不加
										formatter : function(value, row, index) {
											return index + 1;
										}
									},
									/*{
										field : 'company_name',
										title : '所属公司',
										sortable : false
									},*/
									{
										field : 'dept_name',
										title : '所属部门',
										sortable : true
									},
									{
										field : 'job',
										title : '职务',
										sortable : true
									},
									/*{
										field : 'user_name',
										title : '系统用户名称',
										sortable : false
									},*/
									{
										field : 'emp_name',
										title : '中文姓名',
										sortable : false
									},
									{
										field : 'telephone',
										title : '手机号码',
										sortable : false
									},
									/*{
										field : 'email',
										title : '邮箱',
										sortable : false
									},*/
									{
										field : 'user_status',
										title : '状态',
										sortable: true,
						                formatter: function (value, row, index) {
						                    var displayValue = "";
						                	if(value == 'open'){
						                		displayValue = "启用";
						                    }else{
						                    	displayValue = "禁用";
						                    }
						                	return displayValue;
						                }
									} ,
									{
										field : 'action',
										title : '操作',
										sortable : false,
										formatter : function(value, row, index) {
											var displayValue = "<button  type='button' class='btn btn-link btn-xs' name= 'assignmentRole' onclick='openRole("
													+ row.user_id
													+ ");'>分配角色</button>";
											return displayValue;
										}
									} ,
									{
										field : 'action',
										title : '详细信息',
										sortable : false,
										formatter : function(value, row, index) {
											var displayValue = "<button  type='button' class='btn btn-link btn-xs' name= 'viewUserInfo' id = 'viewUserInfo' onclick='viewUserInfo("
													+ row.user_id
													+ ");'>更多信息</button>";
											return displayValue;
										}
									}/* ,
									{
										field : 'action',
										title : '启用',
										sortable : false,
										formatter : function(value, row, index) {
											var displayValue = "<button  type='button' class='btn btn-link btn-xs' name= 'enableUserInfo' id = 'enableUserInfo' onclick=enableOne("
													+ row.user_id
													+",'"+row.user_status
													+ "');>启用</button>";
											return displayValue;
										}
									} ,
									{
										field : 'action',
										title : '终止',
										sortable : false,
										formatter : function(value, row, index) {
											var displayValue = "<button  type='button' class='btn btn-link btn-xs' name= 'disableUserInfo' id = 'disableUserInfo' onclick=disableOne("
													+ row.user_id
													+",'"+row.user_status
													+ "');>终止</button>";
											return displayValue;
										}
									}*/
									]
						});
	};

	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			emp_name : $("#query_emp_name").val(),
			email : $("#query_email").val(),
			telephone : $("#query_telephone").val(),
			user_status : $("#query_userStatues").val(),
			type :'list',
			sortName : params.sort,
			sortOrder : params.order,
			org_id: $('#org_id').val()
			
		};
		return temp;
	};
	return oTableInit;
};

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};
	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};
	return oInit;
};

$(function() {

	/*
	 * 用户列表
	 */
	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
	
	$.ajax({
        url: '${ctx}/../../org/getOrgNodeTree',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        success: function (result) {
            if (result.flag == '0') {
                var orgTree = [result.data.orgTree]; // 用数组包一层,控件只认数组格式
                $('#org_tree').treeview({
                    data: orgTree,
                    onNodeSelected: function (event, data) {
                    	
                    	if(data.id==0){
                    		
                    		document.getElementById("btn_add").disabled=true; 
            				document.getElementById("btn_edit").disabled=true; 
                    	}else{
                    		document.getElementById("btn_add").disabled=false; 
            				document.getElementById("btn_edit").disabled=false; 
                    	}
                        $('#org_id').val(data.id);
                        $('#org_name').val(data.text);
                        $('#tb_userlist').bootstrapTable('refresh', {
                            url: '${ctx}/../userPageList'
                        });
                    }
                })
            } else {
                FrameUtils.alert('加载组织树失败:' + result.msg);
            }
        }
    });
});


$(document).ready(
		function() {

			/*
			 * 获取用户列表勾选方法
			 */
			function getSelections() {
				return $.map($('#tb_userlist').bootstrapTable('getSelections'),
						function(row) {
							return row;
						});
			}
			$('#tb_userlist').bootstrapTable('refresh', {
				url : '${ctx}/../userPageList'
			});
			if($('#org_id').val()==0){
				document.getElementById("btn_add").disabled=true; 
				document.getElementById("btn_edit").disabled=true; 
			}
			/*
			 * 编辑按钮
			 */
			$('#btn_edit').click(function() {
				var aArray = getSelections();
				if (aArray.length < 1) {
					FrameUtils.alert("请选择需要编辑的数据！");
					return;
				} else if (aArray.length > 1) {
					FrameUtils.alert("只能选择一条数据编辑！");
					return;
				}
				var userTemp = aArray[0];
				var org_id = $('#org_id').val();
				$('#uEFOrg_id').val(org_id);
				$('#uEForg_name').val($('#org_name').val());
				$('#uEFuser_id').val(+userTemp.user_id);
				$('#userEditForm').attr("action" ,"${ctx}/../userEdit?type=update");
				$("#userEditForm").submit();
				 //window.location.href= "${ctx}/../userEdit?type=update&user_id="+userTemp.user_id+"&org_id="+org_id+"&org_name="+$('#org_name').val();
			});

			/*
			 * 查询按钮
			 */
			$('#query').click(function() {
				$('#tb_userlist').bootstrapTable('refresh', {
					url : '${ctx}/../userPageList'
				});
			});
			/*
			 * 批量终止按钮
			 */
			$('#btn_disable').click(function() {
				var aArray = getSelections();
				if (aArray.length < 1) {
					FrameUtils.alert("请选择需要终止的用户！");
					return;
				}
				var count = 0;

				var ids = [];
				for ( var o in aArray) {
					if (aArray[o].user_status == 'close') {
						count++;
					}
					ids.push(aArray[o].user_id);
				}
				if (count > 0) {
					FrameUtils.alert("不能重复终止用户！");
					return;
				}
				$.ajax({
					type : "POST",
					contentType : "application/json;charset=UTF-8",
					url : '${ctx}/../disableUser',
					data : JSON.stringify(ids),
					async : false,
					dataType : 'JSON',
					success : function(result) {
						if (result.flag == "0") {
							$('#tb_userlist').bootstrapTable('refresh', {
								url : '${ctx}/../userPageList'
							});
						} else {
							FrameUtils.alert(result.msg);
						}
					}
				});
			});
				/*
				 * 批量启用按钮
				 */
			$('#btn_able').click(function() {
				var aArray = getSelections();
				if (aArray.length < 1) {
					FrameUtils.alert("请选择需要启用的用户！");
					return;
				}
				var count = 0;

				var ids = [];
				for ( var o in aArray) {
					if (aArray[o].user_status == 'open') {
						count++;
					}
					ids.push(aArray[o].user_id);
				}
				if (count > 0) {
					FrameUtils.alert("不能重复启用用户信息！");
					return;
				}
				$.ajax({
					type : "POST",
					contentType : "application/json;charset=UTF-8",
					url : '${ctx}/../ableUser',
					data : JSON.stringify(ids),
					async : false,
					dataType : 'JSON',
					success : function(result) {
						if (result.flag == "0") {
							$('#tb_userlist').bootstrapTable('refresh', {
								url : '${ctx}/../userPageList'
							});
						} else {
							FrameUtils.alert(result.msg);
						}
					}
				});
			});
			$('#btn_add').click(function(){
				var org_id = $('#org_id').val();
				if(!org_id){
					FrameUtils.alert("请选择组织后，再新增用户。");
					return;
				}
				$('#uEFOrg_id').val(org_id);
				$('#uEForg_name').val($('#org_name').val());
				$('#userEditForm').attr("action" ,"${ctx}/../userEdit?type=new");
				$("#userEditForm").submit();
				//window.location.href= "${ctx}/../userEdit?type=new&org_id="+org_id+"&org_name="+$('#org_name').val();
			})

		});

