import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row, Col, Card, Form, Input,Select,Icon, Button,Dropdown,Menu,InputNumber,DatePicker,Modal,
  message,Badge,Divider,Steps,Radio,Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Detail from '@/pages/ContractManage/Detail';
import styles from './Index.less';

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
@connect(({ courseWare, loading }) => ({
  courseWare,
  loading: loading.models.courseWare,
}))
@Form.create()
class UserManage extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    modalType: "add",
    pagination: {
      current: 1,
      pageSize: 2
    }
  };
  componentDidMount() {
    console.log("componentDidMount==")
    const { dispatch } = this.props;
    dispatch({
      type: 'courseWare/fetch',
      payload: {}
    })
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log("pagination====", pagination);
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // 分页查询
    console.log(params);
    dispatch({
      type: 'courseWare/fetch',
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
      // this.setState({
      //   formValues: values,
      // });
      // 分页查询
      dispatch({
        type: 'courseWare/fetch',
        payload: values,
      });
    });
  };

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
              {getFieldDecorator('user_name')(<Input placeholder="请输入用户名" />)}
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
      title: '课件ID',
      dataIndex: 'coursewares_no',
    },
    {
      title: '课件内容',
      dataIndex: 'coursewares_content',
    },
    {
      title: '登录名',
      dataIndex: 'user_name',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
  ];
  render() {
    const {
      courseWare: { data },
      loading,
    } = this.props;
    // 数据来源
    const { modalVisible, modalType, modifyUser, pagination } = this.state;
    return (
      <PageHeaderWrapper title="查询课件">
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
            pagination={data.pagination}
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
        <Detail modalVisible={modalVisible} onCancel={() => this.handleModalVisible(false)}
          type={modalType} modifyUser={modifyUser} onSearch={this.handleSearch} />
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
