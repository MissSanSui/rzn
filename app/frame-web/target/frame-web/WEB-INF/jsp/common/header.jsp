<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="com.frame.kernel.menu.model.MenuNode"%>
<html lang="en">
<head>
<%
	// 从session中取出菜单树
	@SuppressWarnings("unchecked")
	List<MenuNode> mainMenu = (List<MenuNode>) session.getAttribute("mainMenu");
	String editUserId = session.getAttribute("currentUserId")+"";
%>
<style>
.dropdown:hover .dropdown-menu {
	display: block;
}
</style>
<script type="text/javascript">
$(function() {
	$("#editUserId").val('<%=editUserId%>');
});
	function userEditValide() {
		/*
		 * 用户新增页面校验
		 */
		$('#userEditIndex')
				.bootstrapValidator(
						{
							message : 'This value is not valid',
							feedbackIcons : {
								valid : 'glyphicon glyphicon-ok',
								invalid : 'glyphicon glyphicon-remove',
								validating : 'glyphicon glyphicon-refresh'
							},
							fields : {
								editEmail : {
									validators : {
										notEmpty : {
											message : '邮箱地址不能为空!'
										},
										emailAddress : {
											message : '请填写有效的邮箱地址!'
										}
									}
								},
								eidtEmpName : {
									validators : {
										notEmpty : {
											message : '中文姓名不能为空!'
										}
									}
								},
								editTel : {
									validators : {
										notEmpty : {
											message : '工作电话不能为空!'
										},
										regexp : {/* 只需加此键值对，包含正则表达式，和提示 */
											regexp : /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/,
											message : '请输入正确的工作电话'
										}
									}
								},
								editMobile : {
									validators : {
										notEmpty : {
											message : '手机号码不能为空!'
										},
										stringLength : {
											min : 11,
											max : 11,
											message : '请输入11位手机号码'
										},
										regexp : {
											regexp : /^1[7|3|5|8]{1}[0-9]{9}$/,
											message : '请输入正确的手机号码'
										}
									}
								},
								editConNewPassword : {
									validators : {
										callback : {
											message : '两次新密码必须一致！',

											callback : function(value,
													validator) {
												var conNewPassword = $(
														"#editNewPassword")
														.val();
												if ((!conNewPassword && value)
														|| (conNewPassword && !value)
														|| (value && conNewPassword != value)) {
													return false
												}
												return true;

											}
										}
									}
								},
								editNewPassword : {
									validators : {
										regexp : {/* 只需加此键值对，包含正则表达式，和提示 */
											regexp : /^[A-Za-z0-9]{6,20}$/,
											message : '请输入6-20位字母数字组合密码！'
										}
									}
								}
							}
						})
	}
	function editInfo() {
		userEditValide();
		var url = '${ctx}/user/userEditView?user_id='+"<%=editUserId%>";
		$.ajax({
			url : url,
			async : false,
			type : 'POST',
			dataType : 'JSON',
			success : function(result) {
				
				if (result.flag == "0") {
					var data = result.data;
					$("#editEmpEgName").val(data.english_name);
					$("#editEmpName").val(data.emp_name);
					$("#editTel").val(data.telphone);
					$("#editMobile").val(data.mobile);
					$("#editEmail").val(data.email);
					$("#editUserId").val("<%=editUserId%>");
					$("#editOldPassword").val('');
					$("#editNewPassword").val('');
					$("#editConNewPassword").val('');
					$("#edit_user_modal").modal("show");
				} else {
					alert("加载失败:"+result.msg);
				}
			}
		});
		
	}
	function saveEditInfo() {

		var bootstrapValidator = $("#userEditIndex").data('bootstrapValidator');
		bootstrapValidator.validate();
		if (!bootstrapValidator.isValid()) {
			return;
		}
		var url = '${ctx}/user/UpdateUserInfoIndex';
		$.ajax({
			url : url,
			data : {
				editEmpEgName : $('#editEmpEgName').val(),
				editEmpName : $('#editEmpName').val(),
				editTel : $('#editTel').val(),
				editMobile : $('#editMobile').val(),
				editEmail : $('#editEmail').val(),
				editOldPassword : $('#editOldPassword').val(),
				editNewPassword : $('#editNewPassword').val(),
				editConNewPassword : $('#editConNewPassword').val(),
				user_id : "<%=editUserId%>"
			},
			async : false,
			type : 'POST',
			dataType : 'JSON',
			success : function(result) {
				if (result.flag == "0") {
					alert("保存成功");
					 cancelEditInfo() ;
				}else if (result.flag == "3") {
					alert("保存成功，请重新登录。");
					var form=$("#logoutForm");//定义一个form表单
					form.submit();//表单提交
				}else {
					alert(result.msg);
				}
			}
		});
	}
	function cancelEditInfo() {
		debugger
		$("#editEmpEgName").val('');
		$("#editEmpName").val('');
		$("#editTel").val('');
		$("#editMobile").val('');
		$("#editEmail").val('');
		$("#editUserId").val('');
		$("#editOldPassword").val('');
		$("#editNewPassword").val('');
		$("#editConNewPassword").val('');
		$("#userEditIndex").data('bootstrapValidator').destroy();
		$('#userEditIndex').data('bootstrapValidator', null);
		$("#edit_user_modal").modal("hide");
	}
	// 页面跳转
	function loadPage(req_uri) {

		window.location.href = '${ctx}' + req_uri;

	}
