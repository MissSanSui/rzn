<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE>
<html>
<head>

<title>User Management</title>
<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<link rel="stylesheet" href="${ctx}/resources/css/bootstrap-table-custom.css">
</head>
<script src="${ctx}/resources/js/user/userManage.js"></script>
<body>
<div class="frame-index">
	    <ul class="breadcrumb frame-index-breadcrumb">
	        <li><a href="#">系统管理</a></li>
	        <li><a href="#">用户管理</a></li>
	    </ul>
	</div>
	<div class="container frame-container">
		<div class="row frame-row" >
		 <!-- 组织树 -->
        <div class="col-md-4">
            <div class="panel frame-panel panel-default">
           		<div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title frame-panel-title">组织树</h3>
                </div>
                <div class="panel-body frame-panel-body" style="height: 106%; max-height: 106%; overflow-y: auto;">
                    <div id="org_tree"></div>
                    <input type="hidden" id="parent_id"/>
                </div>
            </div>
        </div>
        <div class="col-md-8">
	         <div class="panel frame-panel panel-default">
	         <input type="hidden" id="org_id" value="${org_id }"/>
	         <input type="hidden" id="org_name" value="${org_name }"/>
	         	<div class="panel-heading frame-panel-heading">
                    <h3 class="panel-title frame-panel-title">用户列表</h3>
                  
                </div>
				<div class="frame-workspace" style="height: 100%; max-height: 100%; overflow-y: auto;">
					<div class="form-horizontal"  >
						<div class="form-group frame-form-group form-inline col-md-4">
							<label
								class="control-label frame-control-label frame-sm-label "
								for="query_emp_name">姓名：</label> <input type="text"
								class="form-control input-sm frame-form-control frame-input-sm  "
								id="query_emp_name" />
						</div>
					<!-- 	<div class="form-group frame-form-group form-inline col-md-4">
							<label
								class="control-label frame-control-label frame-sm-label col-md-4"
								for="query_userNumner">员工编号：</label> <input type="text"
								class="form-control frame-form-control input-sm frame-input-sm col-md-8"
								id="query_userNumner" />
						</div> -->
						<div class="form-group frame-form-group form-inline col-md-4">
							<label
								class="control-label frame-control-labelframe-sm-label  "
								for="query_userEmail">邮箱：</label> <input type="text"
								class="form-control input-sm frame-form-control frame-input-sm "
								id="query_email"  />
						</div>
	
						<div class="form-group frame-form-group form-inline col-md-4">
							<label
								class="control-label frame-control-label frame-sm-label  "
								for="query_userPhone">手机：</label> <input type="text"
								class="form-control input-sm frame-form-control frame-input-sm  "
								id="query_telephone" />
						</div>
						<div class="form-group frame-form-group form-inline col-md-4">
							<label
								class="control-label frame-control-label frame-sm-label "
								for="query_userStatues">状态：</label> <select
								class="form-control input-sm frame-form-control frame-input-sm  "
								id="query_userStatues">
								<option value="">-请选择-</option>
								<option value="open">启用</option>
								<option value="close">禁用</option>
							</select>
						</div>
						 
					</div>
					<div class="navbar-form frame-navbar-form navbar-right" style="padding-top: 1px">
						<button id="query" type="button"
							class="btn btn-default btn-xs frame-btn-form btn-primary"
							role="button">
							<span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
						</button>
						<button id="btn_add" type="button"
							class="btn btn-default btn-xs frame-btn-form btn-primary"
							role="button" >
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
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
							终止
						</button>
					</div>
					<table id="tb_userlist"  ></table>
				</div>
			</div>
		</div>
			<div  class="modal  fade frame-modal" tabindex="-1" style="display: none;"   id="modal-container-483451"
				role="dialog" data-backdrop="static" data-keyboard="false"
				aria-labelledby="AddUserLabel">
				<div class="modal-dialog frame-modal-dialog" style="width: 85%" >
					<div class="modal-content frame-modal-content">
						<!-- 模态框header -->
						<div class="modal-header frame-modal-header">
							<!-- 右上角的x -->
							<button type="button" class="close frame-close"
								data-dismiss="modal" aria-hidden="true">&times;</button>
							<!-- 模态框标题 -->
							<h4 class="modal-title frame-modal-title" id="AddUserLabel">新建用户</h4>
						</div>
						<div class="modal-body frame-modal-body" style="overflow-y: auto;">
							<form action="/saveUser" id="userEdit">
								<div class="row clearfix">
									<div class="col-md-4 column">
										 
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="supervisor" style="font-weight: normal">上级主管</label></small>
											<div class="input-group" onclick="showSupervisor('new')">
												<input type="text"
													class="form-control frame-form-control input-sm"
													id="supervisor_name" readonly /> <input type="hidden"
													id="supervisor"> <span class="input-group-addon"><span
													class="glyphicon glyphicon-search"></span></span>
											</div>
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="job" style="font-weight: normal">职务</label></small> <input
												type="text" class="form-control frame-form-control input-sm"
												id="job" />
										</div>

									</div>
									<div class="col-md-4 column">
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="user_name" style="font-weight: normal">系统用户名称</label></small> <input
												type="text" class="form-control frame-form-control input-sm"
												id="user_name" />
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="emp_name" style="font-weight: normal">中文姓名</label></small> <input
												type="text" class="form-control frame-form-control input-sm"
												id="emp_name" />
										</div>
										<div class="form-group">
											<small><label for="english_name"
												style="font-weight: normal">英文姓名</label></small> <input type="text"
												class="form-control frame-form-control input-sm"
												id="english_name" />
										</div>
										<!--  <div class="form-group">
                                        <small><span style="color:red">*</span><label for="birth" style="font-weight:normal">出生日期</label></small>
                                        <input type="text"  id="birth" data-date-format="yyyy-mm-dd">
                                        <input type="text" placeholder="YYYYMMDD"  class="form-control frame-form-control input-sm"  id="birth" />
                                    </div> -->
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="birth" style="font-weight: normal">出生日期</label></small>
											<div class="input-group date form_date" data-date=""
												data-date-format="yyyy-mm-dd" data-link-field="birth"
												data-link-format="yyyy-mm-dd">
												<input class="form-control" size="16" id="birth_temp"
													type="text" value="" readonly> <span
													class="input-group-addon"><span
													class="glyphicon glyphicon-remove"></span></span> <span
													class="input-group-addon"><span
													class="glyphicon glyphicon-calendar"></span></span>
											</div>
											<input type="hidden" id="birth" value="" /><br />
										</div>

									</div>
									<div class="col-md-4 column">
										<small><span style="color: red">*</span><label
											for="email" style="font-weight: normal">邮箱地址</label></small>
										<div class="form-group">
											<input type="text"
												class="form-control frame-form-control input-sm" id="email"
												name="email" />
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="telephone" style="font-weight: normal">工作电话</label></small> <input
												type="text" class="form-control frame-form-control input-sm"
												id="telephone" />
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="mobile" style="font-weight: normal">手机号码</label></small> <input
												type="text" class="form-control frame-form-control input-sm"
												id="mobile" />
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="alternate_contact" style="font-weight: normal">备用联系人姓名</label></small>
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="alternate_contact" />
										</div>
										<div class="form-group">
											<small><span style="color: red">*</span><label
												for="alternate_contact_mobile" style="font-weight: normal">备用联系人电话</label></small>
											<input type="text"
												class="form-control frame-form-control input-sm"
												id="alternate_contact_mobile" />
										</div>
									</div>
								</div>

							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn frame-btn-form btn-default"
								data-dismiss="modal">取消</button>
							<button type="submit" class="btn frame-btn-form  btn-primary"
								id="saveUser">保存</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade frame-modal" id="modal-container-update"
				role="dialog" aria-labelledby="UpdateUserLabel"
				data-backdrop="static" data-keyboard="false">
				<div class="modal-dialog frame-modal-dialog " style="width: 80%">
					<div class="modal-content frame-modal-content">
						<!-- 模态框header -->
						<div class="modal-header frame-modal-header">
							<!-- 右上角的x -->
							<button type="button" class="close frame-close"
								data-dismiss="modal" aria-hidden="true">&times;</button>
							<!-- 模态框标题 -->
							<h3 class="modal-title frame-modal-title" id="UpdateUserLabel">修改用户</h3>
						</div>
						<div class="modal-body frame-modal-body" style="overflow-y: auto;">
							<form action="/UpdateUserInfo" id="userEdit">
								<input type="hidden" id="update_user_id" />
								<div class="col-md-4 column">
									<div class="form-group">
											<small><span style="color: red">*</span><label
												for="supervisor" style="font-weight: normal">上级主管</label></small>
											<div class="input-group" onclick="showSupervisor('update')">
												<input type="text"
													class="form-control frame-form-control input-sm"
													id="update_supervisor_name" readonly /> <input type="hidden"
													id="update_supervisor"> <span class="input-group-addon"><span
													class="glyphicon glyphicon-search"></span></span>
											</div>
										</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_job" style="font-weight: normal">职务</label></small> <input
											type="text" class="form-control frame-form-control input-sm"
											id="update_job" />
									</div>
								</div>

								<div class="col-md-4 column">
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_user_name" style="font-weight: normal">系统用户名称</label></small>
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_user_name" />
									</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_emp_name" style="font-weight: normal">中文姓名</label></small>
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_emp_name" />
									</div>
									<div class="form-group">
										<small><label for="update_english_name"
											style="font-weight: normal">英文姓名</label></small> <input type="text"
											class="form-control frame-form-control input-sm"
											id="update_english_name" />
									</div>
									<!--  <div class="form-group">
                                        <small><span style="color:red">*</span><label for="birth" style="font-weight:normal">出生日期</label></small>
                                        <input type="text"  id="birth" data-date-format="yyyy-mm-dd">
                                        <input type="text" placeholder="YYYYMMDD"  class="form-control frame-form-control input-sm"  id="birth" />
                                    </div> -->
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_birth" style="font-weight: normal">出生日期</label></small>
										<div class="input-group date form_date" data-date=""
											data-date-format="yyyy-mm-dd" data-link-field="birth"
											data-link-format="yyyy-mm-dd">
											<input class="form-control" size="16" id="update_birthTemp"
												type="text" value="" readonly> <span
												class="input-group-addon"><span
												class="glyphicon glyphicon-remove"></span></span> <span
												class="input-group-addon"><span
												class="glyphicon glyphicon-calendar"></span></span>
										</div>
										<input type="hidden" id="update_birth" value="" /><br />
									</div>
									</div>
									<div class="col-md-4 column">
									<small><span style="color: red">*</span><label
										for="update_email" style="font-weight: normal">邮箱地址</label></small>
									<div class="form-group">
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_email" name="update_email" />
									</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_telephone" style="font-weight: normal">工作电话</label></small>
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_telephone" />
									</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_mobile" style="font-weight: normal">手机号码</label></small>
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_mobile" />
									</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_alternate_contact" style="font-weight: normal">备用联系人姓名</label></small>
										<input type="text"
											class="form-control frame-form-control input-sm"
											id="update_alternate_contact" />
									</div>
									<div class="form-group">
										<small><span style="color: red">*</span><label
											for="update_alternate_contact_mobile"
											style="font-weight: normal">备用联系人电话</label></small> <input
											type="text" class="form-control frame-form-control input-sm"
											id="update_alternate_contact_mobile" />
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn frame-btn-form btn-default"
								data-dismiss="modal">取消</button>
							<button type="submit" class="btn frame-btn-form btn-primary"
								id="updateSave">保存</button>
						</div>
					</div>
				</div>
			</div>
			<form id="userEditForm" method="post" action="">

				<input type="hidden"  name="uEFOrg_id" id="uEFOrg_id" value=""/>
				<input type="hidden"  name="uEForg_name" id="uEForg_name" value=""/>
				<input type="hidden"  name="uEFuser_id" id="uEFuser_id" value=""/>
			</form>
		</div>
	</div>

</body>
</html>

<%@ include file="/WEB-INF/jsp/common/footer.jsp" %>
