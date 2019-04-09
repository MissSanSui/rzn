$(document).ready(function(){
	
	function writeObj(obj){ 
		 var description = ""; 
		 for(var i in obj){ 
		 var property=obj[i]; 
		 description+=i+" = "+property+"\n"; 
		 } 
		 FrameUtils.alert(description);
	} 
	
	var TableInitFile = function () {
	    var oTableInitFile = new Object();
	    oTableInitFile.Init = function () {
	        $('#tb_fileuploadlist').bootstrapTable({
	            url: '${ctx}/../../fileUpload/getFileList',         //请求后台的URL（*）
	            method: 'get',                      //请求方式（*）
	            striped: true,                      //是否显示行间隔色
	            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,                   //是否显示分页（*）
	            sortable: true,                     //是否启用排序
	            sortOrder: "asc",                   //排序方式
	            queryParams: oTableInitFile.queryParams,//传递参数（*）
	            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	            pageNumber:1,                       //初始化加载第一页，默认第一页
	            pageSize: 5,                       //每页的记录行数（*）
	            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
	            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	            strictSearch: true,
	            showColumns: false,                  //是否显示所有的列
	            showRefresh: false,                  //是否显示刷新按钮
	            minimumCountColumns: 2,             //最少允许的列数
	            height:380,
	            clickToSelect: true,                //是否启用点击选中行
	            uniqueId: "file_id",                 //每一行的唯一标识，一般为主键列
	            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: false,                   //是否显示父子表
	            columns: [
		            {
		                field: 'file_keywords',
		                title: '关键字',
		                editable: {
		                    type: 'text',
		                    title: '关键字',
		                    validate: function (v) {
		                        if (!v) return '关键字不能为空';
		                    }
		                }
		            }, {
		                field: 'file_name',
		                title: '文件名称'
		            }, {
		                field: 'created_date',
		                title: '上传时间',
		                formatter: function (value, row, index) {
		                	var date = new Date(value);
		                	var task_term = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		                    return task_term;
		                }
		            },{
		                field: 'file_id',
		                title: '操作',
		                formatter: function (value, row, index) {
		                	return "<button  type=\"button\" class=\"btn btn-link btn-xs \" id='fileDeleteId' onclick=\"deleteFile(\'" + value +"\');\">删除</button>" +
		                	"&nbsp;&nbsp;<a name='fileDownId' href=\"${ctx}/../../fileUpload/file_dowload?file_id="+value+"\">下载</a>";
		                }
		                	
		            }],
		            onEditableSave: function (field, row, oldValue, $el) {
		            	var data = {
	            			file_id :  row.file_id,
	    					file_keywords : row.file_keywords
		    		    };
		                $.ajax({
		                    type: "post",
		                    url: "${ctx}/../../fileUpload/updateFile",
		                    data: data,
		                    dataType: 'JSON',
		                    success: function (result) {
		                        if (result.flag=="0") {
		                        	alert("编辑成功");
		                        	$('#tb_fileuploadlist').bootstrapTable('refresh',{url: '${ctx}/../../fileUpload/getFileList'});
		                        }
		                    }
		                }); 
		            }
	        });
	    };
	    oTableInitFile.queryParams = function (params) {
	        var temp = {
	            limit: params.limit,
	            offset: params.offset,
	            business_id:$("#businessId").val(),
	            sortName: params.sort,
	            sortOrder: params.order
	        };
	        return temp;
	    };
	    return oTableInitFile;
	};
	var ButtonInitFlie = function () {
	    var oInitFlie = new Object();
	    var postdata = {};
	    oInitFlie.Init = function () {
	       
	    };
	    return oInitFlie;
	};
	
	var oTableFile = new TableInitFile();
    oTableFile.Init();
    var oButtonInitFlie = new ButtonInitFlie();
    oTableFile.Init();
	
	var fbusinessId = $("#businessId").val();
	$('#file-0a').fileinput({
	    language: 'zh',//多语言
	    uploadUrl: '${ctx}/../../fileUpload/upload',//上传路径
	    showPreview : false,//是否显示文件框
	    showRemove: false,//隐藏移除框
	    //allowedFileExtensions : ['xls', 'xlsx'], //允许上传的文件类型
	    allowedPreviewTypes:false, //所有文件不预览
	    uploadExtraData:function() {//上传附带参数
            return fbusinessId;
        }
	});
	//上传前，进行参数赋值
	$('#file-0a').on('filepreajax', function(event, previewId, index) {
		fbusinessId = {"businessId": $("#businessId").val()};
	});
	
	//批量选择完之后循环单个文件调用 当选择的文件和允许上传的文件类型不匹配，则调用
	$('#file-0a').on('fileuploaderror', function(event, data, previewId, index) {
	    var form = data.form, files = data.files, extra = data.extra,response = data.response, reader = data.reader;
	    FrameUtils.alert(previewId);
	});
	
	//批量上传完成之后的调用
	$('#file-0a').on('filebatchuploadcomplete', function(event, data, previewId, index) {
	    var form = data.form, files = data.files, extra = data.extra,response = data.response, reader = data.reader;
	    $('#tb_fileuploadlist').bootstrapTable('refresh',{url: '${ctx}/../../fileUpload/getFileList'});
	});
	
});

//删除附件
function deleteFile(val){
	$.ajax({
        url: '${ctx}/../../fileUpload/file_delete',
        data: {file_id:val},
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function(result) {
            if (result.flag=="0") {
            	 $('#tb_fileuploadlist').bootstrapTable('refresh',{url: '${ctx}/../../fileUpload/getFileList'});
            } else {
                FrameUtils.alert(result.msg);
            }
        }
    });
}