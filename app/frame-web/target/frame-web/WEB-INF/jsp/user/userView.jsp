<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>

<title>User Management</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
</head>
<script src="${ctx}/resources/js/user/userEdit.js"></script>
<link rel="stylesheet"
	href="${ctx}/resources/css/bootstrap-table-custom-userEdit.css">
<body>
<div class="frame-index">
	    <ul class="breadcrumb frame-index-breadcrumb">
	        <li><a href="#">用户管理</a></li>
	        <li><a href="#">用户信息查看</a></li>
	    </ul>
</div>
<div class="container frame-container">
<div class="row frame-row ">
		<div class="panel frame-panel panel-default">
			<div class="panel-heading frame-panel-heading">
	            <h3 class="panel-title">用户信息</h3>
	        </div>
			<form id="usereditInitpsLogoutForm" action="${ctx}/logout" method="post">
			</form>
			<form action="/saveUser" id="userEdit">
			<input type="hidden" value="${type}" id="updateType">
			<input type="hidden"   id="user_id" value="${updateUser.user_id}" >
			<input type="hidden"   id="update_user_name" value="${updateUser.user_name}" >
					<div class="panel-body frame-panel-body">
					<div class="col-md-4 column">
						<%--<small><label
							for="org_id" style="font-weight: normal">所属公司</label></small>
						<div class="form-group">

							<input type="text" id="org_name"
								class="form-control frame-form-control input-sm" value="${updateUser.company_name}"
							 readonly="readonly" name="org_name" />
						</div>--%>
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
								   disabled="disabled"  value="${updateUser.birth_temp}"> <!--<span class="input-group-addon"> <span
									class="glyphicon glyphicon-remove" ></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-calendar"></span></span> -->
							<input type="hidden" id="birth" value="${updateUser.birth}"/><br />
						</div>
						<!--  <div class="form-group">
                                        <small><span style="color:red">*</span><label for="birth" style="font-weight:normal">出生日期</label></small>
                                        <input type="text"  id="birth" data-date-format="yyyy-mm-dd">
                                        <input type="text" placeholder="YYYYMMDD"  class="form-control frame-form-control input-sm"  id="birth" />
                                    </div> -->
						<%-- <small><label for="birth"
							style="font-weight: normal">出生日期</label></small>
						<div class="form-group">
							 
								<input class="form-control frame-form-control input-sm"  id="birth_temp"  type="text" name="birth_temp"
									disabled="disabled"  value="${updateUser.birth}"> <!--<span class="input-group-addon"> <span
									class="glyphicon glyphicon-remove" ></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-calendar"></span></span> -->
							<input type="hidden" id="birth" value="${updateUser.birth}"/><br />
						</div> --%>
						<%-- <small><label for="password"
							style="font-weight: normal">登录密码</label></small>
						<div class="form-group">
							<input type="text"
								class="form-control frame-form-control input-sm" id="password"  value="${updateUser.password}"
								name="password" />
						</div> --%>

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
				<div align="right">
				<button type="button" class="btn frame-btn-form  btn-primary  btn-sm"
							id="initUserPassword">初始化密码</button>
					<button type="button" style="margin-right: 5px" id="returnUserList"
						class="btn frame-btn-form btn-default  btn-sm"
						data-dismiss="modal">返回</button>
					<!-- <button type="button"
						class="btn frame-btn-form  btn-primary  btn-sm" id="saveUser">保存</button> -->
				</div>
			</form>
		</div>
		<div class="modal fade frame-modal" id="show-org" role="dialog"
			aria-labelledby="showOrg" data-backdrop="static"
			data-keyboard="false">
			<div class="modal-dialog frame-modal-dialog " style="width: 25%">
				<div class="modal-content frame-modal-content">
					<!-- 模态框header -->
					<div class="modal-header frame-modal-header">
						<!-- 右上角的x -->
						<button type="button" class="close frame-close"
							data-dismiss="modal" aria-hidden="true">&times;</button>
						<!-- 模态框标题 -->
						<h4 class="modal-title frame-modal-title" id="showOrg">部门选择</h4>
					</div>
					<div class="modal-body frame-modal-body" style="overflow-y: auto;">
						<table id="org_tree" style="width: auto"></table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn frame-btn-form btn-default"
							id="showOrgHide">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal  fade  frame-modal" tabindex="-1"
			style="display: none;" id="supervisor-select" role="dialog"
			aria-labelledby="supervisor-select" data-backdrop="static"
			data-keyboard="false">
			<div class="modal-dialog frame-modal-dialog" style="width: 90%">
				<div class="modal-content frame-modal-content">
					<!-- 模态框header -->
					<div class="modal-header frame-modal-header">
						<!-- 右上角的x -->
						<button type="button" class="close frame-close"
							data-dismiss="modal" aria-hidden="true">&times;</button>
						<!-- 模态框标题 -->
						<h4 class="modal-title frame-modal-title"
							id="supervisor-select-heade">主管选择</h4>
					</div>
					<div class="modal-body frame-modal-body" style="overflow-y: auto;">
						<div class="form-horizontal">
							<div class="form-group frame-form-group form-inline col-md-4">
								<label
									class="control-label frame-control-label frame-sm-label col-md-4"
									for="username">姓名：</label> <input type="text"
									class="form-control input-sm frame-form-control frame-input-sm co col-md-4"
									id="username" name="username"/>
							</div>
							<div class="form-group frame-form-group form-inline col-md-4">
								<label
									class="control-label frame-control-labelframe-sm-label  col-md-4"
									for="userEmail">邮箱：</label> <input type="text"
									class="form-control input-sm frame-form-control frame-input-sm co col-md-4"
									id="userEmail" name="userEmail"/>
							</div>
							<div class="form-group frame-form-group form-inline col-md-4">
								<label
									class="control-label frame-control-label frame-sm-label col-md-4"
									for="userPhone">手机：</label> <input type="text"
									class="form-control input-sm frame-form-control frame-input-sm  col-md-4"
									id="userPhone" name="userPhone" />
							</div>
						</div>
						<div class="navbar-form frame-navbar-form navbar-right">
							<button id="query" type="button"
								class="btn btn-default btn-xs frame-btn-form btn-primary"
								role="button">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
							</button>
							<button type="submit"
								class="btn btn-default btn-xs frame-btn-form btn-primary"
								id="confirmSupervisor" onclick="confirmSupervisor('new')">确定</button>
							<button type="button"
								class="btn btn-default btn-xs frame-btn-form btn-primary"
								id="hideSupervisor">取消</button>

						</div>
						<table id="tb_supervisorlist"></table>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
