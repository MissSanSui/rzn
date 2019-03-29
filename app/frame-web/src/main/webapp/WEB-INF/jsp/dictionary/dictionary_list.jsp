<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>
<title>字典定义</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>

<script type="text/javascript">
$(function() {
	
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    //$('#tb_diclist').bootstrapTable('hideColumn', 'dic_id');
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_diclist').bootstrapTable({
            url: '${ctx}/dictionary/dictionaryPageList',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortName:"dic_code",
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
            height: 487,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "dic_id",                 //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [ {
                checkbox: true
            }, {
                field: 'dic_code',
                title: '字典编码',
                sortable: true
            }, {
                field: 'dic_name',
                title: '字典名称',
                sortable: true
            }, {
                field: 'dic_desc',
                title: '字典描述'
            },{
                field: "dic_id",
                title: "字典明细",
                formatter: function (value, row, index) {
                    return "<button  type=\"button\" class=\"btn btn-link btn-xs \" onclick=\"show_item("+ value +");\">管理</button>";
                }
            }]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //起始条数
            dic_code: $("#dic_code").val(),
            dic_name: $("#dic_name").val(),
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
$(document).ready(function(){
	
	function formValidator(val){
		var url= '${ctx}/dictionary/dictionaryValid?dic_id='+val;
		$('#dicEdit').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	            dic_code_a: {
	            	 validators: {
	                     notEmpty: {//非空验证：提示消息
	                         message: '字典编码不能为空'
	                     },
	                     threshold : 1 , //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
	                     remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
	                         url: url ,//验证地址
	                         message: '字典编码已存在',//提示消息
	                         delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
	                         type: 'POST'//请求方式
	                     }
	                 }
	             },
	             dic_name_a: {
		            	 validators: {
		                     notEmpty: {
		                         message: '字典名称不能为空!'
		                     }
		                 }
		             }
	            }
	    })
	}
	
	  $('#query').click(function () {  
          $('#tb_diclist').bootstrapTable('refresh',{url: '${ctx}/dictionary/dictionaryPageList'});
      });
	  
	  function getSelections() {
	        return $.map($('#tb_diclist').bootstrapTable('getSelections'), function (row) {
	            return row;
	        });
	  }
	  $("#dic_modal").on('hidden.bs.modal', function (event) {
    	  var modal = $(this);
    	  $("#dicEdit").data('bootstrapValidator').destroy(); 
    	 });
	  $('#btn_add').click(function(){
		  
		  $("#dic_modal").on('show.bs.modal', function (event) {
        	  var modal = $(this)
        	  modal.find('#dic_id_a').val('');
        	  modal.find('#dic_code_a').val('');
        	  modal.find('#dic_name_a').val('');
        	  modal.find('#dic_desc_a').val('');
        	 });
		  formValidator(0);
          $("#dic_modal").modal("show");
	  });
      $('#btn_edit').click(function () {  
    	  var aArray = {};
    	  aArray = getSelections();
          if(aArray.length < 1){
        	  FrameUtils.alert("请选择需要编辑的数据！");
        	  return;
          }else if(aArray.length > 1){
        	  FrameUtils.alert("只能选择一条数据编辑！");
        	  return;
          }
          var dic = aArray[0];
          formValidator(dic.dic_id);
          $("#dic_modal").on('show.bs.modal', function (event) {
        	  var modal = $(this);
        	  modal.find('#dic_id_a').val('');
        	  modal.find('#dic_code_a').val('');
        	  modal.find('#dic_name_a').val('');
        	  modal.find('#dic_desc_a').val('');
        	  modal.find('#dic_id_a').val(dic.dic_id);
        	  modal.find('#dic_code_a').val(dic.dic_code);
        	  modal.find('#dic_name_a').val(dic.dic_name);
        	  modal.find('#dic_desc_a').val(dic.dic_desc);
        	 });
          $("#dic_modal").modal("show");
      });
	 $("#saveDcitionary").click(function(){
		
		var bootstrapValidator = $("#dicEdit").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return;
		} 
		var data;
		if($('#dic_id_a').val() =='' || $('#dic_id_a').val() == null){
			data = { 
					dic_code:$('#dic_code_a').val(),
					dic_name:$('#dic_name_a').val(),
					dic_desc:$('#dic_desc_a').val()
		        };
		}else{
			data = {
					dic_id:$('#dic_id_a').val(), 
					dic_code:$('#dic_code_a').val(),
					dic_name:$('#dic_name_a').val(),
					dic_desc:$('#dic_desc_a').val()
	        	};
		}
		$.ajax({
			url: '${ctx}/dictionary/saveDictionaryInfo',
			data: data,
			async: false,
			type: 'POST',
			dataType: 'JSON',
			success: function(result) {
				if (result.flag=="0") {
					$("#dic_modal").modal("hide");
					$('#tb_diclist').bootstrapTable('refresh',{url: '${ctx}/dictionary/dictionaryPageList'});
				} else {
					FrameUtils.alert("error");
				}
			}
		});
	}); 
});
function show_item(val){
	location.href = "${ctx}/dictionaryItem/dictionary_item_list?dic_id="+val+"";
}
</script>

