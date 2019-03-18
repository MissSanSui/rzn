import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Adduser.less';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        dispatch({
          type: 'usermanage/addUser',
          payload: values,
        });
      }
    });
  };

  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  constructor(props) {
    super(props);
    this.state = {
      room: null
    }
  }
  

  render() {



    const { size } = this.state;

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

    const Option = Select.Option;
    const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    function handleBlur() {
      console.log('blur');
    }

    function handleFocus() {
      console.log('focus');
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {/* 登录名 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.account" />}>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.account.required' }),
                  },
                ],
              })(<Input placeholder={'登录名只能为字母和数字'} />)}
            </FormItem>

            {/* 密码 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.passwd" />}>
              {getFieldDecorator('passwd', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.passwd.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.passwd' })} />)}
            </FormItem>

            {/* 确认密码 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.passwdSub" />}>
              {getFieldDecorator('passwdSub', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.passwdSub.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.passwdSub' })} />)}
            </FormItem>

            {/* 姓名 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.name" />}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.name.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.name' })} />)}
            </FormItem>

            {/* 角色 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.role" />}>
              {getFieldDecorator('role', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.role.required' }),
                  },
                ],
              })(<Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择角色"
                  optionFilterProp="children"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="STU">学生</Option>
                  <Option value="TEA">教师</Option>
                  <Option value="PAR">家长</Option>
                  <Option value="SYS">负责人</Option>
                  <Option value="LEA">管理员</Option>
                </Select>)}
            </FormItem>

            {/* 报名老师 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.teachers" />}>
              
                <Select
                mode="multiple"
                size={size}
                placeholder="请选择老师"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {children}
              </Select>
              
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
    )
  }
}

export default AddUser;