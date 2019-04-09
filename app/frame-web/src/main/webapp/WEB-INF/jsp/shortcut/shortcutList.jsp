<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html>
<head>

    <title>快捷入口</title>
    <%@ include file="/WEB-INF/jsp/common/init.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/meta.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/header.jsp" %>
    <link rel="stylesheet" href="${ctx}/resources/css/bootstrap-table-custom.css">
</head>
<script type="text/javascript">

    /*
     * 人员列表初始化
     */
    var TableInit = function () {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#tb_shortcut_list')
                    .bootstrapTable(
                            {
                                url: '${ctx}/shortcut/shortcutPageList', // 请求后台的URL（*）
                                method: 'get', // 请求方式（*）
                                toolbar: '#toolbar', // 工具按钮用哪个容器
                                striped: true, // 是否显示行间隔色
                                cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                                pagination: true, // 是否显示分页（*）
                                sortable: true, // 是否启用排序
                                sortName: 'shortcut_name',
                                sortOrder: "asc", // 排序方式
                                queryParams: oTableInit.queryParams,// 传递参数（*）
                                sidePagination: "server", // 分页方式：client客户端分页，server服务端分页（*）
                                pageNumber: 1, // 初始化加载第一页，默认第一页
                                pageSize: 10, // 每页的记录行数（*）
                                pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
                                search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                                strictSearch: true,
                                height: 495,
                                showColumns: false, // 是否显示所有的列
                                showRefresh: false, // 是否显示刷新按钮
                                minimumCountColumns: 2, // 最少允许的列数
                                clickToSelect: true, // 是否启用点击选中行
                                uniqueId: "id", // 每一行的唯一标识，一般为主键列
                                showToggle: false, // 是否显示详细视图和列表视图的切换按钮
                                cardView: false, // 是否显示详细视图
                                detailView: false, // 是否显示父子表
                                columns: [
                                    {
                                        checkbox: true
                                    },
                                    {
                                        // field: 'Number',//可不加
                                        width: '50px',
                                        title: '序号',// 标题 可不加
                                        formatter: function (value, row, index) {
                                            return index + 1;
                                        }
                                    },

                                    {
                                        field: 'shortcut_name',
                                        title: '快捷入口名称',
                                        sortable: true
                                    }, {
                                        field: 'flag',
                                        title: '启用标示',
                                        sortable: false,
                                        formatter: function (value, row, index) {
                                            var displayValue = "";
                                            if (value == 'Y') {
                                                displayValue = "启用";
                                            } else if (value == 'N') {
                                                displayValue = "禁用";
                                            } else {
                                                displayValue = value;
                                            }

                                            return displayValue;
                                        }
                                    }
                                ]
                            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit, // 页面大小
                offset: params.offset, // 页码
                queryName: $("#queryName").val(),
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
            // 初始化页面上面的按钮事件
        };
        return oInit;
    };

    $(function () {

        /*
         * 用户列表
         */
        // 1.初始化Table
        var oTable = new TableInit();
        oTable.Init();

        // 2.初始化Button的点击事件
        var oButtonInit = new ButtonInit();
        oButtonInit.Init();
        //将选择的数据封装成map
        function getSelections() {
            return $.map($('#tb_shortcut_list').bootstrapTable('getSelections'), function (row) {
                return row;
            });
        }

        /*
         * 查询按钮
         */
        $('#query').click(function () {
            $('#tb_shortcut_list').bootstrapTable('refresh', {
                url: '${ctx}/shortcut/shortcutPageList'
            });
        });
        /*
         * 新增按钮
         */
        $('#newInfo').click(function () {
            $("#shortcut_modal").on('show.bs.modal', function (event) {
                modal = $(this);
                modal.find('#id').val('');
                modal.find('#url').val('');
                modal.find('#shortcut_name').val('');
                modal.find('#flag').val('N');
                modal.find('#type').val('new');
            })
            $('#edit_shortcut_symbol').selectpicker('val', [null]);
            $("#shortcut_modal").modal("show");
            /*$('#editType').val("new");
             $('#editShortcutInfoForm').attr("action" ,"
            ${ctx}/bulletin/updateBulletinInfoPage");
             $("#editShortcutInfoForm").submit();*/
        });
        /*
         * 保存按钮
         */
        $('#saveShortcut').click(function () {
            var type = $("#type").val();
            var data;
            data = {
                id: $('#id').val(),
                shortcut_name: $('#shortcut_name').val(),
                shortcut_symbol: $('#edit_shortcut_symbol').val(),
                flag: $('#flag').val(),
                url: $('#url').val(),
                type: type,
            };
            if (!data.type || data.type == 'new') {
                data.id = -1;
            }
            $.ajax({
                url: '${ctx}/shortcut/saveShortcut',
                data: data,
                async: false,
                type: 'POST',
                dataType: 'JSON',
                success: function (result) {
                    if (result.flag == "0") {
                        FrameUtils.alert("保存成功");
                        $("#shortcut_modal").modal("hide");
                        $('#tb_shortcut_list').bootstrapTable('refresh', {url: '${ctx}/shortcut/shortcutPageList'});
                    } else {
                        FrameUtils.alert(result.msg);
                    }
                }
            });

        });
        /*
         * 编辑按钮
         */
        $('#btn_edit').click(function () {
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert("请选择一条编辑记录！");
                return;
            }
            if (aArray.length > 1) {
                FrameUtils.alert("请选择一条编辑记录！");
                return;
            }
            var obj = aArray[0];
            $("#shortcut_modal").on('show.bs.modal', function (event) {
                modal = $(this);
                modal.find('#id').val(obj.id);
                modal.find('#url').val(obj.url);
                modal.find('#shortcut_name').val(obj.shortcut_name);
                modal.find('#flag').val(obj.flag);
                modal.find('#type').val('update');
            });
            $('#edit_shortcut_symbol').selectpicker('val', [ obj.shortcut_symbol ]);
            $("#shortcut_modal").modal("show");
        });

        /*
         * 禁用按钮
         */
        $('#btn_disable').click(function () {
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert("请选择需要禁用的记录！");
                return;
            }
            var count = 0;

            var ids = [];
            for (var o in aArray) {
                if (aArray[o].flag == 'N') {
                    count++;
                }
                ids.push(aArray[o].id);
            }
            if (count > 0) {
                FrameUtils.alert("不能重复禁用！");
                return;
            }
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                url: '${ctx}/shortcut/disableOrAbleShortcut?type=disable',
                data: JSON.stringify(ids),
                async: false,
                dataType: 'JSON',
                success: function (result) {
                    if (result.flag == "0") {
                        FrameUtils.alert("修改成功");
                        $('#tb_shortcut_list').bootstrapTable('refresh', {url: '${ctx}/shortcut/shortcutPageList'});
                    } else {
                        FrameUtils.alert(result.msg);
                    }
                }
            });
        });
        /*
         * 启用按钮
         */
        $('#btn_able').click(function () {
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert("请选择需要启用的记录！");
                return;
            }
            var count = 0;

            var ids = [];
            for (var o in aArray) {
                if (aArray[o].flag == 'Y') {
                    count++;
                }
                ids.push(aArray[o].id);
            }
            if (count > 0) {
                FrameUtils.alert("不能重复启用！");
                return;
            }
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                url: '${ctx}/shortcut/disableOrAbleShortcut?type=able',
                data: JSON.stringify(ids),
                async: false,
                dataType: 'JSON',
                success: function (result) {
                    if (result.flag == "0") {
                        $('#tb_shortcut_list').bootstrapTable('refresh', {url: '${ctx}/shortcut/shortcutPageList'});
                    } else {
                        FrameUtils.alert(result.msg);
                    }
                }
            });
        });


        /**
         * 公告详细信息
         */
        function bulletinDetail(id) {
            $('#editBulletinId').val(id);
            $('#editType').val("update");
            $('#editShortcutInfoForm').attr("action", "${ctx}/bulletin/updateBulletinInfoPage");
            $("#editShortcutInfoForm").submit();
        };
    });