</head>

<body>
	<div class="frame-index">
	    <ul class="breadcrumb frame-index-breadcrumb">
	        <li><a href="#">系统管理</a></li>
	        <li><a href="#">字典管理</a></li>
	    </ul>
	</div>
	<div class="container frame-container">
		<div class="row frame-row">
            <div class="frame-workspace">
	            <div class="form-horizontal">
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_code">字典编码：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_code" />
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_name">字典名称：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_name" />
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4" style="visibility: hidden;">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="empty">占位用：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="zhanweiyong" />
                    </div>
	             </div>
	             <div  class="navbar-form frame-navbar-form navbar-right">
		            <button id="query" type="button" class="btn btn-default btn-xs frame-btn-form" role="button">
		               <span class="glyphicon glyphicon-search"  aria-hidden="true"> </span>查询
		            </button>
					<button id="btn_add" type="button" class="btn btn-default btn-xs frame-btn-form" role="button">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button id="btn_edit" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
		               <span class="glyphicon glyphicon-pencil"  aria-hidden="true"></span>编辑
		            </button>
        		</div>
		
				<table id="tb_diclist"></table>
				<div class="row clearfix"></div>
			</div>
			
			<!-- 新增and编辑 弹出框 start -->
			<div class="modal frame-modal fade" id="dic_modal" role="dialog" data-backdrop="static" data-keyboard="false"
				aria-labelledby="AddDictionaryLabel">
				<div class="modal-dialog frame-modal-dialog" style="width: 50%">
					<div class="modal-content frame-modal-content">
						<div class="modal-header frame-modal-header">
							<button type="button" class="close frame-close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h3 class="modal-title frame-modal-title" id="AddDictionaryLabel">字典定义</h3>
						</div>
						<div class="modal-body frame-modal-body" style="overflow-y: auto;">
							<form action="/saveDcitionary" id="dicEdit">
								<input type="hidden"  id="dic_id_a" /> 
								<div class="col-md-12 column">
									<small><span style="color:red">*</span><label for="dic_code_a" style="font-weight:normal">字典编码</label></small>
									<div class="form-group">
										 <input type="text" class="form-control frame-form-control" id="dic_code_a"  name="dic_code_a"/>
									</div>
									<small><span style="color:red">*</span><label for="dic_name_a" style="font-weight:normal">字典名称</label></small>
									<div class="form-group">
										 <input type="text" class="form-control frame-form-control" id="dic_name_a" name="dic_name_a"/>
									</div>
									<div class="form-group">
										 <small><label for="dic_desc" style="font-weight:normal">字典描述</label></small>
										 <textarea class="form-control frame-form-control" id="dic_desc_a" ></textarea>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn frame-btn-form btn-default " data-dismiss="modal">取消</button>
							<button type="submit" class="btn frame-btn-form btn-primary " id="saveDcitionary">保存</button>
						</div>
					</div>
				</div>
			</div>
			<!-- 新增and编辑 弹出框 end -->	
        </div>
	</div>

</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
