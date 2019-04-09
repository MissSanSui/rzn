<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html>
<head>

    <title>User Management</title>
    <%@ include file="/WEB-INF/jsp/common/init.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/meta.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/header.jsp" %>


</head>
<link rel="stylesheet" href="${ctx}/resources/lib/imgUpload/css/img_upload.css">
<link rel="stylesheet" href="${ctx}/resources/lib/imgUpload/css/fileinput.css">
<script src="${ctx}/resources/lib/imgUpload/js/fileinput.js"></script>
<script src="${ctx}/resources/lib/imgUpload/js/locales/zh.js" type="text/javascript"></script>
<script src="${ctx}/resources/lib/imgUpload/js/locales/zh-TW.js" type="text/javascript"></script>
<style type="text/css">


    .left-align {
        float: left !important;
    }

    .right-align {
        float: right !important;
    }

    .input_wrapper {
        overflow: hidden;
        margin-bottom: 8px;
    }

    .self_button {
        padding: 5px 5px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        background: none;
        border: 1px #555 solid;
        background-color: blue;
    }

    .input_wrapper input {
        box-sizing: border-box;
        border: 1px solid #dfdfdf;
        width: 100%;
        height: 30px;
        outline: medium;
    }
</style>
<script type="text/javascript">

    function updateImg(value) {
        $("#upload-img").modal("show");
        $("#updateImgeId").val(value);
    }
    function saveInfo(value) {
        if($('#text'+value).val().length>100){
            FrameUtils.alert('描述不能大于50个汉字.');
            return
        }
       var flagValue = "N";
        if($('#flag'+value).is(':checked')){
            flagValue = 'Y';
        }else{
            flagValue = 'N';
        }

        $.ajax({
            url: "${ctx}/homeImage/saveImgInfo",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify( {
                sequence_num:value+"",
                description:$('#text'+value).val(),
                flag:flagValue
            }),

            success: function (result) {

                if (result.flag == "0") {


                    FrameUtils.confirmAlert('保存成功', function () {
                        $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                        $("#imgListForm").submit();

                    });
                   /* FrameUtils.alert('保存成功！');
                    $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                    $("#imgListForm").submit();*/

                } else {
                    FrameUtils.confirmAlert('保存失败:'+result.msg, function () {
                        $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                        $("#imgListForm").submit();
                    });
                }
            }
        });
    }
    $(document)
            .ready(
                    function () {
                        $('#UploadImgeFile').fileinput({
                            language: 'zh',
                            uploadUrl: '${ctx}/homeImage/addFishPicture',
                            allowedFileExtensions: ['jpg', 'png', 'jpeg', 'bmp'],
                            showUpload: false,
                            layoutTemplates: {
                                // actionDelete:'', //去除上传预览的缩略图中的删除图标
                                actionUpload: '',//去除上传预览缩略图中的上传图片；
                                actionZoom: ''   //去除上传预览缩略图中的查看详情预览的缩略图标。
                            },
                            uploadExtraData: function (previewId, index) {   //额外参数的关键点
                                var obj = {};
                                obj.updateImgeId = $("#updateImgeId").val();
                                obj.id = 1;
                                console.log(obj);
                                return obj;
                            },
                            maxFileCount: 1, //表示允许同时上传的最大文件个数
                            enctype: 'multipart/form-data'
                        });
                        $("#UploadImgeFile").on("fileuploaded", function (event, data, previewId, index) {
                            if (data.response.flag == "0") {


                                FrameUtils.confirmAlert('保存成功', function () {
                                    $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                                    $("#imgListForm").submit();

                                });
                                /* FrameUtils.alert('保存成功！');
                                 $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                                 $("#imgListForm").submit();*/

                            } else {
                                FrameUtils.confirmAlert('保存失败:'+data.response.msg, function () {
                                    $('#imgListForm').attr("action" ,"${ctx}/homeImage/imageList?timestamp=" + new Date().getTime() );
                                    $("#imgListForm").submit();
                                });
                            }

                            console.log(data)
                           console.log(event)
                           console.log(previewId)
                           console.log(index)
                        });
                        /*
                         * 查询按钮
                         */
                        $('#query').click(function () {
                            $('#tb_bulletin_list').bootstrapTable('refresh', {
                                url: '${ctx}/bulletin/bulletinPageList'
                            });
                        });
                        /*
                         * 提交图片上传
                         */
                        $('#submitImg').click(function () {
                            $('#UploadImgeFile').fileinput('upload');
                        });


                    });

    /**
     * 公告详细信息
     */
    function bulletinDetail(id) {
        $('#editBulletinId').val(id);
        $('#editType').val("update");
        $('#editBulletinInfoForm').attr("action", "${ctx}/bulletin/viewBulletinInfoPage");
        $("#editBulletinInfoForm").submit();
    }
    ;
