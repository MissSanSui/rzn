package com.frame.kernel.ossUpload.controller;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.*;
import com.frame.kernel.base.model.AjaxResult;
import com.frame.kernel.common.Constants;
import com.frame.kernel.login.controller.LoginController;
import com.frame.kernel.ossUpload.service.OssUploadService;
import com.frame.kernel.util.JSONUtil;
import com.frame.kernel.util.SystemProperties;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/uploadApi")
public class OssUploadController {
    private AjaxResult ajaxResult = new AjaxResult();
    @Autowired
    private OssUploadService ossUploadService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    /**
     * 上传文件
     *
     * @param request
     * @param file
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json;charset=utf8")
    public String upload(HttpServletRequest request, @RequestParam("file") MultipartFile[] file) {
        logger.debug(">>>in OssUploadController.upload");
        String reloadExist = request.getParameter("reloadExist");
        String errorMsg = "";
        String teaId = request.getParameter("teaId");
        String coursewaresId = request.getParameter("coursewaresId");
        int userId = (int) request.getSession(true).getAttribute("currentUserId");
        String rootPath = request.getSession().getServletContext().getRealPath("/resources/upload");
        StringBuffer existName = new StringBuffer();
        OSSClient ossClient = ossUploadService.getOssClient();
        try {
            if(StringUtils.isEmpty(coursewaresId)|| StringUtils.isEmpty(teaId)|| "null".toLowerCase().equals(coursewaresId) || "null".toLowerCase().equals(teaId) ){
                throw new Exception("课件或老师信息为空！");
            }
            List<File> fileList = new ArrayList<>();
            int count = 0;
            for (MultipartFile myfile : file) {
                if (!myfile.isEmpty()) {

                    String fileName = "";

                    InputStream in = null;
                    OutputStream out = null;
                    File dir = new File(rootPath + File.separator + "tmpFiles");
                    if (!dir.exists())
                        dir.mkdirs();
                    fileName = myfile.getOriginalFilename();

                    File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName);
                    try {
                        in = myfile.getInputStream();
                        out = new FileOutputStream(serverFile);
                        byte[] b = new byte[1024];
                        int len = 0;
                        while ((len = in.read(b)) > 0) {
                            out.write(b, 0, len);
                        }
                        out.close();
                        in.close();

                        boolean isExist = ossUploadService.doesObjectExist(ossClient, fileName, null, null);
                        if (!"Y".equals(reloadExist) && isExist) {
                            existName.append(fileName + ";");
                            continue;
                        }
                        fileList.add(serverFile);

                    } catch (Exception e) {
                        e.printStackTrace();
                        errorMsg = errorMsg + fileName + "上传出错：" + e.getMessage() + ";";
                        count++;
                    }
                }
            }
            Map<String, Map<String, String>> ossObject = new HashMap<>();

            if (count > 0 || !StringUtils.isEmpty(existName)) {
                errorMsg = !StringUtils.isEmpty(existName) ? errorMsg + "已存在文件名称：" + existName.toString() : errorMsg;
                ajaxResult.addError(errorMsg);
            } else {
                if (null != fileList && fileList.size() > 0) {
                    //获取存储空间名
                    BucketInfo info = ossUploadService.getBucketInfo(ossClient, null, null);
                    for (File f : fileList) {
                        // 创建文件元信息。
                        ObjectMetadata meta = new ObjectMetadata();
                        String suffix = f.getName().substring(f.getName().lastIndexOf('.'));
                        /*
                        判断是否为图片若是图片放入快捷地址
                         */
                        String shortcut = "http://" + info.getBucket().getName() + "." + SystemProperties.get("oss.endpoint")+ "/" + f.getName();
                        meta.addUserMetadata("fileAdress", "http://" + info.getBucket().getName() + "." + SystemProperties.get("oss.endpoint") + "/" + f.getName());
                        if (Constants.IMG_SUFFIX.indexOf(suffix) > 0) {
                            shortcut += "?x-oss-process=image/resize,m_fill,h_100,w_200";
                        }
                        meta.addUserMetadata("shortcut", shortcut);
                        meta.addUserMetadata("fileName", f.getName());
                        meta.addUserMetadata("teaId",teaId);
                        meta.addUserMetadata("coursewaresId", coursewaresId);
                        // 设置自定义元信息property值为property-value。建议使用Base64编码。
                        meta.addUserMetadata("suffix", suffix);
                        meta.addUserMetadata("owner", "frame");
                        Map<String,String> userParams = new HashMap<>();
                        userParams =  meta.getUserMetadata();
                        ossObject.put(f.getName(),userParams);
                        ossUploadService.putObject(ossClient, null, f, teaId+"/"+coursewaresId+"/"+f.getName(), null, meta);
                    }
                }
                ajaxResult.success("上传成功",ossObject);
            }
            ObjectListing objectListing = ossClient.listObjects(ossUploadService.getSelectBucketName(ossClient, null, null));
            List<OSSObjectSummary> objectSummary = objectListing.getObjectSummaries();
            System.out.println("您有以下Object：");
            for (OSSObjectSummary object : objectSummary) {
                System.out.println("名称：" + object.getKey());
            }

        } catch (Exception e1) {
            e1.printStackTrace();
            ajaxResult.addError("上传出错：" + e1.getMessage());
        } finally {
            ossUploadService.shutdownOssClient(ossClient);
        }

        logger.debug("<<<out OssUploadController.upload");
        return JSONUtil.ToFormatJson(ajaxResult);
    }

    /**
     * 获取附件列表-无分页
     *
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("fileList")
    public String fileList(HttpServletRequest request, HttpServletResponse response) {
        logger.debug(">>>in OssUploadController.fileList");
        String teaId = request.getParameter("teaId");
        String coursewaresId = request.getParameter("coursewaresId");
        Map<String, Map<String, String>> fileList = new HashMap<>();
        try {
            if(StringUtils.isEmpty(coursewaresId)|| StringUtils.isEmpty(teaId)|| "null".toLowerCase().equals(coursewaresId) || "null".toLowerCase().equals(teaId) ){
                throw new Exception("课件或老师信息为空！");
            }
            OSSClient ossClient = ossUploadService.getOssClient();
            try {
                fileList = ossUploadService.listObjects(ossClient, null, null,teaId+"/"+coursewaresId+"/");
            } catch (Exception e) {
                e.printStackTrace();
                ajaxResult.addError("查询出错：" + e.getMessage());
            } finally {
                ossUploadService.shutdownOssClient(ossClient);
            }
            ajaxResult.success("查询成功", fileList);
        } catch (Exception e) {
            ajaxResult.addError("查询出错：" + e.getMessage());
            e.printStackTrace();
        }
        logger.debug("<<<out OssUploadController.fileList");
        return JSONUtil.ToFormatJson(ajaxResult);
    }

    /**
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("deleteFile")
    public String deleteFile(HttpServletRequest request, HttpServletResponse response) {
        logger.debug(">>>in OssUploadController.deleteFile");
        String teaId = request.getParameter("teaId");
        String coursewaresId = request.getParameter("coursewaresId");
        try {
            if(StringUtils.isEmpty(coursewaresId)|| StringUtils.isEmpty(teaId)|| "null".toLowerCase().equals(coursewaresId) || "null".toLowerCase().equals(teaId) ){
                throw new Exception("课件或老师信息为空！");
            }

            OSSClient ossClient = ossUploadService.getOssClient();
            try {
                String fileNames = new String(request.getParameter("fileName").getBytes("ISO-8859-1"), "UTF-8");

                if (!StringUtils.isEmpty(fileNames)) {
                    String[] fileNameArr = fileNames.split(",");
                    for (String fileName : fileNameArr) {
                        ossUploadService.deleteObject(ossClient, null,teaId+"/"+coursewaresId+"/"+ fileName, null);
                    }
                }
                ObjectListing objectListing = ossClient.listObjects(ossUploadService.getSelectBucketName(ossClient, null, null));
                List<OSSObjectSummary> objectSummary = objectListing.getObjectSummaries();
                System.out.println("您有以下Object：");
                for (OSSObjectSummary object : objectSummary) {
                    System.out.println("名称：" + object.getKey());
                }
            } catch (Exception e) {
                e.printStackTrace();
                ajaxResult.addError("删除出错：" + e.getMessage());

            } finally {
                ossUploadService.shutdownOssClient(ossClient);
            }
            ajaxResult.success("删除成功");
        } catch (Exception e) {
            ajaxResult.addError("删除出错：" + e.getMessage());
            e.printStackTrace();
        }
        logger.debug("<<<out OssUploadController.deleteFile");
        return JSONUtil.ToFormatJson(ajaxResult);
    }

    /**
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("getFile")
    public String getFile(HttpServletRequest request, HttpServletResponse response) {
        logger.debug(">>>in OssUploadController.getFile");
        String teaId = request.getParameter("teaId");
        String coursewaresId = request.getParameter("coursewaresId");
        Map<String, Map<String, String>> ossObject = null;
        try {
            if(StringUtils.isEmpty(coursewaresId)|| StringUtils.isEmpty(teaId)|| "null".toLowerCase().equals(coursewaresId) || "null".toLowerCase().equals(teaId) ){
                throw new Exception("课件或老师信息为空！");
            }
            String fileName = new String(request.getParameter("fileName").getBytes("ISO-8859-1"), "UTF-8");
            OSSClient ossClient = ossUploadService.getOssClient();
            try {
                ossObject = ossUploadService.getObject(ossClient, null, teaId+"/"+coursewaresId+"/"+fileName, null);
                ajaxResult.success("查询成功", ossObject);
            } catch (Exception e) {
                e.printStackTrace();
                ajaxResult.addError("查询出错：" + e.getMessage());
            } finally {
                ossUploadService.shutdownOssClient(ossClient);
            }

        } catch (Exception e) {
            ajaxResult.addError("查询出错：" + e.getMessage());
            e.printStackTrace();
        }
        logger.debug("<<<out OssUploadController.getFile");
        return JSONUtil.ToFormatJson(ajaxResult);
    }
}