</script>
<body>
<div class="frame-index">
    <ul class="breadcrumb frame-index-breadcrumb">
        <li><a href="#">快捷入口设置</a></li>
    </ul>
</div>
<div class="container frame-container">
    <div class="row frame-row">

        <div class="panel frame-panel panel-default">

            <div class="panel-heading frame-panel-heading">
                <h3 class="panel-title frame-panel-title">快捷入口列表</h3>

            </div>
            <div class="frame-workspace" style="height: 100%; max-height: 100%; overflow-y: auto;">
                <div class="form-horizontal">
                    <div class="form-group frame-form-group form-inline col-md-4">
                        <label
                                class="control-label frame-control-label frame-sm-label "
                                for="queryName">名称：</label>
                        <input type="text" class="form-control input-sm frame-form-control frame-input-sm  "
                               id="queryName"/>
                    </div>


                </div>
                <div class="navbar-form frame-navbar-form navbar-right" style="padding-top: 1px">

                    <button id="query" type="button"
                            class="btn btn-default btn-xs frame-btn-form btn-primary"
                            role="button">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                    </button>
                    <button id="newInfo" type="button"
                            class="btn btn-default btn-xs frame-btn-form btn-primary"
                            role="button">
                        <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>新增
                    </button>
                    <button id="btn_edit" type="button"
                            class="btn btn-default btn-xs frame-btn-form btn-primary"
                            role="button">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑
                    </button>
                    <button id="btn_able" type="button"
                            class="btn btn-default btn-xs frame-btn-form btn-primary"
                            role="button">
                        <span class="glyphicon glyphicon-ok"> </span>启用
                    </button>
                    <button id="btn_disable" type="button"
                            class="btn btn-default btn-xs frame-btn-form btn-primary"
                            role="button">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        禁用
                    </button>

                </div>
                <table id="tb_shortcut_list"></table>
            </div>
        </div>
        <form id="editShortcutInfoForm" method="post" name="editShortcutInfoForm" action="">
            <input type="hidden" name="shortcutName" id="shortcutName"/>
            <input type="hidden" name="shortcut_symbol" id="shortcut_symbol"/>
        </form>
    </div>
