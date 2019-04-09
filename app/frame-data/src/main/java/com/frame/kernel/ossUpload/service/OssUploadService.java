package com.frame.kernel.ossUpload.service;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.*;
import com.frame.kernel.util.SystemProperties;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by   on 2019-4-2.
 */
@Service
public class OssUploadService {

    private static String endpoint = SystemProperties.get("oss.endpoint");


    // accessKeyId和accessKeySecret是OSS的访问密钥，您可以在控制台上创建和查看，
    // 创建和查看访问密钥的链接地址是：https://ak-console.aliyun.com/#/。
    // 注意：accessKeyId和accessKeySecret前后都没有空格，从控制台复制时请检查并去除多余的空格。
    private static String accessKeyId =  SystemProperties.get("oss.accessKeyId") ;
    private static String accessKeySecret =  SystemProperties.get("oss.accessKeySecret");

    // Bucket用来管理所存储Object的存储空间，详细描述请参看“开发人员指南 > 基本概念 > OSS基本概念介绍”。
    // Bucket命名规范如下：只能包括小写字母，数字和短横线（-），必须以小写字母或者数字开头，长度必须在3-63字节之间。
    private static String bucketName =  SystemProperties.get("oss.bucketName");

    // Object是OSS存储数据的基本单元，称为OSS的对象，也被称为OSS的文件。详细描述请参看“开发人员指南 > 基本概念 > OSS基本概念介绍”。
    // Object命名规范如下：使用UTF-8编码，长度必须在1-1023字节之间，不能以“/”或者“\”字符开头。
//    private static String firstKey = "my-first-key";




    public OSSClient getOssClient()  {
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);

        return ossClient;
    }

    public void shutdownOssClient(OSSClient ossClient) {
        ossClient.shutdown();
    }


    public  String  getSelectBucketName (OSSClient ossClient,String selfBucketName,String createFlag) throws Exception {
        String bucketNameNow = StringUtils.isEmpty(selfBucketName) ? bucketName : selfBucketName;
        if(null==ossClient){
            ossClient = getOssClient();
        }

         /*
            判断Bucket是否存在。不存在则新建
             */
        if (!ossClient.doesBucketExist(bucketNameNow)) {
            if("Y".equals(createFlag)){
                ossClient.createBucket(bucketNameNow);
            }else{
                throw new Exception("无效的存储空间名称！");
            }
        }
        return bucketNameNow;
    }

    /**
     * 判断对象是否存在
     *
     * @param objectName     对象名
     * @param selfBucketName 存储空间名儿。如果不知道则为新建
     * @param createBucktFlag 若存储空间不存在是否新建 若不新建则会报错
     * @return
     */
    public boolean doesObjectExist(OSSClient ossClient ,String objectName, String selfBucketName,String createBucktFlag) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient,selfBucketName,createBucktFlag);

        boolean found = ossClient.doesObjectExist(bucketNameNow, objectName  );

        return found;
    }


    /**
     * 查询bucket信息
     *
     * @param selfBucketName 自己指定存储空间名称
     * @param createBucktFlag 若存储空间不存在是否新建 若不新建则会报错
     * @return
     */
    public BucketInfo getBucketInfo(OSSClient ossClient ,String selfBucketName,String createBucktFlag) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        BucketInfo info = ossClient.getBucketInfo(bucketNameNow);
        return info;
    }

    public void putObject(OSSClient ossClient ,String selfBucketName, File file, String fileKey,String createBucktFlag) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        ossClient.putObject(bucketNameNow, fileKey, file);
    }
    public void putObject(OSSClient ossClient ,String selfBucketName, File file, String fileKey,String createBucktFlag, ObjectMetadata metadata) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        ossClient.putObject(bucketNameNow, fileKey, file,metadata);
    }

    public  Map<String,Map<String,String>> getObject(OSSClient ossClient ,String selfBucketName, String fileKey,String createBucktFlag) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        Map<String,Map<String,String>>  returnList = new HashMap<>();
        ObjectMetadata metadata = ossClient.getObjectMetadata(bucketNameNow, fileKey);
        Map<String,String> userParams = new HashMap<>();
        userParams = metadata.getUserMetadata();
        returnList.put(fileKey,userParams);
        return returnList;
    }


    public void deleteObject(OSSClient ossClient ,String selfBucketName, String fileKey,String createBucktFlag) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        ossClient.deleteObject(bucketNameNow, fileKey);

    }

    public Map<String,Map<String,String>> listObjects(OSSClient ossClient ,String selfBucketName,String createBucktFlag,String keyPrefix) throws Exception {
        if(null==ossClient){
            ossClient = getOssClient();
        }
        String bucketNameNow = getSelectBucketName(ossClient ,selfBucketName,createBucktFlag);
        Map<String,Map<String,String>>  returnList = new HashMap<>();
        ObjectListing objectListing = ossClient.listObjects(bucketNameNow,keyPrefix);

        List<OSSObjectSummary> objectSummary = objectListing.getObjectSummaries();

        for (OSSObjectSummary object : objectSummary) {
            ObjectMetadata metadata = ossClient.getObjectMetadata(bucketNameNow, object.getKey());
            Map<String,String> userParams = new HashMap<>();
            userParams = metadata.getUserMetadata();
            returnList.put(object.getKey(),userParams);
        }
        return returnList;
    }


}
