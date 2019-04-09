package com.frame.business.contracts.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.business.contracts.model.Contracts;
import com.frame.business.contracts.service.ContractsService;
import com.frame.kernel.base.model.AjaxResult;
import com.frame.kernel.user.model.User;
import com.frame.kernel.util.CommonUtils;
import com.frame.kernel.util.JSONUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/contracts")
public class ContractsController {
	private AjaxResult ajaxResult = new AjaxResult();
	@Autowired
	private ContractsService contractsService;

	private Logger logger = LoggerFactory.getLogger(getClass());
	@ResponseBody
	@RequestMapping("contractsList")
	public String  contractsList(HttpServletRequest request, HttpServletResponse response){
		JSONObject js = new JSONObject();//=&=desc
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		String offset = request.getParameter("offset");
		String limit = request.getParameter("limit");
		String contract_no = request.getParameter("contract_no");
		String contract_stu = request.getParameter("contract_stu");
		String contract_stu_name =request.getParameter("contract_stu_name");
		String contract_room_no = request.getParameter("contract_room_no");

		int offsetInt = Integer.parseInt(CommonUtils.isEmpty(offset)?"0":offset);
		int limitInt = Integer.parseInt(CommonUtils.isEmpty(limit)?"10":limit);
		List<Contracts> list = new ArrayList<Contracts>();
		int total = 0;
		try {
			list = contractsService.getList
					( offsetInt, limitInt,CommonUtils.isEmpty(sortName)?"contract_tea":sortName,
							CommonUtils.isEmpty(sortOrder)?"desc":sortOrder, contract_no,contract_stu,
							contract_room_no,
							contract_stu_name);
			total = contractsService.findCount(contract_no,contract_stu,
					contract_room_no,
					contract_stu_name);
		} catch (Exception e) {
			e.printStackTrace();
		}
		js.put("total", total);
		js.put("rows", list);
		logger.info(JSONUtil.ToFormatJson(js));
		return JSONUtil.ToFormatJson(js);
	}
	@ResponseBody
	@RequestMapping("findContractByNo")
	public String  findContractByNo(HttpServletRequest request, HttpServletResponse response){

		String  contractNo= request.getParameter("contractNo");
		String contract_stu = request.getParameter("contract_stu");
		String contract_stu_name =request.getParameter("contract_stu_name");
		String contract_room_no = request.getParameter("contract_room_no");
		try {
			Contracts contracts = contractsService.findContracts(contractNo,contract_stu,contract_room_no,
					contract_stu_name);
			ajaxResult.success("查询成功",contracts);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
	@ResponseBody
	@RequestMapping("deleteContractByNo")
	public String  deleteContractByNo(HttpServletRequest request, HttpServletResponse response){

		String  contractNo= request.getParameter("contract_no");

		try {
			  contractsService.deleteContracts(contractNo);
			ajaxResult.success("删除成功！");
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("删除出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}

	@ResponseBody
	@RequestMapping(value = "saveContracts", method = RequestMethod.POST)
    public String saveContracts(HttpServletRequest request, HttpServletResponse response, Contracts contracts) {

		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			contracts.setCreated_by(userLogin.getUser_id());
			contracts.setLast_updated_by(userLogin.getUser_id());
			contractsService.saveContracts(contracts);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("UpdateContractsInfo")
    public String UpdateContractsInfo(HttpServletRequest request, HttpServletResponse response, Contracts contracts) {
		try {
			Subject subject = SecurityUtils.getSubject();
			User userLogin = (User) subject.getPrincipal();
			contracts.setLast_updated_by(userLogin.getUser_id());
			contractsService.updateContracts(contracts);
			ajaxResult.success("保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.addError("保存失败："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
    }
	@ResponseBody
	@RequestMapping("findContractList")
	public String  findContractList(HttpServletRequest request, HttpServletResponse response){

		String  contractNo= request.getParameter("contractNo");
		String contract_stu = request.getParameter("contract_stu");
		String contract_stu_name =request.getParameter("contract_stu_name");
		String contract_room_no = request.getParameter("contract_room_no");
		try {
			List<Contracts>  contractsList = contractsService.findContractsList(contractNo,contract_stu,contract_room_no,
					contract_stu_name);
			ajaxResult.success("查询成功",contractsList);
		} catch (Exception e) {

			e.printStackTrace();
			ajaxResult.addError("查询出错："+e.getMessage());
		}
		return JSONUtil.ToFormatJson(ajaxResult);
	}
}