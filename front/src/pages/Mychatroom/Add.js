import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio,
    Icon, Tooltip, Modal, message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UserSelectInput from '@/pages/UserManage/UserSelectInput';
import styles from './Index.less';
import router from 'umi/router';


const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ }) => ({
}))
@Form.create()
class BasicForms extends PureComponent {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("values===", values)
                dispatch({
                    type: 'mychatroom/add',
                    payload: values,
                    success: () => {
                        form.resetFields();
                        message.success("添加成功！")
                    },
                    fail: () => {
                        message.warn("添加失败！")
                    }
                });
            }
        });
    };
    onToList = () => {
        router.push('/my-chat-room/search');
    }
    render() {
        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;
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
                title="添加直播间"
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="老师">
                            {getFieldDecorator('room_owner', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择老师",
                                    },
                                ],
                            })(<UserSelectInput role="TEA" placeholder="选择老师" />)}
                        </FormItem>
                        {/* <FormItem {...formItemLayout} label="白名单">
                            {getFieldDecorator('white_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入白名单",
                                    },
                                ],
                            })(<Input placeholder="输入白名单" />)}
                        </FormItem> */}
                        <FormItem {...formItemLayout} label="年级">
                            {getFieldDecorator('room_grade', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择年级",
                                    },
                                ],
                            })(<Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="请选择年级"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                <Option value="PRI">小学</Option>
                                <Option value="JUN">初中</Option>
                                <Option value="SEN">高中</Option>
                              </Select>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="课程">
                            {getFieldDecorator('room_course', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择课程",
                                    },
                                ],
                            })(<Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="请选择课程"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                <Option value="MATH">数学</Option>
                                <Option value="ENG">英语</Option>
                                <Option value="LAN">语文</Option>
                                <Option value="MAN">理综</Option>
                                <Option value="COM">文综</Option>
                              </Select>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述">
                            {getFieldDecorator('room_introduce', {
                                rules: [
                                    {
                                        required: true,
                                        message: "直播间描述",
                                    },
                                ],
                            })(<Input placeholder="直播间描述" />)}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.save" />
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.onToList}>
                                查看列表
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
