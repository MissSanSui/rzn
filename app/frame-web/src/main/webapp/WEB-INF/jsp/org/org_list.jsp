<%@ include file="/WEB-INF/jsp/common/init.jsp" %>
<%@ include file="/WEB-INF/jsp/common/meta.jsp" %>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE>
<html lang="en">
<head>
<title>组织管理</title>
<script type="text/javascript">
    function loadOrgTree() {
        $.ajax({
            url: '${ctx}/org/getOrgNodeTree',
            type: 'POST',
            dataType: 'JSON',
            async: false,
            success: function (result) {
                if (result.flag == '0') {
                    var orgTree = [result.data.orgTree]; // 用数组包一层,控件只认数组格式
                    $('#org_tree').treeview({
                        data: orgTree,
                        onNodeSelected: function (event, data) {
                            $('#parent_id').val(data.id);
                            $('#tb_org_list').bootstrapTable('refresh', {
                                url: '${ctx}/org/getOrgList'
                            });
                        }
                    })
                } else {
                    FrameUtils.alert('加载组织树失败:' + result.msg);
                }
            }
        });
    }

    function formAddValidator() {
        $('#form_add_org')
                .bootstrapValidator({
                    message: 'This value is not valid.',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        add_org_code: {
                            validators: {
                                notEmpty: { // 非空验证：提示消息
                                    message: '组织编码不能为空'
                                },
                                threshold: 1, // 有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
                                remote: { // ajax验证。server result:{'valid',true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{'valid',true}
                                    url: '${ctx}/org/validateExistence', // 验证地址
                                    message: '组织编码已存在', //提示消息
                                    delay: 2000, // 每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                                    type: 'POST', // 请求方式
                                    data: function (validator) {
                                        console.log(validator);
                                        return {
                                            parent_id: $('#parent_id').val(),
                                            org_code: $('#add_org_code').val()
                                        };
                                    }
                                }
                            }
                        },
                        add_org_name: {
                            validators: {
                                notEmpty: { // 非空验证：提示消息
                                    message: '组织名称不能为空'
                                },
                                threshold: 1, // 有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
                                remote: { // ajax验证。server result:{'valid',true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{'valid',true}
                                    url: '${ctx}/org/validateExistence', // 验证地址
                                    message: '组织名称已存在', // 提示消息
                                    delay: 2000, // 每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                                    type: 'POST', // 请求方式
                                    data: function (validator) {
                                        console.log(validator);
                                        return {
                                            parent_id: $('#parent_id').val(),
                                            org_name: $('#add_org_name').val()
                                        };
                                    }
                                }
                            }
                        },
                        add_org_desc: {
                            validators: {}
                        },
                        add_display_order: {
                            validators: {
                                numeric: {message: '请输入数字'}
                            }
                        },
                        add_company_flag: {
                            validators: {
                                notEmpty: { // 非空验证：提示消息
                                    message: '公司标识不能为空'
                                }
                            }
                        }
                    }
                })
    }

    function formUpdateValidator() {
        $('#form_update_org').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                update_org_code: {
                    validators: {
                        notEmpty: { // 非空验证：提示消息
                            message: '组织编码不能为空'
                        }
                    }
                },
                update_org_name: {
                    validators: {
                        notEmpty: { // 非空验证：提示消息
                            message: '组织名称不能为空'
                        }
                    }
                },
                update_org_desc: {
                    validators: {
                        notEmpty: { // 非空验证：提示消息
                            message: '组织描述不能为空'
                        }
                    }
                },
                update_display_order: {
                    validators: {
                        notEmpty: { // 非空验证：提示消息
                            message: '展示顺序不能为空'
                        },
                        numeric: {message: '请输入数字'}
                    }
                }
            }
        })
    }

    function getSelections() {
        return $.map($('#tb_org_list').bootstrapTable('getSelections'), function (row) {
            return row;
        });
    }

    var TableInit = function () {
        var oTableInit = {};
        //初始化Table
        oTableInit.Init = function () {
            $('#tb_org_list').bootstrapTable({
                url: '${ctx}/org/getOrgList', // 请求后台的URL（*）
                method: 'get', // 请求方式（*）
                //toolbar: '#toolbar', // 工具按钮用哪个容器
                striped: true, // 是否显示行间隔色
                cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, // 是否显示分页（*）
                sortable: true, // 是否启用排序
                sortName: 'display_order',
                sortOrder: 'asc', // 排序方式
                queryParams: oTableInit.queryParams, // 传递参数（*）
                sidePagination: 'server', // 分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1, // 初始化加载第一页，默认第一页
                pageSize: 10, // 每页的记录行数（*）
                pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
                search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: false, // 是否显示所有的列
                showRefresh: false, // 是否显示刷新按钮
                minimumCountColumns: 2, // 最少允许的列数
                clickToSelect: true, // 是否启用点击选中行
                height: 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: 'org_id', // 每一行的唯一标识，一般为主键列
                showToggle: false, // 是否显示详细视图和列表视图的切换按钮
                cardView: false, // 是否显示详细视图
                detailView: false, // 是否显示父子表
                columns: [{
                    checkbox: true
                }, {
                    field: 'display_order',
                    title: '序号',
                    sortable: true
                }, {
                    field: 'org_code',
                    title: '组织编码',
                    sortable: true
                }, {
                    field: 'org_name',
                    title: '组织名称',
                    sortable: true
                }, {
                    field: 'company_flag',
                    title: '是否是公司',
                    sortable: false,
                    visible: false
                }, {
                    field: 'company_flag_display',
                    title: '是否是公司',
                    sortable: false
                }, {
                    field: 'enable_flag',
                    title: '是否启用',
                    sortable: false,
                    visible: false
                }, {
                    field: 'enable_flag_display',
                    title: '是否启用',
                    sortable: false
                }]
            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            return { // 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
                limit: params.limit, // 页面大小
                offset: params.offset, // 页码
                sortName: params.sort,
                sortOrder: params.order,
                orgName: $('#org_name').val(),
                parentId: $('#parent_id').val()
            };
        };

        return oTableInit;
    };

    var ButtonInit = function () {
        var oInit = {};
        // var postdata = {};
        oInit.Init = function () {
            //初始化页面上面的按钮事件
        };
        return oInit;
    };

    $(function () {
        // 【1】加载组织树
        loadOrgTree();

        // 1.初始化Table
        var oTable = new TableInit();
        oTable.Init();

        // 查询按钮
        $('#btn_query').click(function () {
            var parent_id = $('#parent_id').val();
            if (!parent_id) {
                FrameUtils.alert('请选择父组织。');
                return;
            }
            $('#tb_org_list').bootstrapTable('refresh', {
                url: '${ctx}/org/getOrgList'
            });
        });

        // 新增按钮
        $('#btn_add').click(function () {
            var parent_id = $('#parent_id').val();
            if (!parent_id) {
                FrameUtils.alert('请选择父组织。');
                return;
            }
            formAddValidator();
            $('#modal_add_org')
                    .on('shown.bs.modal', function (event) {
                        console.log(event);
                        var modal = $(this);
                        modal.find('#add_display_order').val('10');
                        modal.find('#add_company_flag').val('N');
                    })
                    .modal('show');
        });

        // 编辑按钮
        $('#btn_edit').click(function () {
            /*
             var parent_id = $('#parent_id').val();
             if (!parent_id) {
             FrameUtils.alert('请选择父组织。');
             return
             }
             */
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert('请选择需要编辑的数据。');
                return;
            } else if (aArray.length > 1) {
                FrameUtils.alert('只能选择一条要编辑的数据。');
                return;
            }
            var orgTemp = aArray[0];
            formUpdateValidator();
            $('#modal_update_org')
                    .on('shown.bs.modal', function (event) {
                        console.log(event);
                        var modal = $(this);
                        modal.find('#update_org_id').val(orgTemp.org_id);
                        modal.find('#update_org_code').val(orgTemp.org_code);
                        modal.find('#update_org_name').val(orgTemp.org_name);
                        modal.find('#update_org_desc').val(orgTemp.org_desc);
                        modal.find('#update_display_order').val(orgTemp.display_order);
                        modal.find('#update_company_flag').val(orgTemp.company_flag);
                    })
                    .modal('show');
        });

        // 新增弹框保存按钮
        $('#btn_add_save').click(function () {
            var bootstrapValidator = $('#form_add_org').data('bootstrapValidator');
            bootstrapValidator.validate();
            if (!bootstrapValidator.isValid()) {
                return;
            }
            $.ajax({
                url: '${ctx}/org/saveOrg',
                data: {
                    porg_id: $('#parent_id').val(),
                    org_name: $('#add_org_name').val(),
                    org_code: $('#add_org_code').val(),
                    org_desc: $('#add_org_desc').val(),
                    display_order: $('#add_display_order').val()
                    // TODO company_flag和enable_flag两个radio类型的还没写
                },
                type: 'POST',
                dataType: 'JSON',
                async: false,
                success: function (result) {
                    if (result.flag != '0') {
                        FrameUtils.alert(result.msg);
                        return;
                    }

                    loadOrgTree();
                    //清空modal里的bootstrapValidator的校验痕迹
                    $('#form_add_org').data('bootstrapValidator').resetForm();
                    $('#modal_add_org')
                            .on('hidden.bs.modal', function (event) {
                                console.log(event);
                                var modal = $(this);
                                modal.find('#add_org_code').val('');
                                modal.find('#add_org_name').val('');
                                modal.find('#add_org_desc').val('');
                                modal.find('#add_display_order').val('');
                                modal.find('#add_company_flag').val('');
                            })
                            .modal('hide');
                    $('#tb_org_list').bootstrapTable('refresh', {
                        url: '${ctx}/org/getOrgList'
                    });
                }
            });
        });

        // 新增弹框取消按钮
        $('#btn_add_cancel').click(function () {
            $('#form_add_org').data('bootstrapValidator').resetForm();
            $('#modal_add_org')
                    .on('hidden.bs.modal', function (event) {
                        console.log(event);
                        var modal = $(this);
                        modal.find('#add_org_code').val('');
                        modal.find('#add_org_name').val('');
                        modal.find('#add_org_desc').val('');
                        modal.find('#add_display_order').val('');
                        modal.find('#add_company_flag').val('');
                    })
                    .modal('hide');
        });

        // 新增弹框右上角关闭按钮
        // TODO 目前右上角关闭按钮是完全copy取消按钮功能的,应该可以通过什么方式调用,不用手写;如果无法调用也应写成一个方法供这两个按钮调用
        $('#btn_add_close').click(function () {
            $('#form_add_org').data('bootstrapValidator').resetForm();
            $('#modal_add_org')
                    .on('hidden.bs.modal', function (event) {
                        console.log(event);
                        var modal = $(this);
                        modal.find('#add_org_code').val('');
                        modal.find('#add_org_name').val('');
                        modal.find('#add_org_desc').val('');
                        modal.find('#add_display_order').val('');
                        modal.find('#add_company_flag').val('');
                    })
                    .modal('hide');
        });

        // 编辑保存按钮
        $('#btn_update_save').click(function () {
            $.ajax({
                url: '${ctx}/org/updateOrg',
                data: {
                    org_id: $('#update_org_id').val(),
                    org_code: $('#update_org_code').val(),
                    org_name: $('#update_org_name').val(),
                    org_desc: $('#update_org_desc').val(),
                    display_order: $('#update_display_order').val(),
                    company_flag: $('#update_company_flag').val()
                },
                type: 'POST',
                dataType: 'JSON',
                async: false,
                success: function (result) {
                    if (result.flag != '0') {
                        FrameUtils.alert(result.msg);
                        return;
                    }

                    $('#modal_update_org').modal('hide');
                    loadOrgTree();
                    $('#tb_org_list').bootstrapTable('refresh', {
                        url: '${ctx}/org/getOrgList'
                    });
                }
            });
        });

        // 编辑取消按钮
        $('#btn_update_cancel').click(function () {
            $('#form_update_org')
                    .data('bootstrapValidator')
                    .resetForm();
            $('#modal_update_org')
                    .on('hidden.bs.modal', function (event) {
                        console.log(event);
                        var modal = $(this);
                        modal.find('#update_org_code').val('');
                        modal.find('#update_org_name').val('');
                        modal.find('#update_org_desc').val('');
                        modal.find('#update_display_order').val('');
                        modal.find('#update_company_flag').val('');
                    })
                    .modal('hide');
        });

        $('#btn_enable').click(function () {
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert('请选择要启用的组织。');
                return;
            } else if (aArray.length > 1) {
                FrameUtils.alert('一次只能启用一个组织。');
                return;
            }

            var count = 0;
            var ids = [];
            var pOrgId = '';
            aArray.forEach(function (data) {
                if (data.enable_flag == 'Y') {
                    count++;
                }
                ids.push(data.org_id);
                pOrgId = data.porg_id;
            });
            if (count > 0) {
                FrameUtils.alert('该组织已是启用状态。');
                return;
            }

            $.ajax({
                url: '${ctx}/org/checkEnable?pOrgId=' + pOrgId,
                type: 'POST',
                dataType: 'JSON',
                async: true,
                success: function (result) {
                    if (result.flag == '0') {
                        $.ajax({
                            url: '${ctx}/org/enableOrg',
                            data: JSON.stringify(ids),
                            contentType: 'application/json;charset=UTF-8',
                            type: 'POST',
                            dataType: 'JSON',
                            async: false,
                            success: function (result) {
                                if (result.flag != '0') {
                                    FrameUtils.alert(result.msg);
                                    return;
                                }

                                $('#tb_org_list').bootstrapTable('refresh', {
                                    url: '${ctx}/org/getOrgList'
                                });
                            }
                        });
                    } else if (result.flag == '-1') {
                        FrameUtils.alert('该组织的父组织为终止状态，请先启用其父组织。');
                    }
                }
            });

        });

        $('#btn_disable').click(function () {
            var aArray = getSelections();
            if (aArray.length < 1) {
                FrameUtils.alert('请选择要停用的组织。');
                return;
            } else if (aArray.length > 1) {
                FrameUtils.alert('一次只能停用一个组织。');
                return;
            }
            var count = 0;
            var ids = [];
            aArray.forEach(function (data) {
                if (data.enable_flag == 'N') {
                    count++;
                }
                ids.push(data.org_id);
            });
            if (count > 0) {
                FrameUtils.alert('该组织已是停用状态。');
                return;
            }

            $.ajax({
                url: '${ctx}/org/checkDisable?orgId=' + ids[0],
                type: 'POST',
                dataType: 'JSON',
                async: true,
                success: function (result) {
                    if (result.flag == '0') {
                        $.ajax({
                            type: 'POST',
                            url: '${ctx}/org/disableOrg',
                            data: JSON.stringify(ids),
                            contentType: 'application/json;charset=UTF-8',
                            async: false,
                            dataType: 'JSON',
                            success: function (result) {
                                if (result.flag == '0') {
                                    $('#tb_org_list').bootstrapTable('refresh', {
                                        url: '${ctx}/org/getOrgList'
                                    });
                                } else {
                                    FrameUtils.alert(result.msg);
                                }
                            }
                        });
                    } else if (result.flag == '-1') {
                        FrameUtils.alert('该组织有状态为非停用的子组织，请先停用其子组织。');
                    } else if (result.flag == '-2') {
                        FrameUtils.alert('该组织有员工，无法停用。');
                    }
                }
            });
        });
    });
