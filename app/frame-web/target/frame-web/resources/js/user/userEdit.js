var showExistUserFlag = true;
function showExistUser() {
    if (showExistUserFlag) {
        $("#rightExsitUser").hide();
        $("#downExsitUser").show();
    } else {
        $("#rightExsitUser").show();
        $("#downExsitUser").hide();
    }
    showExistUserFlag = !showExistUserFlag;
}
function userValide(oldName) {
    var url = "${ctx}/../validateUserName?oldName=" + oldName;
    /*
     * 用户新增页面校验
     */
    $('#userEdit').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空!'
                    },
                    emailAddress: {
                        message: '请填写有效的邮箱地址!'
                    }
                }
            },
            /*  org_name: {
             validators: {
             notEmpty: {
             message: '所属公司不能为空!'
             }
             }
             },
             dept_name: {
             validators: {
             notEmpty: {
             message: '所属部门不能为空!'
             }
             }
             },*/
            /* birth_temp: {
             validators: {
             notEmpty: {
             message: '出生日期不能为空!'
             }
             }
             },*/
            /*  supervisor_name: {
             validators: {
             notEmpty: {
             message: '上级主管不能为空!'
             }
             }
             },*/
            job: {
                validators: {
                    notEmpty: {
                        message: '职务不能为空!'
                    }
                }
            },
            user_name: {
                validators: {
                    notEmpty: {
                        message: '系统用户名称不能为空!'
                    },
                    threshold: 1, // 有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
                    remote: {// ajax验证。server result:{"valid",true or false}
                        // 向服务发送当前input
                        // name值，获得一个json数据。例表示正确：{"valid",true}
                        url: url,// 验证地址
                        message: '系统用户名称已存在',// 提示消息
                        delay: 2000,// 每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                        type: 'POST'// 请求方式
                        /**
                         * 自定义提交数据，默认值提交当前input value data: function(validator) {
					 * return { password:
					 * $('[name="passwordNameAttributeInYourForm"]').val(),
					 * whatever:
					 * $('[name="whateverNameAttributeInYourForm"]').val() }; }
                         */
                    }
                }
            },
            emp_name: {
                validators: {
                    notEmpty: {
                        message: '中文姓名不能为空!'
                    }
                }
            },emp_number: {
                validators: {
                    notEmpty: {
                        message: '员工编号不能为空!'
                    }
                }
            },
            telephone: {
                validators: {
                    notEmpty: {
                        message: '工作电话不能为空!'
                    },
                    regexp: {
                        /* 只需加此键值对，包含正则表达式，和提示 */
                        regexp: /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/,
                        message: '请输入正确的工作电话'
                    }
                }
            },
            mobile: {
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空!'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    }/*,
                     regexp: {
                     regexp: /^1[7|3|5|8]{1}[0-9]{9}$/,
                     message: '请输入正确的手机号码'
                     }*/
                }
            },
            alternate_contact: {
                validators: {
                    notEmpty: {
                        message: '备用联系人姓名不能为空!'
                    }
                }
            },
            id_card: {
                validators: {
                    notEmpty: {
                        message: '身份证号码不能为空!'
                    },
                    regexp: {
                        /* 只需加此键值对，包含正则表达式，和提示 */
                        regexp:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                        message: '请输入正确的身份证号码.'
                    }
                }
            },
            alternate_contact_mobile:  {
                validators: {
                    notEmpty: {
                        message: '备用联系人电话不能为空!'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    }/*,
                     regexp: {
                     regexp: /^1[7|3|5|8]{1}[0-9]{9}$/,
                     message: '请输入正确的手机号码'
                     }*/
                }
            }
        }
    })
}

function cleanChooseOldUser(obj) {
    $('#choose_user_type').val('new');
    $("#userInfo").find("input[type='text']").each(function () {
        $(this).attr("readOnly",false);
    })

    $("#exist_user").val('');
    $("#exist_user_id").val('');

    $('#user_id').val('');
    $('#user_name').val('');
    $('#emp_name').val('');
    $('#english_name').val('');
    //$('#birth_temp').val('');
    $('#email').val('');
    $('#telephone').val('');
    $('#mobile').val('');
    $('#alternate_contact').val('');
    $('#alternate_contact_mobile').val('');
    $('#supervisor').val('');
    $('#job').val('');
    $('#supervisor_name').val('');

}
/*
 * 主管选择
 */
