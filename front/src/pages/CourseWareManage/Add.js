import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber,
    Icon, Tooltip, Modal, Upload, Row, Col
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';
import router from 'umi/router';


const FormItem = Form.Item;

@connect(({ }) => ({
}))
@Form.create()
class BasicForms extends PureComponent {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    }
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("values===", values)
                dispatch({
                    type: 'courseWare/add',
                    payload: values,
                });
            }
        });
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
        console.log("handleChange fileList==", fileList)
        console.log("handleChange event==", event)
        for (let i in fileList) {
            fileList[i].url = fileList[i].thumbUrl
        }
        this.setState({ fileList })

    }
    beforeUpload = (file, fileList, event) => {
        console.log("beforeUpload file==", file)
        console.log("beforeUpload fileList==", fileList)
        console.log("beforeUpload event==", event)

    }
    onFileRemove = (file) => {
        console.log("onFileRemove file==", file)
    }
    render() {
        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <PageHeaderWrapper
                title="添加课时"
            >
                <Card bordered={false}>
                    <Row>
                        <Col>课件内容</Col>
                        <Col>
                            <Input onChange={this.changeContent} />
                        </Col>
                    </Row>
                    <div className="clearfix">
                        <Upload
                            action="/frame-web/uploadApi/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload={this.beforeUpload}
                            onRemove={this.onFileRemove}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Card>

            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
