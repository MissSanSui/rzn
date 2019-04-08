import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Detail.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber,
  Row, Col, Upload, Icon, Modal, message, Switch
} from 'antd';

import formsStyles from '../Forms/style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects[''],
}))
@Form.create()

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    console.log("props====", props)
    this.state = {
      fileList: []
    }
  }
  handleUpdate = fields => {
    const { dispatch, modifyCourseWare } = this.props;
    fields.user_id = modifyUser.user_id
    fields.user_status = fields.status ? "open" : "close"
    dispatch({
      type: 'courseWare/update',
      payload: {
        params: fields
      },
      success: () => {
        message.success('修改成功！');
        console.log("this.props===", this.props)
        this.props.onCancel();
        this.props.onSearch()
      },
      fail: (res) => {
        console.log("fail====", res)
        message.error('修改失败！');
      },
    });
  };
  handleChange = ({ file, fileList, event }) => {
    console.log("handleChange file==", file)
    console.log("handleChange fileList==", fileList)
    console.log("handleChange event==", event)
    for (let i in fileList) {
      fileList[i].url = fileList[i].thumbUrl
    }
    this.setState({ fileList })
  }

  okHandle = () => {
    const { form, type } = this.props
    form.validateFields((err, fieldsValue) => {
      console.log("fieldsValue===", fieldsValue)
      if (err) return;
      if (fieldsValue.citys && fieldsValue.citys.length == 3) {
        fieldsValue.province = fieldsValue.citys[0]
        fieldsValue.city = fieldsValue.citys[1]
        fieldsValue.county = fieldsValue.citys[2]
      }
      this.handleUpdate(fieldsValue);
    });
  };
  render() {
    const { submitting, modalVisible, onCancel, } = this.props;
    let modifyCourseWare = this.props.modifyCourseWare || {}
    console.log("modifyCourseWare===", modifyCourseWare)
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { previewVisible, previewImage, fileList, current } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const formItemLayoutOne = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        destroyOnClose
        title="课件详情"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.props.onCancel}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark={false} style={{ marginTop: 8 }}>
          {/* 姓名 */}
          <FormItem {...formItemLayout} label="课件描述">
            {getFieldDecorator('coursewares_content ', {
              initialValue: modifyCourseWare.coursewares_content,
              rules: [
                {
                  required: true,
                  message: "请输入课件描述",
                },
              ],
            })(<Input placeholder="课件描述" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="课件描述">
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
          </FormItem>
        </Form>
      </Modal >
    )
  }
}

export default Detail;