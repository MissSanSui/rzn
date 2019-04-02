import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio,
    Icon, Tooltip, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UserSelectInput from './UserSelectInput';
import styles from './Index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("values===",values)
                // dispatch({
                //     type: 'form/submitRegularForm',
                //     payload: values,
                // });
            }
        });
    };

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
                title="添加课时"
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="学生">
                            {getFieldDecorator('student', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.title.required' }),
                                    },
                                ],
                            })(<UserSelectInput role="STU" placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="直播间">
                            {getFieldDecorator('room', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.title.required' }),
                                    },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="总课时">
                            {getFieldDecorator('total', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.title.required' }),
                                    },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="剩余课时">
                            {getFieldDecorator('rest', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.title.required' }),
                                    },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="金额">
                            {getFieldDecorator('amount', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.title.required' }),
                                    },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.submit" />
                            </Button>
                            <Button style={{ marginLeft: 8 }}>
                                <FormattedMessage id="form.save" />
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
             
            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
