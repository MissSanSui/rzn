<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-cn" class="login-bg">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>登录页面</title>
    <%@ include file="/WEB-INF/jsp/common/init.jsp" %>
    <link rel="stylesheet" href="${ctx}/resources/lib/bootswatch/yeti/bootstrap.min.css">
    <link rel="stylesheet" href="${ctx}/resources/lib/bootswatch/yeti/bootstrap-responsive.css">
    <link rel="stylesheet" href="${ctx}/resources/lib/bootswatch/yeti/bootstrap-overrides.css">

    <script src="${ctx}/resources/lib/jquery/3.1.1/jquery.min.js"></script>
    <!-- 【2】Bootstrap核心js文件 -->
    <script src="${ctx}/resources/lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="${ctx}/resources/css/signin.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/login/layout.css" />
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/login/elements.css" />
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/login/icons.css" />
    <script type="text/javascript" src="${ctx}/resources/lib/jquery/3.1.1/jquery.cookie.js"></script>


    <script type="text/javascript">

        $(function () {

            //监听收入项，当存在输入则隐藏错误信息
            $('input').change(function () {
                $('span').text('');
            });
            //监听当前页面的回车事件
            $(document).keyup(function (e) {
                var curKey = e.which;
                if (curKey == 13) {
                    submitForm();
                }
            });

            //当点击页面提交按钮时触发
            $('button').click(function () {
                submitForm();
            });


            //添加用户名输入框
            $('#userName').blur(function () {
                var _curUserName = $(this).val();
                var _rmbUserFlag = $.cookie("rmbUser");
                var _remUserName = $.cookie("username");
                var _remPwd_ = $.cookie("password");
                if (_curUserName && _rmbUserFlag && _rmbUserFlag == "true" && _curUserName == _remUserName) {
                    $("#password").val(_remPwd_);
                    $("input[type=checkbox]").prop("checked", true);
                }
            });

            function submitForm() {
                var _um = $('#username').val();
                var _pwd = $('#password').val();
                //验证用户名
                if (_um) {
                    //进一步步验证
                } else {
                    $('.errorMessage').text("用户名不能为空！");
                    $('#username').focus();
                    return false;
                }
                //验证密码
                if (_pwd) {
                    //进一步步验证
                } else {
                    $('.errorMessage').text("密码不能为空！");
                    $('#password').focus();
                    return false;
                }

                //将数据保存到cookie

                if ($("input[type=checkbox]").prop("checked")) {
                    $.cookie("rmbUser", "true", {
                        expires: 1
                    }); //存储一个带7天期限的cookie
                    $.cookie("username", _um, {
                        expires: 1
                    });
                    $.cookie("password", _pwd, {
                        expires: 1
                    });
                } else {
                    $.cookie("rmbUser", "false", {
                        expire: -1
                    });
                    $.cookie("username", "", {
                        expires: -1
                    });
                    $.cookie("password", "", {
                        expires: -1
                    });
                }
                //提交表单
                $("#form").submit();
            }
        });
    </script>
</head>

<body>
<div class="row-fluid login-wrapper">
    <div class="logo"></div>


    <form id="form" role="form" action="loginUser" method="post">
        <div class="logo"   ></div>
        <div class="span4 box">
            <div class="content-wrap">
                <h6>登录</h6>
                <div class="form-group frame-form-group has-feedback">

                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    <input type="text"
                           class="form-control frame-form-control inputWidth"
                           id="username" name="username"
                           placeholder="用户名" autofocus
                           value="${userName}">
                </div>
                <div class="form-group frame-form-group has-feedback">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    <input type="password"
                           class="form-control frame-form-control inputWidth"
                           id="password" name="password"
                           placeholder="密码">
                </div>
                <div class="checkbox remember" style="text-align: center;"  >
                    <label>
                        <input type="checkbox" name="remember" value="Y" ${remember=="Y"?"checked":""}>记住密码
                    </label>
                </div>
                <div>
                    <button type="button" class="btn-glow primary login">登录</button>
                </div>
                <div>
                    <span class="errorMessage" style="color: red">${errorMessage}</span>
                </div>
            </div>
        </div>
    </form>
</div>
</section>
<!-- /loginBox -->
</div>
<!-- /container -->
</body>
</html>