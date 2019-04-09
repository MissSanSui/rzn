<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>

    <title>User Management</title>
    <%@ include file="/WEB-INF/jsp/common/init.jsp"%>
    <%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
    <%@ include file="/WEB-INF/jsp/common/header.jsp"%>
    <%--图片上传裁剪css--%>
    <link rel="stylesheet" href="${ctx}/resources/css/cropper.min.css">
    <link rel="stylesheet" href="${ctx}/resources/css/pictureCut.css">
    <%--图片上传裁剪js--%>
    <script src="${ctx}/resources/lib/caijian/cropper.js"></script>
    <script src="${ctx}/resources/lib/caijian/exif.js"></script>
    <script src="${ctx}/resources/js/pictureCut/pictureCut.js"></script>
</head>
<script src="${ctx}/resources/js/user/userEdit.js"></script>
<link rel="stylesheet"
      href="${ctx}/resources/css/bootstrap-table-custom-userEdit.css">
<body>
<style>
    .img-frame-customer  {

        margin-top: 8%;
        margin-left: 20%;


    }

</style>
<script type="text/javascript">
    var fileImg = "";

    $(function(){

        $("#imgCutConfirm").bind("click",function(){
            $("#containerDiv").hide();
            $("#imgEdit").hide();
            $("#getCroppedCanvasModal").modal("hide");
        })



    })
    $(document)
            .ready(
                    function () {

                        var screenWidth1 = 808;
                        var screenHeight1 =  516;
                        $("#PictureBackBround").width(screenWidth1).height(screenHeight1);
                        $("#buttonsDiv").width(screenWidth1).height(screenHeight1);
                        $("#showImg").attr('src',$("#photoDefulat").val());

                        /*
                         * 信息保存
                         */
                        $("#saveUserInfoSelf")
                                .click(
                                        function () {

                                            var imgSrc = $("#showImg")[0].currentSrc;

                                            var url = '${ctx}/userAddress/UpdateUserSelfInfo';

                                            var data = {
                                                bank_name:$('#bank_name').val(),
                                                bank_branch_name: $('#bank_branch_name').val(),
                                                bank_account: $('#bank_account').val(),
                                                photo:imgSrc
                                            };

                                            console.log(data);

                                            $.ajax({
                                                url: url,
                                                method: "post",
                                                dataType: "json",
                                                contentType: "application/json",
                                                data: JSON.stringify( {
                                                                    bank_name:$('#bank_name').val(),
                                                                    bank_branch_name: $('#bank_branch_name').val(),
                                                                    bank_account: $('#bank_account').val(),
                                                                    photo:imgSrc
                                                    }),

                                                success: function (result) {

                                                    if (result.flag == "0") {
                                                        FrameUtils.alert('保存成功！');

                                                    } else {
                                                        FrameUtils.alert(result.msg);
                                                    }
                                                }
                                            });
                                        })
    })


</script>
<div class="frame-index">
    <ul class="breadcrumb frame-index-breadcrumb">
        <li><a href="#">用户管理</a></li>
        <li><a href="#">用户信息修改</a></li>
    </ul>