</script>
</head>
<body>

	<div>
		<%--菜单栏--%>
		<nav class="navbar vsino-navbar-main navbar-inverse navbar-fixed-top"
			role="navigation">
			<div class="container-fluid" style="padding-left: 0px">
				<div class="navbar-header">
					<%--作用:降低浏览器分辨率后出现菜单按钮--%>
					<button class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-collapse">
						<span class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<%--<a class="navbar-brand" href="#" onclick="loadPage('/index')">VISNO</a>--%>

				</div>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<%-- 一级菜单 --%>
						<li class="dropdown" id="0"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown"
							aria-expanded="false" onclick="loadPage('/index')"> 首页 </a></li>
						<c:forEach var="menu" items="<%=mainMenu%>">
							<li class="dropdown" id="${menu.menu_id}"><a href="#"
								class="dropdown-toggle" data-toggle="dropdown"
								aria-expanded="false"> ${menu.menu_name}<span class="caret"></span>
							</a> <%-- 二级菜单 --%>
								<ul class="dropdown-menu">
									<c:forEach var="child" items="${menu.children}">
										<li id="${child.menu_id}"><a href="#"
											onclick="loadPage('${child.url}')">${child.menu_name}</a> <%--<ul class="dropdown-menu">--%>
											<%--<c:forEach var="grandchild" items="${child.children}">--%>
											<%--<li id="${grandchild.menu_id}">--%> <%--<a href="#"--%> <%--onclick="loadPage('${grandchild.url}')">${grandchild.menu_name}</a>--%>
											<%--</li>--%> <%--</c:forEach>--%> <%--</ul>--%></li>
									</c:forEach>
								</ul></li>
						</c:forEach>
					</ul>
					<div style="color: white; float: right; font-size: 13px; font-weight: 300; line-height: 1.4; height: 45px; padding-top: 10px; display: table; margin: 0 auto;">
						<form id="logoutForm" action="${ctx}/logout" method="post">
							<button type='button' class='btn btn-link btn-xs' onclick="editInfo()"><strong>${currentUserName}</strong></button>，欢迎您！
							<button type='submit' class='btn btn-link btn-xs' name='logout'>注销</button>
						</form>
					</div>
				</div>
			</div>
		</nav>
	</div>
	<!-- 弹出层的模态窗口 start -->
	<div class="modal frame-modal fade" id="edit_user_modal" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog frame-modal-dialog" style="width: 40%;">
			<div class="modal-content frame-modal-content">
				<div class="modal-header frame-modal-header">
					<button type="button" class="close frame-close"
						data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title frame-modal-title">编辑信息</h3>
				</div>
				<div class="modal-body frame-modal-body" style="overflow-y: auto;">
					<div class="row clearfix">
						<form action="/" id="userEditIndex">
							<div class="col-md-6 column">

								<input type="hidden" id="editUserId"> <label
									class="control-label frame-control-label frame-sm-label"
									for="editEmpName"><span style="color: red">*</span>中文名
									：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="text" style="width: 60%"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editEmpName" name="eidtEmpName" />
								</div>

								<label class="control-label frame-control-label frame-sm-label "
									for="editEmpEgName">英文名：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="text"
										class="form-control input-sm frame-form-control frame-input-sm "
										id="editEmpEgName"  />
								</div>
								<label class="control-label frame-control-label frame-sm-label"
									for="editEmail"><span style="color: red">*</span>邮箱：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="text"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editEmail" name="editEmail" />
								</div>
								<label class="control-label frame-control-label frame-sm-label "
									for="editTel"><span style="color: red">*</span>工作电话：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="text"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editTel" name="editTel" />
								</div>
							</div>
							<div class="col-md-6 column">
								<label class="control-label frame-control-label frame-sm-label "
									for="editMobile"><span style="color: red">*</span>手机：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="text"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editMobile" name="editMobile" />
								</div>
								<label class="control-label frame-control-label frame-sm-label "
									for="editOldPassword">旧密码：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="password"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editOldPassword" name="editOldPassword" />
								</div>
								<label class="control-label frame-control-label frame-sm-label "
									for="editNewPassword">新密码：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="password"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editNewPassword" name="editNewPassword" />
								</div>
								<label class="control-label frame-control-label frame-sm-label "
									for="editConNewPassword">确认新密码：</label>
								<div class="form-group frame-form-group form-inline">
									<input type="password"
										class="form-control input-sm frame-form-control frame-input-sm"
										id="editConNewPassword" name="editConNewPassword" />
								</div>
							</div>
						</form>
					</div>
					<div class="navbar-form frame-navbar-form navbar-right">
						<button type="button" onclick="cancelEditInfo()"
							class="btn btn-default btn-xs frame-btn-form btn-primary"
							role="button">
							<span class="glyphicon glyphicon-search" aria-hidden="true"></span>取消
						</button>
						<button type="button" onclick="saveEditInfo()"
							class="btn btn-default btn-xs frame-btn-form btn-primary"
							role="button">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>保存
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>
</body>
</html>