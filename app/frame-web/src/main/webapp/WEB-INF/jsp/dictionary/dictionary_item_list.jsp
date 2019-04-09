<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>
<title>字典项定义</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>
<script type="text/javascript">
var dic_id = '<%= request.getAttribute("dic_id")%>';

$(function() {
    var oTable = new TableInit();
    oTable.Init();
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        $('#tb_dicitemlist').bootstrapTable({
            url: '${ctx}/dictionaryItem/dictionaryItemPageList',         //请求后台的URL（*）
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
            uniqueId: "dic_item_id",                     //每一行的唯一标识，一般为主键列
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
                field: 'dic_item_code',
                title: '字典项编码',
                sortable: true
            }, {
                field: 'dic_item_name',
                title: '字典项名称',
                sortable: true
            }, {
                field: 'dic_item_desc',
                title: '字典项描述'
            },{
                field: 'enable_flag',
                title: '启用标示',
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
            }],
            onLoadSuccess: function (data) {
            	$('#dic_id').val(data.dic_id);
            	$('#dic_code').val(data.dic_code);
            	$('#dic_name').val(data.dic_name);
            	$('#dic_code_a').val(data.dic_code);
            	$('#dic_name_a').val(data.dic_name);
                return false;
            }
        });
    };

    oTableInit.queryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset,
            dic_id : dic_id,
            dic_code: $("#dic_code").val(),
            dic_name: $("#dic_name").val(),
            dic_item_code: $("#dic_item_code").val(),
            dic_item_name: $("#dic_item_name").val(),
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
	
	function formAddValidator(){
		$('#dicItemEdit').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	            dic_item_code_a: {
	            	 validators: {
	                     notEmpty: {
	                         message: '字典项编码不能为空!'
	                     }
	                 }
	             },
	             dic_item_name_a: {
		            	 validators: {
		                     notEmpty: {
		                         message: '字典项名称不能为空!'
		                     }
		                 }
		             }
	            }
	    })
	}
	  if(dic_id == null || dic_id == '' ){
		  $('#btn_add').hide();
		  $('#btn_edit').hide();
		  $('#backBtn').hide();
		  
	  }
	
	  $('#query').click(function () {
          $('#tb_dicitemlist').bootstrapTable('refresh',{url: '${ctx}/dictionaryItem/dictionaryItemPageList'}); 
      });
	  
	  function getSelections() {
	        return $.map($('#tb_dicitemlist').bootstrapTable('getSelections'), function (row) {
	            return row;
	        });
	  }
	  $("#dic_item_modal").on('hidden.bs.modal', function (event) {
    	  var modal = $(this);
    	  $("#dicItemEdit").data('bootstrapValidator').destroy(); 
	  }); 
	  $('#btn_add').click(function(){
		  formAddValidator();
		  $("#dic_item_modal").on('show.bs.modal', function (event) {
        	  var modal = $(this);
        	  modal.find('#dic_id_a').val($('#dic_id').val());
        	  modal.find('#dic_item_id_a').val($('#dic_item_id').val());
        	  modal.find('#dic_item_code_a').val($('#dic_item_code').val());
        	  modal.find('#dic_item_name_a').val('');
        	  modal.find('#dic_item_desc_a').val('');
        	 });
          $("#dic_item_modal").modal("show");
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
          var dicItem = aArray[0];
          formAddValidator();
          $("#dic_item_modal").on('show.bs.modal', function (event) {
        	  var modal = $(this);
        	  modal.find('#dic_id_a').val(dicItem.dic_id);
        	  modal.find('#dic_item_id_a').val(dicItem.dic_item_id);
        	  modal.find('#dic_item_code_a').val(dicItem.dic_item_code);
        	  modal.find('#dic_item_name_a').val(dicItem.dic_item_name);
        	  modal.find('#dic_item_desc_a').val(dicItem.dic_item_desc);
        	 });
          $("#dic_item_modal").modal("show");
      });
      $("#backBtn").click(function(){
			var url = "${ctx}/dictionary/dictionary_list";
			window.location.href = url;
		});

	 $("#saveDcitionaryItem").click(function(){
		var bootstrapValidator = $("#dicItemEdit").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return;
		} 
		var data;
		if($('#dic_item_id_a').val() =='' || $('#dic_item_id_a').val() == null){
			data = { 
					dic_id:$('#dic_id_a').val(),
					dic_item_code:$('#dic_item_code_a').val(),
					dic_item_name:$('#dic_item_name_a').val(),
					dic_item_desc:$('#dic_item_desc_a').val()
		        };
		}else{
			data = {
					dic_item_id:$('#dic_item_id_a').val(),
					dic_item_code:$('#dic_item_code_a').val(),
					dic_item_name:$('#dic_item_name_a').val(),
					dic_item_desc:$('#dic_item_desc_a').val()
	        	};
		}
		$.ajax({
			url: '${ctx}/dictionaryItem/saveDictionaryItemInfo',
			data: data,
			async: false,
			type: 'POST',
			dataType: 'JSON',
			success: function(result) {
				if (result.flag=="0") {
					$("#dic_item_modal").modal("hide");
					$('#tb_dicitemlist').bootstrapTable('refresh',{url: '${ctx}/dictionaryItem/dictionaryItemPageList'});
				} else {
					FrameUtils.alert("error");
				}
			}
		});
	}) 
	$("#btn_able").click(function(){
		var aArray =  getSelections();
        if(aArray.length < 1){
      	  FrameUtils.alert("请选择需要启用的字典项！");
      	  return;
        } 
        var count = 0;
        var ids = [];
        for(var o in aArray){
      	  if(aArray[o].enable_flag == 'Y'){
      		  count++;
      	  }
      	  ids.push(aArray[o].dic_item_id);
        }
        if(count>0){
      	  FrameUtils.alert("不能重复启用字典项！");
      	  return;
        }
        $.ajax({
      	  type:"POST", 
      	  contentType : "application/json;charset=UTF-8",  
            url: '${ctx}/dictionaryItem/ableDictionaryItem',
            data: JSON.stringify(ids),
            async: false,
            dataType: 'JSON',
            success: function(result) {
                if (result.flag=="0") {
                	 $('#tb_dicitemlist').bootstrapTable('refresh',{url: '${ctx}/dictionaryItem/dictionaryItemPageList'}); 
                } else {
                    FrameUtils.alert(result.msg);
                }
            }
        });
	});
	$("#btn_disable").click(function(){
		var aArray =  getSelections();
        if(aArray.length < 1){
      	  FrameUtils.alert("请选择需要停用的字典项！");
      	  return;
        } 
        var count = 0;
        var ids = [];
        for(var o in aArray){
      	  if(aArray[o].enable_flag == 'N'){
      		  count++;
      	  }
      	  ids.push(aArray[o].dic_item_id);
        }
        if(count>0){
      	  FrameUtils.alert("不能重复停用字典项！");
      	  return;
        }
        $.ajax({
        	  type:"POST", 
        	  contentType : "application/json;charset=UTF-8",  
              url: '${ctx}/dictionaryItem/disableDictionaryItem',
              data: JSON.stringify(ids),
              async: false,
              dataType: 'JSON',
              success: function(result) {
                  if (result.flag=="0") {
                  	 $('#tb_dicitemlist').bootstrapTable('refresh',{url: '${ctx}/dictionaryItem/dictionaryItemPageList'}); 
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
	<div class="frame-index">
	    <ul class="breadcrumb frame-index-breadcrumb">
	        <li><a href="#">系统管理</a></li>
	        <li><a href="#">字典管理</a></li>
	        <li><a href="#">字典项管理</a></li>
	    </ul>
	</div>
	<div class="container frame-container">
		<div class="row frame-row">
            <div class="frame-workspace">
	            <div class="form-horizontal">
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_code">字典编码：</label>
                        <input type="hidden"  id="dic_id" />
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_code" <c:if test ="${not empty dic_id}">readonly="readonly"</c:if>/>
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_name">字典名称：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_name" <c:if test ="${not empty dic_id}">readonly="readonly"</c:if>/>
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_item_code">字典项编码：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_item_code" />
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="dic_item_name">字典项名称：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="dic_item_name" />
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-4" style="visibility: hidden;">
                        <label class="control-label frame-control-label frame-sm-label col-md-4" for="empty">占位用：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8" id="zhanweiyong" />
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
		            <button id="btn_able" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
                       <span class="glyphicon glyphicon-ok"> </span>启用
                    </button>
                     <button id="btn_disable" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>禁用
                    </button>
                    <button id="backBtn" type="button" class="btn btn-default btn-xs frame-btn-form"    role="button">
		               <span class="glyphicon glyphicon-pencil"  aria-hidden="true"></span>返回
		            </button>       
        		</div>
		
				<table id="tb_dicitemlist"></table>
				<div class="row clearfix"></div>
			</div>
			
			<!-- 新增and编辑 弹出框 start -->
			<div class="modal frame-modal fade" id="dic_item_modal" role="dialog" data-backdrop="static" data-keyboard="false"
				aria-labelledby="AddDictionaryItemLabel">
				<div class="modal-dialog frame-modal-dialog" style="width: 50%">
					<div class="modal-content frame-modal-content">
						<div class="modal-header frame-modal-header">
							<button type="button" class="close frame-close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h3 class="modal-title frame-modal-title" id="AddDictionaryItemLabel">字典项定义</h3>
						</div>
						<div class="modal-body frame-modal-body" style="overflow-y: auto;">
							<form action="/saveDcitionaryItem" id="dicItemEdit">
								<input type="hidden"  id="dic_item_id_a" />
								<input type="hidden"  id="dic_id_a" />
								<div class="col-md-12 column">
									<div class="form-group">
										<small><label for="dic_code_a" style="font-weight:normal">字典编码</label></small>
										 <input type="text" class="form-control frame-form-control" id="dic_code_a" readonly="readonly"/>
									</div>
									<div class="form-group">
										 <small><label for="dic_name_a" style="font-weight:normal">字典名称</label></small>
										 <input type="text" class="form-control frame-form-control" id="dic_name_a" readonly="readonly"/>
									</div>
									<small><span style="color:red">*</span><label for="dic_item_code_a" style="font-weight:normal">字典项编码</label></small>
									<div class="form-group">
										 <input type="text" class="form-control frame-form-control" id="dic_item_code_a" name ="dic_item_code_a"/>
									</div>
									<small><span style="color:red">*</span><label for="dic_item_name_a" style="font-weight:normal">字典项名称</label></small>
									<div class="form-group">
										 <input type="text" class="form-control frame-form-control" id="dic_item_name_a" name="dic_item_name_a"/>
									</div>
									<div class="form-group">
										 <small><label for="dic_item_desc_a" style="font-weight:normal">字典项描述</label></small>
										 <textarea class="form-control frame-form-control" id="dic_item_desc_a" ></textarea>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn frame-btn-form btn-default " data-dismiss="modal">取消</button>
							<button type="submit" class="btn frame-btn-form btn-primary " id="saveDcitionaryItem">保存</button>
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