function showSupervisor(obj,type) {
    if('choose_super'==type && 'choose_old_user'== $('#choose_user_type').val()){
        return;
    }
    $('#choose_user_type').val(obj);
    /*
     * 人员列表初始化
     */
    var SuperTableInit = function () {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#tb_supervisorlist').bootstrapTable({
                url: '${ctx}/../userPageList', // 请求后台的URL（*）
                method: 'get', // 请求方式（*）
                toolbar: '#toolbar', // 工具按钮用哪个容器
                striped: true, // 是否显示行间隔色
                cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, // 是否显示分页（*）
                sortable: true, // 是否启用排序
                sortName: 'emp_name',
                sortOrder: "asc", // 排序方式
                queryParams: oTableInit.queryParams,// 传递参数（*）
                sidePagination: "server", // 分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1, // 初始化加载第一页，默认第一页
                pageSize: 5, // 每页的记录行数（*）
                pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
                search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: false, // 是否显示所有的列
                showRefresh: false, // 是否显示刷新按钮
                minimumCountColumns: 2, // 最少允许的列数
                clickToSelect: true, // 是否启用点击选中行
                uniqueId: "user_id", // 每一行的唯一标识，一般为主键列
                showToggle: false, // 是否显示详细视图和列表视图的切换按钮
                cardView: false, // 是否显示详细视图
                detailView: false, // 是否显示父子表
                singleSelect: true,//禁止多选
                columns: [{
                    checkbox: true,
                    width: '2%'
                }/*, {
                    // field: 'Number',//可不加
                    title: '序号',// 标题 可不加
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    width: '3%'
                }*/, {
                    field: 'company_name',
                    title: '所属公司',
                    sortable: false,
                    width: '15%'
                }, {
                    field: 'dept_name',
                    title: '所属部门',
                    sortable: true,
                    width: '30%'
                }, {
                    field: 'job',
                    title: '职务',
                    sortable: true,
                    width: '10%'
                }, {
                    field: 'user_name',
                    title: '系统用户名称',
                    sortable: false,
                    visible: false,
                    width: '10%'
                }, {
                    field: 'emp_name',
                    title: '中文姓名',
                    sortable: false,
                    width: '10%'
                }, {
                    field: 'telephone',
                    title: '手机号码',
                    sortable: false,
                    width: '10%'
                }, {
                    field: 'email',
                    title: '邮箱',
                    sortable: false,
                    width: '10%'
                }]
            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit, // 页面大小
                offset: params.offset, // 页码
                emp_name: $("#query_emp_name").val(),
                email: $("#query_email").val(),
                telephone: $("#query_telephone").val(),
                user_status: $("#query_userStatues").val(),
                choose_user_type: $("#choose_user_type").val(),
                org_id: $("#org_id").val(),
                usertype:$('#updateType').val(),
                user_id:$('#exist_user_id').val()?$('#exist_user_id').val():$('#user_id').val(),
                sortName: params.sort,
                sortOrder: params.order
            };
            return temp;
        };
        return oTableInit;
    };

    /*
     * 用户列表
     */
    // 1.初始化Table
    var SuperTableInit = new SuperTableInit();
    SuperTableInit.Init();
    $("#supervisor-select").modal("show");
}
/*
 * 部门选择方法
 */
function showOrg(obj) {
    if ('new' == obj) {
        $('#dept_name').val();
        $('#dept_id').val();
    }
    $.ajax({
        url: '${ctx}/../../org/getOrgNodeTree',
        async: false,
        type: 'POST',
        dataType: 'JSON',
        success: function (result) {
            if (result.flag == "0") {
                var data = [result.data.orgTree];
                $('#org_tree').treeview({
                    data: data,
                    onNodeSelected: function (event, data) {
                        $('#dept_name').val(data.text);
                        $('#dept_id').val(data.id);
                        $("#show-org").modal("hide");
                    }
                })
                // 展开所有节点
                $('#org_tree').treeview('expandAll', {
                    levels: 3,
                    silent: true
                });
            } else {
                FrameUtils.alert('加载出错！');
            }
        }
    });
    $("#show-org").modal("show");
}
/*
 * 获取主管领导勾选方法
 */