</div>
<!-- 新增and编辑 弹出框 start -->
<div class="modal frame-modal fade" id="shortcut_modal" role="dialog" data-backdrop="static" data-keyboard="false"
     aria-labelledby="addShortcutLabel">
    <div class="modal-dialog frame-modal-dialog" style="width: 50%;height: 80%">
        <div class="modal-content frame-modal-content">
            <div class="modal-header frame-modal-header">
                <button type="button" class="close frame-close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title frame-modal-title" id="addShortcutLabel">快捷入口维护</h3>
            </div>
            <div class="modal-body frame-modal-body" style="overflow-y: auto;height: 80%">
                <form action="" id="shortcutEdit">
                    <div class="col-md-12 column">
                        <small><span style="color:red">*</span><label for="shortcut_name" style="font-weight:normal">快捷入口名称</label>
                        </small>
                        <div class="form-group">
                            <input type="text" class="form-control frame-form-control input-sm" id="shortcut_name"
                                   name="shortcut_name"/>
                        </div>
                        <small><span style="color:red">*</span><label for="url"
                                                                      style="font-weight:normal">快捷入口地址</label>
                        </small>
                        <div class="form-group">
                            <input type="text" class="form-control frame-form-control input-sm" id="url"
                                   name="url"/>
                        </div>
                        <small><span style="color:red">*</span><label for="edit_shortcut_symbol"
                                                                      style="font-weight:normal">快捷入口图标</label></small>
                        <div class="form-group">

                            <select name="edit_shortcut_symbol"
                                    class="selectpicker form-control frame-form-control input-sm "
                                    data-size="6" data-live-search="false" id="edit_shortcut_symbol"
                                    name="edit_shortcut_symbol">
                                <option value=""></option>
                                <c:forEach var="ite" items="${shortCutList}">
                                    <option value="${ite.dic_item_code}">
                                            ${ite.dic_item_name}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <input type="hidden" id="id" name="id" value=""/>
                        <input type="hidden" id="type" name="type" value=""/>
                        <input type="hidden" id="flag" name="flag" value=""/>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn frame-btn-form btn-default " data-dismiss="modal">取消</button>
                <button type="button" class="btn frame-btn-form btn-primary " id="saveShortcut">保存</button>
            </div>
        </div>
    </div>
</div>
<!-- 新增and编辑 弹出框 end -->
</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