</script>
</head>

<body>
<!-- 定位标签 -->
<div class="frame-index">
    <ul class="breadcrumb frame-index-breadcrumb">
        <li><a href="${ctx}/org/list">组织管理</a></li>
    </ul>
</div>

<!-- 工作区内容 -->
<div class="container frame-container">
    <!-- 页面主体 -->
    <div class="row frame-row">
        <!-- 组织树 -->
        <div class="col-md-4">
            <div class="panel frame-panel panel-default">
                <div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title frame-panel-title">组织树</h3>
                </div>
                <div class="panel-body frame-panel-body" style="height: 530px;">
                    <div id="org_tree"></div>
                    <input type="hidden" id="parent_id"/>
                </div>
            </div>
        </div>

        <!-- 组织列表 -->
        <div class="col-md-8">
            <div class="panel frame-panel panel-default">
                <!-- panel标题 -->
                <div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title">组织列表</h3>
                </div>
                <!-- panel体 -->
                <div class="panel-body frame-panel-body">
                    <!-- 查询条件 -->
                    <div class="form-group frame-form-group form-inline col-md-6">
                        <label class="control-label frame-control-label frame-sm-label col-md-4"
                               for="org_name">组织名称：</label>
                        <input type="text"
                               class="form-control input-sm frame-form-control frame-input-sm co col-md-8"
                               id="org_name"/>
                    </div>
                    <div class="form-group frame-form-group form-inline col-md-6"
                         style="visibility: hidden;">
                        <label class="control-label frame-control-label frame-sm-label col-md-4"
                               for="empty">占位用：</label>
                        <input type="text" class="form-control frame-form-control input-sm frame-input-sm col-md-8"
                               id="empty"/>
                    </div>
                    <!-- 按钮栏 -->
                    <div class="navbar-form frame-navbar-form navbar-right">
                        <button id="btn_query" type="button"
                                class="btn btn-default btn-xs frame-btn-form"
                                role="button">
                            <span class="glyphicon glyphicon-search"></span>查询
                        </button>
                        <button id="btn_add" type="button"
                                class="btn btn-default btn-xs frame-btn-form"
                                role="button">
                            <span class="glyphicon glyphicon-plus"></span>新增
                        </button>
                        <button id="btn_edit" type="button"
                                class="btn btn-default btn-xs frame-btn-form"
                                role="button">
                            <span class="glyphicon glyphicon-pencil"></span>编辑
                        </button>
                        <button id="btn_enable" type="button"
                                class="btn btn-default btn-xs frame-btn-form"
                                role="button">
                            <span class="glyphicon glyphicon-ok"></span>启用
                        </button>
                        <button id="btn_disable" type="button"
                                class="btn btn-default btn-xs frame-btn-form"
                                role="button">
                            <span class="glyphicon glyphicon-remove"></span>停用
                        </button>
                    </div>

                    <table id="tb_org_list"></table>
                </div>
            </div>
        </div>
    </div>

    <!-- 新增组织模态框 -->
    <div class="modal frame-modal fade"
         id="modal_add_org" role="dialog"
         data-backdrop="static" data-keyboard="false"
         aria-labelledby="addOrgLabel">
        <div class="modal-dialog frame-modal-dialog">
            <div class="modal-content frame-modal-content">
                <!-- 模态框header -->
                <div class="modal-header frame-modal-header">
                    <!-- 右上角的x -->
                    <button type="button"
                            class="close frame-close"
                            id="btn_add_close"
                            data-dismiss="modal"
                            aria-hidden="true">&times;</button>
                    <!-- 模态框标题 -->
                    <h3 class="modal-title frame-modal-title"
                        id="addOrgLabel">新增组织</h3>
                </div>

                <!-- 模态框body -->
                <div class="modal-body frame-modal-body">
                    <form id="form_add_org">
                        <small>
                            <span style="color: red">*</span>
                            <label for="add_org_code" style="font-weight: normal">组织编码</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="add_org_code"
                                   name="add_org_code"/>
                        </div>
                        <small>
                            <span style="color: red">*</span>
                            <label for="add_org_name" style="font-weight: normal">组织名称</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="add_org_name"
                                   name="add_org_name"/>
                        </div>
                        <small>
                            <label for="add_org_desc" style="font-weight: normal">组织描述</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="add_org_desc"
                                   name="add_org_desc"/>
                        </div>
                        <small>
                            <label for="add_display_order" style="font-weight: normal">展示顺序</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="add_display_order"
                                   name="add_display_order"/>
                        </div>
                        <small>
                            <span style="color: red">*</span>
                            <label for="add_company_flag" style="font-weight: normal">公司标识</label>
                        </small>
                        <div class="form-group">
                            <select class="form-control input-sm frame-form-control"
                                    id="add_company_flag"
                                    name="add_company_flag">
                                <option value="">-请选择-</option>
                                <option value="Y">是</option>
                                <option value="N">否</option>
                            </select>
                        </div>
                    </form>
                </div>

                <!-- 模态框footer -->
                <div class="modal-footer frame-modal-footer">
                    <button type="button"
                            class="btn btn-default frame-btn-form"
                            id="btn_add_cancel">取消
                    </button>
                    <button type="button"
                            class="btn btn-primary frame-btn-form"
                            id="btn_add_save">保存
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 编辑组织模态框 -->
    <div class="modal frame-modal fade"
         id="modal_update_org" role="dialog"
         data-backdrop="static" data-keyboard="false"
         aria-labelledby="updateOrgLabel">
        <div class="modal-dialog frame-modal-dialog">
            <div class="modal-content frame-modal-content">
                <!-- 模态框header -->
                <div class="modal-header frame-modal-header">
                    <!-- 右上角的x -->
                    <button type="button"
                            class="close frame-close"
                            data-dismiss="modal"
                            aria-hidden="true">&times;</button>
                    <!-- 模态框标题 -->
                    <h3 class="modal-title frame-modal-title"
                        id="updateOrgLabel">编辑组织</h3>
                </div>
                <div class="modal-body frame-modal-body"
                     style="overflow-y: auto;">
                    <form action="" id="form_update_org">
                        <input type="hidden" id="update_org_id"/>
                        <input type="hidden" id="old_org_name"/>
                        <small>
                            <span style="color: red">*</span>
                            <label for="update_org_code"
                                   style="font-weight: normal">组织编码</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="update_org_code"
                                   name="update_org_code"/>
                        </div>
                        <small>
                            <span style="color: red">*</span>
                            <label for="update_org_name"
                                   style="font-weight: normal">组织名称</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="update_org_name"
                                   name="update_org_name"/>
                        </div>
                        <small>
                            <label for="update_org_desc"
                                   style="font-weight: normal">组织描述</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="update_org_desc"
                                   name="update_org_desc"/>
                        </div>
                        <small>
                            <label for="update_display_order"
                                   style="font-weight: normal">展示顺序</label>
                        </small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control input-sm frame-form-control"
                                   id="update_display_order"
                                   name="update_display_order"/>
                        </div>
                        <small>
                            <span style="color: red">*</span>
                            <label for="update_company_flag"
                                   style="font-weight: normal">公司标识</label>
                        </small>
                        <div class="form-group">
                            <select class="form-control input-sm frame-form-control"
                                    id="update_company_flag"
                                    name="update_company_flag">
                                <option value="">-请选择-</option>
                                <option value="Y">是</option>
                                <option value="N">否</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button"
                            class="btn frame-btn-form btn-default"
                            id="btn_update_cancel">取消
                    </button>
                    <button type="submit"
                            class="btn frame-btn-form btn-primary"
                            id="btn_update_save">保存
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<%--<jsp:include page="/WEB-INF/jsp/common/footer.jsp" flush="true"/>--%>
<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