function getSupervisorSelections() {
    return $.map($('#tb_supervisorlist').bootstrapTable('getSelections'),
        function (row) {
            return row;
        });
}
/*
 * 校验用户名不能为中文
 */
function valideName(obj) {
    var  value = obj.value.replace(/[\u4E00-\u9FA5]/g,'');
    value=value.replace(/[ ]/g,'')
    $('#user_name').val(value);
}
/*
 * 确认主管领导
 */
function confirmSupervisor() {
    var obj =  $('#choose_user_type').val();
    var aArray = getSupervisorSelections();
    if (aArray.length < 1) {
        FrameUtils.alert("请选择上级主管！");
        return;
    } else if (aArray.length > 1) {
        FrameUtils.alert("只能选择一位上级主管！");
        return;
    }
    if (obj == 'new') {
        $("#supervisor_name").val(aArray[0].emp_name);
        $("#supervisor").val(aArray[0].user_id);
    }else if(obj == 'choose_old_user'){
        $("#userInfo").find("input[type='text']").each(function () {
            $(this).attr("readOnly",true);
        })
        $("#exist_user").val(aArray[0].emp_name);
        $("#exist_user_id").val(aArray[0].user_id);

        $('#user_id').val(aArray[0].user_id);
        $('#user_name').val(aArray[0].user_name);
        $('#emp_name').val(aArray[0].emp_name);
        $('#english_name').val(aArray[0].english_name);
        //$('#birth_temp').val(aArray[0].birth_temp);
        $('#email').val(aArray[0].email);
        $('#telephone').val(aArray[0].telephone);
        $('#mobile').val(aArray[0].mobile);
        $('#alternate_contact').val(aArray[0].alternate_contact);
        $('#alternate_contact_mobile').val(aArray[0].alternate_contact_mobile);
        $('#supervisor').val(aArray[0].supervisor);
        $('#job').val(aArray[0].job);
        $('#supervisor_name').val(aArray[0].supervisor_name);
        $('#supervisor').val(aArray[0].supervisor);

    }
    $("#supervisor-select").modal("hide");
}

$(function () {

    /*
     * 初始化下拉列表
     */
    $('#sex').selectpicker('val', [ $('#sex_t').val() ]);
    $('#bank_name').selectpicker('val', [ $('#bank_name_t').val() ]);

    var type = $('#updateType').val();
    if (!type ||'new' ==type) {
        $('#chooseOldUser').show();
        userValide(null);
        $("#nextPeojrct").hide();
    } else if ("update" == type) {
        userValide($('#update_user_name').val());
        $("#chooseOldUser").hide();
        /*
         if($('#birth').val()){
         var birthdate = new Date($('#birth').val());
         var birthText = birthdate.getFullYear() + "-"
         + (birthdate.getMonth() + 1) + "-" + birthdate.getDate();
         $('#birth_temp').val(birthText);
         $('#birth').val(birthdate);
         }
         */

    }
    /*
     * 时间控件定义
     */
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        autoclose: true,// 自动关闭
        weekStart: 1,
        todayBtn: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $("#downExsitUser").hide();
    $("#rightExsitUser").show();
});

