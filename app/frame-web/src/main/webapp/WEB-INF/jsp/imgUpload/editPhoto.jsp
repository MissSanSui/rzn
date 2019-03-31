<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE>
<html>
<head>

    <title>User Management</title>
    <%@ include file="/WEB-INF/jsp/common/init.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/meta.jsp" %>
    <%@ include file="/WEB-INF/jsp/common/header.jsp" %>
    <%--图片上传裁剪css--%>
    <link rel="stylesheet" href="${ctx}/resources/css/cropper.min.css">
    <link rel="stylesheet" href="${ctx}/resources/css/pictureCut.css">
    <%--图片上传裁剪js--%>
    <script src="${ctx}/resources/lib/caijian/cropper.js"></script>
    <script src="${ctx}/resources/lib/caijian/exif.js"></script>
    <script src="${ctx}/resources/js/pictureCut/pictureCut.js"></script>
</head>

<body style="margin: auto;text-align: center;">
<section style="margin-top: 50px;">
    <input id="photoBtn" type="button" onclick="document.getElementById('inputImage').click()" value="选择照片"><!-- 可以增加自己的样式 -->
    <input  id="inputImage"  type="file" accept="image/*" style="display: none;"/>
    <br/>
    <img  id="showImg" />
</section>

<div class="container" style="padding: 0;margin: 0;position:fixed;display: none;top: 0;left: 0;z-index: 200;" id="containerDiv">
    <div class="row" style="display: none;height: 70%" id="imgEdit">
        <div class="col-md-9">
            <div class="img-container">
                <img src="" alt="Picture">
            </div>
        </div>
    </div>
    <div class="row" id="actions" style="padding: 0;margin: 0;width: 100%; bottom: 5px;">
        <div class="col-md-9 docs-buttons">
            <div class="btn-group"  >
                <button type="button" class="btn btn-primary" data-method="destroy" title="Destroy" style="height: auto;">
	            <span class="docs-tooltip" data-toggle="tooltip" >
	              <span class="fa fa-power-off" >取消</span>
	            </span>
                </button>
            </div>

            <div class="btn-group btn-group-crop " style="float: right;">
                <button type="button" class="btn btn-primary" id="imgCutConfirm" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 100 }" style="height: auto;margin-right: 17px;">
                    <span class="docs-tooltip" data-toggle="tooltip" title="">确认</span> <!--cropper.getCroppedCanvas({ width: 320, height: 180 }) -->
                </button>
            </div>

        </div><!-- /.docs-buttons -->
    </div>
</div>

<!-- 预览  预留右边预览没实现-->
<div class="modal fade docs-cropped" id="getCroppedCanvasModal" style="display: none"
     role="dialog" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="getCroppedCanvasTitle" >预览</h4>
            </div>
            <div class="modal-body"> </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" style="height: auto;">取消</button>
                <a class="btn btn-primary" id="imgCutConfirm" href="javascript:void(0);" style="height: auto;">确认</a>
            </div>
        </div>
    </div>
</div><!-- /.预览 -->

</body>
<script type="text/javascript">
    var fileImg = "";

    $(function(){

        $("#imgCutConfirm").bind("click",function(){
            $("#containerDiv").hide();
            $("#imgEdit").hide();
            $("#getCroppedCanvasModal").modal("hide");
        })
    })

    //提交表达
    function submitForm(){
        $("#registerForm").attr("enctype","multipart/form-data");

        var formData = new FormData($("#registerForm")[0]);
        formData.append("imgBase64",encodeURIComponent(fileImg));//
        formData.append("fileFileName","photo.jpg");


        $.ajax({
            url: "",
            type: 'POST',
            data: formData,
            timeout : 10000, //超时时间设置，单位毫秒
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
            },
            error: function (returndata) {
                Alert.closedLoading();
            }
        });
    }
</script>

</html>
<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>