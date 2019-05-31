import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal,
  message, Badge, Divider, Steps, Radio, Table, Switch
} from 'antd';
import Link from 'umi/link';
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
    modalType: "add",
    current:1
  };
  componentDidMount() {
    console.log("componentDidMount==")
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetch',
      payload: {}
    })
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log("pagination====", pagination);
    const { dispatch } = this.props;
    const { formValues } = this.state;
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return;
    //   const values = {
    //     ...fieldsValue,

    //   };
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    this.setState({
      current:pagination.current
    })
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // 分页查询
    console.log(params);
    dispatch({
      type: 'userManage/fetch',
      payload: params,
    });
  };

  handleSearch = e => {
    console.log("handleSearch===")
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,

      };
      this.setState({
        formValues: values,
        current:1
      });
      // 分页查询
      dispatch({
        type: 'userManage/fetch',
        payload: values,
      });
    });
  };
  userStatusChange = (id, checked, e) => {
    e.stopPropagation()
    console.log("userStatusChange")
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/changeStatus',
      payload: {
        ids: id,
        status: checked
      },
      success: () => {
        message.success("成功")
        this.handleSearch()
      }
    });
  }
  handleModalVisible = (flag, modalType, user) => {
    console.log("handleModalVisible   modalType===", modalType)
    console.log("handleModalVisible   user===", user)
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
              {getFieldDecorator('emp_name')(<Input placeholder="请输入用户名" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('role')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="STU">学生</Option>
                  <Option value="TEA">教师</Option>
                  <Option value="PAR">家长</Option>
                  <Option value="ASS">助教</Option>
                  <Option value="SYS">管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              {/* <Button type="primary" onClick={this.handleSearch}> */}
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
      title: '用户ID',
      dataIndex: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'emp_name',
    },
    {
      title: '登录名',
      dataIndex: 'user_name',
    },
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    // },
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
            roleName = "管理员"
            break;
          default:
            break;
        }
        return roleName
      }
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
    },
    {
      title: '启用与否',
      dataIndex: 'user_status',
      render: (text, user) => {
        return (
          <Switch checked={text == "open"} loading={this.state[user.user_id + "_loading"]} onChange={(checked, e) => this.userStatusChange(user.user_id, checked, e)} />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'Action',
      render: (text, user) => {
        return (
          <Link to={`/user/reset-password?user_id=${user.user_id}`}>重置密码</Link>
        )
      }
    },
  ];
  render() {
    // console.log("this.props===", this.props) 
    const {
      userManage: { data },
      loading,
    } = this.props;
    console.log("data.pagination==", data.pagination)
    // 数据来源
    const { modalVisible, modalType, modifyUser, pagination } = this.state;
    return (
      <PageHeaderWrapper title="查询用户">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'add')}>
              新建
              </Button>
          </div>
        </Card>
        <Card bordered={false} className={styles.tableList}>
          <Table
            loading={loading}
            dataSource={data.list}
            // key={item.id}
            rowKey={user => user.user_id}
            columns={this.columns}
            pagination={{
              current: this.state.current,
              total: data.pagination.total,
              pageSize:data.pagination.pageSize
            }}
            onChange={this.handleStandardTableChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.handleModalVisible(true, 'modify', record)
                },
              };
            }}
          />
        </Card>
        <AddUser modalVisible={modalVisible} onCancel={() => this.handleModalVisible(false)}
          type={modalType} modifyUser={modifyUser} onSearch={this.handleSearch} />
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