$(document)
    .ready(
        function () {
            /*
             * 部门选择隐藏方法
             */
            $('#showOrgHide').click(function () {
                $("#show-org").modal("hide");
            });
            /*
             * 获取用户列表勾选方法
             */
            function getSelections() {
                return $.map($('#tb_userlist').bootstrapTable(
                    'getSelections'), function (row) {
                    return row;
                });
            }

            /*
             * 用户新增
             */
            $('#btn_add').click(function () {
                $("#modal-container-483451").modal("show");
            });
            /*
             * 初始化密码
             */
            $('#initUserPassword').click(function () {
                var url = '${ctx}/../initUserPassword?editUserId=' + $('#user_id').val()+"&org_id="+$('#org_id').val();
                $.ajax({
                    url: url,
                    async: false,
                    type: 'POST',
                    dataType: 'JSON',
                    success: function (result) {
                        if (result.flag == "0") {
                            FrameUtils.alert('初始化密码成功！');

                        } else if (result.flag == "3") {
                            FrameUtils.alert("保存成功，请重新登录。");
                            var form = $("#usereditInitpsLogoutForm");//定义一个form表单
                            form.submit();//表单提交
                        } else {
                            FrameUtils.alert(result.msg);
                        }
                    }
                });
            });
            /*
             * 用户新增保存
             */
            $("#saveUser")
                .click(
                    function () {

                        var bootstrapValidator = $("#userEdit").data('bootstrapValidator');
                        /*     bootstrapValidator.addField("org_name");
                         bootstrapValidator.addField("dept_name");*/
                        /*   bootstrapValidator.addField("birth_temp");*/
//                        bootstrapValidator.addField("supervisor_name");
                        bootstrapValidator.validate();
                        if (!bootstrapValidator.isValid()) {
                            return;
                        }
                        var url = '${ctx}/../saveUserInfo';
                        if ($("#updateType").val() == 'update') {
                            url = '${ctx}/../UpdateUserInfo';
                        }
                        url+="?org_id="+$('#org_id').val();
                        if ($("#updateType").val() == 'update' ||$("#choose_user_type").val()=='choose_old_user' ) {
                            url = '${ctx}/../UpdateUserInfo?org_id='+$('#org_id').val()+"&choose_user_type=choose_old_user&editType="+$("#updateType").val();
                        }
                        var data = {
                            user_id: $(
                                '#exist_user_id').val(),
                            user_name: $(
                                '#user_name')
                                .val(),
                            emp_name: $(
                                '#emp_name')
                                .val(),
                            english_name: $(
                                '#english_name')
                                .val(),
                             birth_temp:  $(
                             '#birth_temp')
                             .val(),
                            email: $('#email')
                                .val(),
                            telephone: $(
                                '#telephone')
                                .val(),
                            mobile: $('#mobile')
                                .val(),
                            alternate_contact: $(
                                '#alternate_contact')
                                .val(),
                            alternate_contact_mobile: $(
                                '#alternate_contact_mobile')
                                .val(),
                            /* org_id: $('#org_id')
                             .val(),*/
                            dept_id: $('#dept_id')
                                .val(),
                            id_card: $('#id_card')
                                .val(),
                            supervisor: $(
                                '#supervisor')
                                .val(),
                            job: $('#job').val(),
                            sex: $('#sex').val(),
                            work_space: $('#work_space').val(),
                            emp_number: $('#emp_number').val()
                        };
                        if('update'==$("#updateType").val()){
                            data.user_id = $('#user_id').val()
                        }
                        if(!data.user_id){
                            data.user_id = -1;
                        }
                        if(!data.supervisor  && 'new' == $("#updateType").val()){
                            data.supervisor = -1;
                        }
                        $.ajax({
                            url: url,
                            data:data,
                            async: false,
                            type: 'POST',
                            dataType: 'JSON',
                            success: function (result) {

                                if (result.flag == "0") {
                                    FrameUtils.alert('保存成功！');

                                    window.location.href = "${ctx}/../userList?org_id="+result.data;
                                } else {
                                    FrameUtils.alert(result.msg);
                                }
                            }
                        });
                    })

            /*
             * 查询按钮
             */
            $('#query').click(function () {
                $('#tb_userlist').bootstrapTable('refresh', {
                    url: '${ctx}/../userPageList'
                });
            });

            /*
             * 关闭主管领导
             */
            $('#hideSupervisor').click(function () {
                var type = $('#updateType').val();
                if (!type ||'new' ==type && !$('#exist_user_id').val()) {
                    cleanChooseOldUser();
                }

                $("#supervisor-select").modal("hide");
            });
            /*
             * 返回组织列表页面
             */
            $('#returnUserList').click(function () {
                window.location.href="${ctx}/../userList?org_id="+$('#org_id').val();
            });
            /*
             * 返回组织列表页面
             */
            $('#cancelUpdate').click(function () {
                window.location.href="${ctx}/../userList?org_id="+$('#org_id').val();
            });
            $("#returnUserAddressList").click(function () {
                        window.location.href="${ctx}/../userAddressList";
            });
        });