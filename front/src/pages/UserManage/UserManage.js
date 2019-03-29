import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddUser from '@/pages/UserManage/Adduser';
import styles from './UserManage.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ userManage, loading }) => ({
  userManage,
  loading: loading.models.userManage,
}))
@Form.create()
class UserManage extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    modalType: "add"
  };



  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log(pagination);
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    // 分页查询
    console.log(params);
    dispatch({
      type: 'user/fetch',
      payload: params,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      // 分页查询
      dispatch({
        type: 'userManage/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, modalType, user) => {
    console.log("handleModalVisible   user===",user)
    this.setState({
      modalVisible: !!flag,
      modalType,
      modifyUser: user
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('name')(<Input placeholder="请输入用户名" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('roles')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="STU">学生</Option>
                  <Option value="TEA">教师</Option>
                  <Option value="PAR">家长</Option>
                  <Option value="SYS">负责人</Option>
                  <Option value="LEA">管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="关注点">
              {getFieldDecorator('focus')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="STU">学生</Option>
                  <Option value="TEA">教师</Option>
                  <Option value="PAR">家长</Option>
                  <Option value="SYS">负责人</Option>
                  <Option value="LEA">管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'account',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text) => {
        let roleName = ""
        switch (text) {
          case "STU":
            roleName = "学生"
            break;
            case "TEA":
            roleName = "教师"
            break;
            case "ASS":
            roleName = "助教"
            break;
            case "PAR":
            roleName = "家长"
            break;
            case "PRE":
            roleName = "准学生"
            break;
            case "SYS":
            roleName = "超级管理员"
            break;
          default:
            break;
        }
        return roleName
      }
    },
    {
      title: '联系电话',
      dataIndex: 'telephone',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, 'modify', record)}>更新</a>
        </Fragment>
      ),
    },
  ];
  render() {
    const {
      userManage: { data },
      loading,
    } = this.props;
    // 数据来源
    const { modalVisible, modalType, modifyUser, } = this.state;

    return (
      <PageHeaderWrapper title="查询用户">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'add')}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data.list}
              // key={item.id}
              rowKey={user => user.id}
              columns={this.columns}
              // onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <AddUser modalVisible={modalVisible} onCancel={() => this.handleModalVisible(false)} 
        type={modalType} modifyUser={modifyUser} />
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
