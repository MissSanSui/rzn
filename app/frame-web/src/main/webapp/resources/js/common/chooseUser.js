/**
 * Created by wangsen on 2017/11/25.
 * 查询人员公共库
 */
var callBackFunction;
var selections = [];
var singleFlag = true;
//定义用户列表
var UserTableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        $('#tb_selectuserlist').bootstrapTable({
            url: '',       
            method: 'get',                     
            striped: true,
            cache: false,
            pagination: true,
            sortable: true,
            sortOrder: "asc",
            queryParams: oTableInit.queryParams,
            sidePagination: "server",
            pageNumber:1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            search: false,
            strictSearch: true,
            showColumns: false,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            uniqueId: "user_id",
            showToggle: false,
            cardView: false,
            detailView: false,
            columns: [ {
                checkbox: true
            }, {
                field: 'emp_name',
                title: '姓名'
            }, {
                field: 'english_name',
                title: '英文名'
            }, {
                field: 'email',
                title: 'email'
            }]
        });
    };

    oTableInit.queryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            role_code_q: $("#role_code_q").val(),
            emp_name_q: $("#emp_name_q").val(),
            sortName: params.sort,
            sortOrder: params.order
        };
        return temp;
    };
    return oTableInit;
};

//查询数据
var userSelectTable = new UserTableInit();
userSelectTable.Init();

//在列表中回显数据
$("#tb_selectuserlist").on('load-success.bs.table', function (data) {
	var data = {
		field : "user_id",
		values : selections
	}
	$("#tb_selectuserlist").bootstrapTable("checkBy", data);
});

//当选择的人员的时候，加载到数组和显示名称中
$("#tb_selectuserlist").on('check.bs.table check-all.bs.table ', function (e, rows) {
	var row = "";
	var index = 0;
	if(!$.isArray(rows)){
		row = rows;
		//如果是单选，则清除现有的，增加新的
		if(singleFlag){
			selections = [];
			$('#selected_userids').val("");
			$('#selected_usernames').val("");
		}
		index = jQuery.inArray(row.user_id,selections);
		if(index ==-1){
			selections.push(rows.user_id);
			var tempUserId = $('#selected_userids').val();
			var tempUserName = $('#selected_usernames').val();
			if(tempUserId){
				$('#selected_userids').val(tempUserId+","+rows.user_id);
				$('#selected_usernames').val(tempUserName+','+rows.emp_name);
			}else{
				$('#selected_userids').val(rows.user_id);
				$('#selected_usernames').val(rows.emp_name);
			}
		}
		
	}else{
		for(var i in rows){
			row = rows[i];
			index = jQuery.inArray(row.user_id,selections);
			if(index == -1){
				selections.push(row.user_id);
				var tempUserId = $('#selected_userids').val();
				var tempUserName = $('#selected_usernames').val();
				if(tempUserId){
					$('#selected_userids').val(tempUserId+","+row.user_id);
					$('#selected_usernames').val(tempUserName+','+row.emp_name);
				}else{
					$('#selected_userids').val(row.user_id);
					$('#selected_usernames').val(row.emp_name);
				}
			}
		}
	}
});

//当前人如果被勾选到，则在数组和显示名称中取消该人员
$('#tb_selectuserlist').on('uncheck.bs.table uncheck-all.bs.table',function(e,rows){
	var row = "";
	var index = 0;
	if(!$.isArray(rows)){
		row = rows;
		index = jQuery.inArray(row.user_id,selections);
		if(index >=0 ){
			selections.splice(index,1);
			var tempUserId = $('#selected_userids').val();
			var tempUserName = $('#selected_usernames').val();
			if(tempUserId){
				if(tempUserId.indexOf(","+row.user_id)>=0){
					$('#selected_userids').val(tempUserId.replace(","+row.user_id,""));
					$('#selected_usernames').val(tempUserName.replace(','+row.emp_name,""));
				}else if(tempUserId.indexOf(row.user_id+",")>=0){
					$('#selected_userids').val(tempUserId.replace(row.user_id+",",""));
					$('#selected_usernames').val(tempUserName.replace(row.emp_name+",",""));
				}else if(tempUserId == row.user_id){
					$('#selected_userids').val("");
					$('#selected_usernames').val("");
				}
			}
		}else{
			//对于初始值为多个值，而且当先为单选，那么就要刷新一下
			if(selections.length >0 && singleFlag){
				$('#tb_selectuserlist').bootstrapTable('refresh',{url: '/frame/task/getSponsor'});
			}
		}
		
	}else{
		for(var o in rows){
			row = rows[o];
			index = jQuery.inArray(row.user_id,selections);
			if(index >=0 ){
				selections.splice(index,1);
				var tempUserId = $('#selected_userids').val();
				var tempUserName = $('#selected_usernames').val();
				if(tempUserId){
					if(tempUserId.indexOf(","+row.user_id)>=0){
						$('#selected_userids').val(tempUserId.replace(","+row.user_id,""));
						$('#selected_usernames').val(tempUserName.replace(','+row.emp_name,""));
					}else if(tempUserId.indexOf(row.user_id+",")>=0){
						$('#selected_userids').val(tempUserId.replace(row.user_id+",",""));
						$('#selected_usernames').val(tempUserName.replace(row.emp_name+",",""));
					}else if(tempUserId == row.user_id){
						$('#selected_userids').val("");
						$('#selected_usernames').val("");
					}
				}
			}
		}
	}
});

//点击保存，调用回调函数
$('#user_confirm').click(function(){
	var selected_userids = $("#selected_userids").val();
	var selected_usernames = $("#selected_usernames").val();
	callBackFunction(selected_userids,selected_usernames);
	$('#choose_user_modal').modal("hide");
	
});

//查询
$('#user_query').click(function(){
	$('#tb_selectuserlist').bootstrapTable('refresh',{url: '/frame/user/commonUserPageList'});
});

//模态窗口关闭时
$("#choose_user_modal").on('hidden.bs.modal', function (event) {
	$('#selected_userids').val("");
	$('#selected_usernames').val("");
	$("#emp_name_q").val("");
	$("#role_code_q").val("");
	$("#tb_selectuserlist").bootstrapTable("uncheckAll");
});

/**
 * js入口
 * v_userids:初始化加载的人员信息
 * v_userNames:初始化加载的人员姓名
 * v_role_code:过滤的角色，为空默认全查
 * singalFlg:是否单选
 * callback:回调函数
 */
function chooseUserModel(v_userids,v_userNames,v_role_code,v_singleFlg,callback){
	callBackFunction = callback;
	$('#selected_userids').val(v_userids);
	$('#selected_usernames').val(v_userNames);
	$('#role_code_q').val(v_role_code);
	var selectionsStr = [];
	//回显已经选择的人员，注意需要将字符数组转换为数据数组
	if(v_userids){
		selectionsStr = v_userids.split(","); 
		selectionsStr.forEach(function(data,index,arr){  
			selections.push(+data);  
		});  
	}
	//显示模态框
	$('#choose_user_modal').modal("show");
	if(v_singleFlg == false){
		singleFlag = v_singleFlg;
	}else{
		singleFlag = true;
	}
	//设置表格
	$('#tb_selectuserlist').bootstrapTable('refreshOptions', {singleSelect:singleFlag,url: '/frame/user/commonUserPageList'});
}

