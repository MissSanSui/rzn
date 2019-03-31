<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
	<head>
		<title>系统异常</title>
		<%@ include file="/WEB-INF/jsp/common/init.jsp"%>
		<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
		<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
		<%
		    
	      int status_code = -1;     
	      status_code = ((Integer) request.getAttribute("javax.servlet.error.status_code")); 
	      String exception_info = (String) request.getAttribute("javax.servlet.error.message");
	      String message = (String)request.getAttribute("message");
	     
		%>
	</head>
	<body>
		<div class="container frame-container">
		    <section class="row-fluid frame-row-fluid loginBox">
		        <%
		        	if(message!=null && !"".equals(message)){
		        %>
				        <div class="page-header frame-page-header">
				            <h4>页面请求异常</h4>
				        </div>
				        <div>
				        	<%=message %>
				        </div>
				<%
				}else if(status_code==4040000){
				%>
				<div class="page-header frame-page-header">
					<h4>功能正在建设中......</h4>
				</div>
		        <%		
		        	}else if(status_code==500){
		        
		        %>
		        		<div class="page-header frame-page-header">
				            <h4>服务器异常</h4>
				        </div>
				        <div>
				        	<%=exception_info %>
				        </div>

		        <%
		        	}
		        %>
    		</section>
    	</div>
	</body>
</html>