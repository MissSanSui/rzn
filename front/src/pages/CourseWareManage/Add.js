import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber,
    Icon, Tooltip, Modal, Upload, Row, Col, Steps, message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';
import router from 'umi/router';


const FormItem = Form.Item;
const Step = Steps.Step;
@connect(({ courseWare }) => ({
    data: courseWare.data
}))
@Form.create()
class BasicForms extends PureComponent {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        current: 1
    }
    componentDidMount() {
        console.log("componentDidMount ==")
        const { dispatch } = this.props;

    }
    componentWillReceiveProps() {
        var data = this.props.data
        console.log("componentWillReceiveProps =this.props=", this.props)
        // this.setState({
        //     fileList: data.fileList || []
        // })
    }
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("   ===", values)
                dispatch({
                    type: 'courseWare/add',
                    payload: values,
                    success: (data) => {
                        dispatch({
                            type: 'courseWare/fetchImages',
                            payload: {
                                coursewares_no: data.coursewaresId
                            },
                            success: (fileList) => {
                                console.log("fetchImages  fileList==", fileList)
                                this.setState({ fileList: fileList })
                            }
                        })
                        this.setState({
                            current: 2,
                            coursewaresId: data.coursewaresId,
                            teaId: data.teaId
                        })
                    },
                    fail: () => {
                        message.warn("fail")
                    }
                });
            }
        });
        this.setState({
            current: 2
        })
    };
    onToList = () => {
        router.push('/courseWare-manage/search');
    }

    changeContent = (value) => {
        this.setState({
            content: value
        })
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ file, fileList, event }) => {
        console.log("handleChange file==", file)
        if (file.response && file.response.code == 0&&file.status=="done") {
            // Component will show file.url as link
            file.url = file.response.data[file.name]["fileAdress"]
            const { dispatch } = this.props;
            var data = {}
            data.coursewares_images = file.url
            data.coursewares_no = this.state.coursewaresId
            dispatch({
                type: 'courseWare/saveImage',
                payload: data,
                success: (data) => {
                    message.success("上传成功！")
                    dispatch({
                        type: 'courseWare/fetchImages',
                        payload: {
                            coursewares_no: this.state.coursewaresId
                        },
                        success: (resList) => {
                            console.log("fetchImages  resList===", resList)
                            this.setState({ fileList: resList })
                        }
                    })
                },
                fail: () => {
                    message.warn("fail")
                }
            });
        }
        this.setState({ fileList })
    }
    onFileRemove = (file) => {
        const { dispatch, modifyCourseWare } = this.props;
        var data = {}
        data.id = file.id
        dispatch({
            type: 'courseWare/deleteImage',
            payload: data,
            success: (data) => {
                message.success("删除成功！")
                dispatch({
                    type: 'courseWare/fetchImages',
                    payload: {
                        coursewares_no: modifyCourseWare.coursewares_no
                    },
                    success: (fileList) => {
                        // this.setState({ fileList })
                    }
                })
            },
            fail: () => {
                message.warn("fail")
            }
        });
    }
    beforeUpload = (file) => {
        let { fileList } = this.state
        console.log("beforeUpload file==", file)
        let flag = true
        fileList.forEach(
            (item) => {
                if (item.name == file.name) {
                    flag = false
                    return
                }
            }
        )
        if (!flag) {
            message.warn("文件名重复！")
            return false
        }
    }

    render() {
        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;
        const { previewVisible, previewImage, fileList, current, coursewaresId, teaId } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        return (
            <PageHeaderWrapper
                title="添加课时"
            >
                <Card bordered={false}>
                    <Steps current={current}>
                        <Step key={1} title="输入课件描述" />
                        <Step key={2} title="上传课件图片" />
                    </Steps>
                    <div className="steps-content">
                        {
                            current == 1
                            &&
                            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                                <FormItem {...formItemLayout} label="课件描述">
                                    {getFieldDecorator('coursewares_content ', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入课件描述",
                                            },
                                        ],
                                    })(<Input placeholder="课件描述" />)}
                                </FormItem>
                                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                                    {/* <Button type="primary" htmlType="submit" loading={submitting}>
                                        <FormattedMessage id="form.save" />
                                    </Button> */}
                                    <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit">
                                        保存并添加图片
                                     </Button>
                                </FormItem>
                            </Form>
                        }
                        {
                            current == 2
                            &&
                            <div className="clearfix">
                                <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                                    <FormItem {...formItemLayout} label="课件描述">
                                        <Upload
                                            action={"/frame-web/uploadApi/upload?coursewaresId="
                                                + coursewaresId + "&teaId=" + teaId}
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                            beforeUpload={this.beforeUpload}
                                            onRemove={this.onFileRemove}
                                        >
                                            {/* {fileList.length >= 5 ? null : uploadButton} */}
                                            {uploadButton}
                                        </Upload>
                                    </FormItem>
                                </Form>
                                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                                    <Button style={{ marginLeft: 8 }} onClick={this.onToList}>
                                        完成并查看列表
                                    </Button>
                                </FormItem>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        }
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
