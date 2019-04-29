import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Detail.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber,
  Row, Col, Radio, Icon, Modal, Tooltip, message, Switch
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

class AddUser extends PureComponent {
  state = { size: 'default', };
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleUpdate = fields => {
    const { dispatch, modifyContract } = this.props;
    let params = modifyContract
    params.contract_rest_hour = fields.contract_rest_hour
    params.contract_amount = fields.contract_amount
    params.created_date = ""
    params.last_updated_date = ""

    //     created_by: 10001
    // created_date: "20190411 16:33:33"
    // emp_name_fus: null
    // last_updated_by: 10001
    // last_updated_date: "20190411 16:37:35"
    dispatch({
      type: 'contract/update',
      payload: {
        params: params
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

  okHandle = () => {
    const { form, type } = this.props
    form.validateFields((err, fieldsValue) => {
      console.log("fieldsValue===", fieldsValue)
      if (err) return;
      this.handleUpdate(fieldsValue);
    });
  };

  onDelete = () => {
    let { dispatch, modifyContract } = this.props;
    dispatch({
      type: 'contract/delete',
      payload: {
        contract_no: modifyContract.contract_no
      },
      success: () => {
        message.success('删除成功！');
        console.log("this.props===", this.props)
        this.props.onCancel();
        this.props.onSearch()
      },
      fail: (res) => {
        console.log("fail====", res)
        message.error('删除失败！');
      },
    });
  }
  resetHourValidate = (rule, value, callback) => {
    let modifyContract = this.props.modifyContract || {}
    if (Number(value) > modifyContract.contract_hour) {
      callback("剩余时间大于总时间")
    }
    callback()
  }
  render() {
    const { size } = this.state;
    const { submitting, modalVisible, onCancel, type } = this.props;
    let modifyContract = this.props.modifyContract || {}
    console.log("modifyContract===", modifyContract)
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Modal
        destroyOnClose
        title="课时详情"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={this.props.onCancel}
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark={false} style={{ marginTop: 8 }}>
          {/* 姓名 */}
          <Row >
            <Col span={12}>
              <FormItem {...formItemLayout} label="学生">
                {getFieldDecorator('emp_name_fus', {
                  initialValue: modifyContract.emp_name_fus,
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="直播间">
                {getFieldDecorator('emp_name_fus', {
                  initialValue: modifyContract.contract_room_id,
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="总课时">
                {getFieldDecorator('contract_hour', {
                  initialValue: modifyContract.contract_hour,
                  rules: [
                    {
                        required: true,
                        message: "请输入总课时",
                    },
                    {
                        type: "number",
                        transform(value) {
                            if (value) {
                                return Number(value);
                            }
                        },
                        message: "请输入正确的格式"
                    }
                ],
            })(<Input placeholder="请输入总课时" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="剩余课时">
                {getFieldDecorator('contract_rest_hour', {
                  initialValue: modifyContract.contract_rest_hour,
                  rules: [
                    {
                      required: false,
                      message: "请输入剩余课时",
                    },
                    {
                      type: "number",
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      },
                      message: "请输入正确的格式"
                    },
                    {
                      validator: this.resetHourValidate
                    }
                  ],
                })(<InputNumber min={0} max={1000} step={1} style={{ width: "100%" }} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="课时金额">
                {getFieldDecorator('contract_amount', {
                  initialValue: (modifyContract.contract_amount),
                  rules: [
                    {
                        required: true,
                        message: "请输入金额",
                    },
                    {
                        type: "number",
                        transform(value) {
                            if (value) {
                                return Number(value);
                            }
                        },
                        message: "请输入正确的格式"
                    }
                ],
            })(<Input placeholder="请输入金额" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="danger" style={{ marginLeft: 8 }} icon="delete" onClick={this.onDelete}>
                  删除课时
            </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal >
    )
  }
}

export default AddUser;