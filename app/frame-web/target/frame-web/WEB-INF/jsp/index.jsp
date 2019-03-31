<%@ include file="/WEB-INF/jsp/common/init.jsp" %>
<%@ include file="/WEB-INF/jsp/common/meta.jsp" %>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<style type="text/css">


    .right-align {
        float: right;
    }


</style>
<html>
<head>
    <title>首页</title>
    <script type="text/javascript">





        $(document)
                .ready(
                        function () {

                        })
    </script>
</head>

<body>
<div class="container frame-container">
    <div class="row frame-row" id="index_row">

        <div class="col-md-4">
            <div class="sidebar">
                <div style="  margin-bottom: 20px;" id="imgDiv">


                </div>
                <div class="widget" style="padding: 10px 12px; margin-bottom: 20px;height: 40%;">


                    <div class="title"> 快捷入口</div>
                    <div class="widget-content">
                        <div class="shortcuts" id="shortcutId">


                        </div>
                    </div>

                </div>

            </div>

        </div>




    </div>
</div>
</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