</div>
<div class="container frame-container">
    <div class="row frame-row ">
        <div class="panel frame-panel panel-default">
            <div class="panel-heading frame-panel-heading">
                <h3 class="panel-title">用户信息</h3>
            </div>
            <input type="hidden" id="photoDefulat" value="${updateUser.photo_str}"/>
            <form id="usereditInitpsLogoutForm" action="${ctx}/logout" method="post">
            </form>
            <form action="/" id="userEdit">
                <input type="hidden"   id="user_id" value="${updateUser.user_id}" >
                <input type="hidden"   id="update_user_name" value="${updateUser.user_name}" >
                <div class="panel-body frame-panel-body">
                    <div class="col-md-4 column">
                       <small><label
                                for="dept_id" style="font-weight: normal">所属部门</label></small>
                        <div class="form-group">
                            <input type="hidden" id="org_id" value="${org_id }">
                            <input type="text"
                                   class="form-control frame-form-control input-sm" id="dept_name" value="${updateUser.dept_name}"
                                   name="dept_name" disabled="disabled"> <input type="hidden"
                                                                                id="dept_id">
                        </div>
                        <small><label
                                for="supervisor" style="font-weight: normal">上级主管</label></small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control frame-form-control input-sm"  value="${updateUser.supervisor_name}"
                                   id="supervisor_name" name="supervisor_name" disabled="disabled" /> <input
                                type="hidden" id="supervisor"  value="${updateUser}.supervisor" >
                        </div>
                        <small><label for="job"
                                                                       style="font-weight: normal">职务</label></small>
                        <div class="form-group">
                            <input type="text" disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="job"  value="${updateUser.job}"
                                   name="job" />
                        </div>
                        <small><label for="id_card"
                                                                       style="font-weight: normal">身份证号</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="id_card" value="${updateUser.id_card}"
                                   name="id_card"/>
                        </div>
                        <small><label for="emp_number"
                                                                       style="font-weight: normal">员工编号</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="emp_number" value="${updateUser.emp_number}"
                                   name="emp_number"/>
                        </div>
                        <small><label for="sex"
                                      style="font-weight: normal">性别</label></small>
                        <div class="form-group">
                            <input type="hidden" id="sex_t"
                                   value="${updateUser.sex}" />
                            <select name="project_status"  disabled="disabled"
                                    class="selectpicker form-control frame-form-control input-sm "
                                    data-size="6" data-live-search="false" id="sex"
                                    name="sex">
                                <option value=""></option>
                                <c:forEach var="ite" items="${sexList}">
                                    <option value="${ite.dic_item_code}">
                                            ${ite.dic_item_name}</option>
                                </c:forEach>
                            </select>
                        </div>

                    </div>
                    <div class="col-md-4 column">

                        <small><label
                                for="user_name" style="font-weight: normal">系统用户名称</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="user_name"  value="${updateUser.user_name}"
                                   name="user_name" />
                        </div>
                        <small><label
                                for="emp_name" style="font-weight: normal">中文姓名</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="emp_name"  value="${updateUser.emp_name}"
                                   name="emp_name" />
                        </div>
                        <small><label for="english_name"
                                      style="font-weight: normal">英文姓名</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm"  value="${updateUser.english_name}"
                                   id="english_name" name="english_name" />
                        </div>

                        <small><label for="work_space"
                                      style="font-weight: normal">工作地点</label></small>
                        <div class="form-group">
                            <input type="text" disabled="disabled"
                                   class="form-control frame-form-control input-sm" value="${updateUser.work_space}"
                                   id="work_space" name="work_space"/>
                        </div>
                        <small><label for="birth"
                                                                       style="font-weight: normal">出生日期</label></small>
                        <div class="form-group">

                            <input class="form-control frame-form-control input-sm"  id="birth_temp"  type="text" name="birth_temp"
                                   disabled="disabled"  value="${updateUser.birth_temp}">
                            <input type="hidden" id="birth" value="${updateUser.birth}"/><br />
                        </div>
                        

                    </div>
                    <div class="col-md-4 column">
                        <small><label for="email"
                                                                       style="font-weight: normal">邮箱地址</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="email"  value="${updateUser.email}"
                                   name="email" />
                        </div>
                        <small><label
                                for="telephone" style="font-weight: normal">工作电话</label></small>
                        <div class="form-group">
                            <input type="text"  disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="telephone"  value="${updateUser.telephone}"
                                   name="telephone" />
                        </div>
                        <small><label
                                for="mobile" style="font-weight: normal">手机号码</label></small>
                        <div class="form-group">
                            <input type="text" disabled="disabled"
                                   class="form-control frame-form-control input-sm" id="mobile" value="${updateUser.mobile}"
                                   name="mobile" />
                        </div>
                        <small><label
                                for="alternate_contact" style="font-weight: normal">备用联系人姓名</label></small>
                        <div class="form-group">
                            <input type="text" disabled="disabled"
                                   class="form-control frame-form-control input-sm"  value="${updateUser.alternate_contact}"
                                   id="alternate_contact" name="alternate_contact" />
                        </div>
                        <small><label
                                for="alternate_contact_mobile" style="font-weight: normal">备用联系人电话</label></small>
                        <div class="form-group">
                            <input type="text" disabled="disabled"
                                   class="form-control frame-form-control input-sm" value="${updateUser.alternate_contact_mobile}"
                                   id="alternate_contact_mobile" name="alternate_contact_mobile" />
                        </div>
                    </div>
                </div>
                <span  class="panel-title collapsed " > <strong>&nbsp;&nbsp;&nbsp;&nbsp;信息修改</strong></span>
                <HR  color=#987cb9 SIZE=1 style="margin-top:0px;margin-bottom:31px">
                <div class="panel-body frame-panel-body">

                    <div class="col-md-4 column">
                        <small><label
                                for="bank_name" style="font-weight: normal">银行名称</label></small>

                        <div class="form-group">
                            <input type="hidden" id="bank_name_t"
                                   value="${updateUser.bank_name}" />
                            <select name="bank_name"
                                    class="selectpicker form-control frame-form-control input-sm "
                                    data-size="6" data-live-search="false" id="bank_name"
                                    name="bank_name">
                                <option value=""></option>
                                <c:forEach var="ite" items="${bankList}">
                                    <option value="${ite.dic_item_code}">
                                            ${ite.dic_item_name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 column">
                        <small><label
                                for="bank_branch_name" style="font-weight: normal">支行名称</label></small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control frame-form-control input-sm" id="bank_branch_name"  value="${updateUser.bank_branch_name}"
                                   name="bank_branch_name" />
                    </div>
                        </div>
                    <div class="col-md-4 column">
                        <small><label
                                for="bank_account" style="font-weight: normal">银行账号</label></small>
                        <div class="form-group">
                            <input type="text"
                                   class="form-control frame-form-control input-sm" id="bank_account"  value="${updateUser.bank_account}"
                                   name="bank_account" />
                    </div>
                    </div>

                </div>
                <div class="panel-body frame-panel-body">
                    <div class="col-md-12 column " >
                        <div class="row " style="align-items: center">
                            <small><label   style="font-weight: normal">相片</label></small>

                            <section style="margin-top: 50px;text-align: center;">
                                <input id="photoBtn" type="button" onclick="document.getElementById('inputImage').click()" value="选择照片" style="margin-bottom: 5px"><!-- 可以增加自己的样式 -->
                                <input  id="inputImage"  type="file" accept="image/*" style="display: none;"/>
                                <br/>
                                <img  id="showImg" width="300" height="300"/>
                            </section>

                            <div class="container" style="padding: 0;margin: 0;position:fixed;display: none;top: 0;left: 0;z-index: 100;" id="containerDiv">
                                <div class="row  img-frame-customer" style="display: none;"  id="imgEdit">
                                    <div class="col-md-9" id="PictureBackBround">
                                        <div class="img-container" >
                                            <img src="" alt="Picture">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="actions" style="padding: 0;margin: 0;width: 100%; bottom: 5px;margin-top: 5px">
                                    <div class="col-md-9 docs-buttons" id="buttonsDiv" style="text-align: right;margin-left: 20%;">
                                        <div class="btn-group" >
                                            <button type="button" class="btn btn-primary" data-method="destroy" title="Destroy" style="height: auto;">
                                            <span class="docs-tooltip" data-toggle="tooltip" >
                                              <span class="fa fa-power-off" >取消</span>
                                            </span>
                                            </button>
                                        </div>

                                        <div class="btn-group btn-group-crop " style="float: right;">
                                            <button type="button" class="btn btn-primary" id="imgCutConfirm" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 180 }" style="height: auto;margin-right: 17px;">
                                                <span class="docs-tooltip" data-toggle="tooltip" title="">确认</span> <!--cropper.getCroppedCanvas({ width: 320, height: 180 }) -->
                                            </button>
                                        </div>
                                    </div><!-- /.docs-buttons -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div align="right">
                    <button type="button" class="btn frame-btn-form  btn-primary  btn-sm"
                            id="saveUserInfoSelf">保存</button>
                    <button type="button" style="margin-right: 5px" id="returnUserAddressList"
                            class="btn frame-btn-form btn-default  btn-sm"
                            data-dismiss="modal">返回</button>
                </div>
            </form>
        </div>


    </div>
</div>
</body>
</html>