</script>
<body>
<div class="frame-index">
    <ul class="breadcrumb frame-index-breadcrumb">
        <li><a href="#">首页图片轮播管理</a></li>
    </ul>
</div>
<div class="container frame-container">

    <div class="row frame-row">

        <div class="col-sm-6 col-md-4">
            <span class="thumbnail">
                <img id="picOne" name="pic" src="${ctx}/resources/images/home/${imgMap[SequeMap['one']]}"
                     onclick="updateImg(${SequeMap['one']})"
                     style="width: 378px;height:245px"
                     alt="首页图片轮播"/>
                <div class="  input_wrapper " style="margin-top: 5px">

                    <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                           id="text${SequeMap['one']}" value="${infoMap[SequeMap['one']]==null?"":infoMap[SequeMap['one']].getDescription()}"/>
                </div>
                 <div class="form-group " style="margin-top: 5px">
                     <div class="input-group" style="width:100%;">
                         <span   class="frame-font-format">   是否启用：</span> 
                         <c:if test="${infoMap[SequeMap['one']].getFlagYm()=='Y'}">
                             <input type="checkbox" id="flag${SequeMap['one']}"   checked >
                         </c:if>
                         <c:if test="${infoMap[SequeMap['one']].getFlagYm()=='N'}">
                             <input type="checkbox" id="flag${SequeMap['one']}"  >
                         </c:if>
                          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span
                             style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                         <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                         <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['one']})">
                             保存
                         </button>
                     </div>
                 </div>
            </span>

        </div>
        <div class="col-sm-6 col-md-4">
             <span class="thumbnail">
                <img name="picTwo" id="picTwo" src="${ctx}/resources/images/home/${imgMap[SequeMap['two']]}"
                     style="width: 378px;height:245px" onclick="updateImg(${SequeMap['two']})"
                     alt="首页图片轮播"/>
                 <div class="input_wrapper" style="margin-top: 5px">
                     <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                            id="text${SequeMap['two']}" value="${infoMap[SequeMap['two']]==null?"":infoMap[SequeMap['two']].getDescription()}"/>
                 </div>
                  <div class="form-group " style="margin-top: 5px">
                      <div class="input-group" style="width:100%;">
                            <span   class="frame-font-format">   是否启用：</span>  
                          <c:if test="${infoMap[SequeMap['two']].getFlagYm()=='Y'}">
                              <input type="checkbox" id="flag${SequeMap['two']}"   checked >
                          </c:if>
                          <c:if test="${infoMap[SequeMap['two']].getFlagYm()=='N'}">
                              <input type="checkbox" id="flag${SequeMap['two']}"  >
                          </c:if>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span
                              style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                          <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                          <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['two']})">
                              保存
                          </button>
                      </div>
                  </div>
             </span>
        </div>
        <div class="col-sm-6 col-md-4">
            <span class="thumbnail">
                <img name="picThree" id="picThree" src="${ctx}/resources/images/home/${imgMap[SequeMap['three']]}"
                     style="width: 378px;height:245px" onclick="updateImg(${SequeMap['three']})"
                     alt="首页图片轮播"/>
                <div class="input_wrapper" style="margin-top: 5px">
                    <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                           id="text${SequeMap['three']}" value="${infoMap[SequeMap['three']]==null?"":infoMap[SequeMap['three']].getDescription()}"/>
                </div>
                 <div class="form-group " style="margin-top: 5px">
                     <div class="input-group" style="width:100%;">
                         <span   class="frame-font-format">   是否启用：</span> 
                         <c:if test="${infoMap[SequeMap['three']].getFlagYm()=='Y'}">
                             <input type="checkbox" id="flag${SequeMap['three']}"   checked >
                         </c:if>
                         <c:if test="${infoMap[SequeMap['three']].getFlagYm()=='N'}">
                             <input type="checkbox" id="flag${SequeMap['three']}"  >
                         </c:if>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <span
                                style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                         <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                         <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['three']})">
                             保存
                         </button>
                     </div>
                 </div>
            </span>
        </div>
    </div>
    <div class="row frame-row">
        <div class="col-sm-6 col-md-4">
            <span class="thumbnail">
                <img name="picFour" id="picFour"  src="${ctx}/resources/images/home/${imgMap[SequeMap['four']]}"
                     style="width: 378px;height:245px" onclick="updateImg(${SequeMap['four']})"
                     alt="首页图片轮播"/>
                 <div class="input_wrapper" style="margin-top: 5px">
                     <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                            id="text${SequeMap['four']}" value="${infoMap[SequeMap['four']]==null?"":infoMap[SequeMap['four']].getDescription()}"/>
                 </div>
                 <div class="form-group " style="margin-top: 5px">
                     <div class="input-group" style="width:100%;">
                         <span   class="frame-font-format">   是否启用：</span> 
                         <c:if test="${infoMap[SequeMap['four']].getFlagYm()=='Y'}">
                             <input type="checkbox" id="flag${SequeMap['four']}"   checked >
                         </c:if>
                         <c:if test="${infoMap[SequeMap['four']].getFlagYm()=='N'}">
                             <input type="checkbox" id="flag${SequeMap['four']}"  >
                         </c:if>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <span
                                style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                         <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                         <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['four']})">
                             保存
                         </button>
                     </div>
                 </div>
            </span>
        </div>
        <div class="col-sm-6 col-md-4">
            <span class="thumbnail">
                <img name="picFive" id="picFive" src="${ctx}/resources/images/home/${imgMap[SequeMap['five']]}"
                     style="width: 378px;height:245px" onclick="updateImg(${SequeMap['five']})"
                     alt="首页图片轮播"/>
                <div class="input_wrapper" style="margin-top: 5px">
                    <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                           id="text${SequeMap['five']}" value="${infoMap[SequeMap['five']]==null?"":infoMap[SequeMap['five']].getDescription()}"/>
                </div>
                 <div class="form-group " style="margin-top: 5px">
                     <div class="input-group" style="width:100%;">
                         <span   class="frame-font-format">   是否启用：</span> 
                         <c:if test="${infoMap[SequeMap['five']].getFlagYm()=='Y'}">
                             <input type="checkbox" id="flag${SequeMap['five']}"   checked >
                         </c:if>
                         <c:if test="${infoMap[SequeMap['five']].getFlagYm()=='N'}">
                             <input type="checkbox" id="flag${SequeMap['five']}"  >
                         </c:if>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <span
                                style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                         <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                         <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['five']})">
                             保存
                         </button>
                     </div>
                 </div>
            </span>
        </div>
        <div class="col-sm-6 col-md-4">
            <span class="thumbnail">
                <img name="picSix" id="picSix" src="${ctx}/resources/images/home/${imgMap[SequeMap['six']]}"
                     style="width: 378px;height:245px" onclick="updateImg(${SequeMap['six']})"
                     alt="首页图片轮播"/>
                 <div class="input_wrapper" style="margin-top: 5px">
                     <input type="text" class="form-control input-sm frame-form-control " placeholder="输入描述文字..."
                            id="text${SequeMap['six']}" value="${infoMap[SequeMap['six']]==null?"":infoMap[SequeMap['six']].getDescription()}"/>

                 </div>
                 <div class="form-group " style="margin-top: 5px">
                     <div class="input-group" style="width:100%;">
                         <span   class="frame-font-format">   是否启用：</span> 
                         <c:if test="${infoMap[SequeMap['six']].getFlagYm()=='Y'}">
                             <input type="checkbox" id="flag${SequeMap['six']}"   checked >
                         </c:if>
                         <c:if test="${infoMap[SequeMap['six']].getFlagYm()=='N'}">
                             <input type="checkbox" id="flag${SequeMap['six']}"  >
                         </c:if>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <span
                                style="color: red;" class="frame-font-red">点击图片区域更新图片</span>
                         <%-- <span  class="input-group-addon self_button" ><span class="glyphicon glyphicon-floppy-saved" style="color: white"></span></span>--%>
                         <button type="button" class="btn btn-xs btn-info right-align" style="background-color: blue" onclick="saveInfo(${SequeMap['six']})">
                             保存
                         </button>
                     </div>
                 </div>
            </span>
        </div>
    </div>

    <div class="modal fade" id="upload-img" tabindex="-1" role="dialog" aria-labelledby="upload-imgLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width:65%">
            <div class="modal-content" style="width:85%">
                <div class="modal-header">
                    <%--记录本次修改为图片id--%>
                    <input id="updateImgeId" type="hidden">
                    <!-- 右上角的x -->
                    <button type="button" class="close  "
                            data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h5 class="modal-title frame-modal-title"
                        id="supervisor-select-heade">图片选择</h5>
                </div>
                <form enctype="multipart/form-data" method="POST">
                    <div class="modal-body">
                        <%--id name 不能变 后台通过这个获取文件对象--%>
                        <input id="UploadImgeFile" name="UploadImgeFile" type="file" data-min-file-count="1">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary frame-btn-form"
                                id="submitImg">提交
                        </button>
                    </div>
                </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
    <form id="imgListForm" method="post" action="">

    </form>
    <form id="saveImgInfoForm" method="post" action="">
        <input type="hidden"  name="textInfo" id="textInfo" value=""/>
        <input type="hidden"  name="displayFlag" id="displayFlag" value=""/>
        <input type="hidden"  name="sequenceNum" id="sequenceNum" value=""/>
    </form>
</div>

</body>

</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
