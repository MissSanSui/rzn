import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal,
  message, Badge, Divider, Steps, Radio, Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UserSelectInput from '@/pages/UserManage/UserSelectInput';
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
@connect(({ contract, loading }) => ({
  contract,
  loading: loading.models.contract,
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
      type: 'contract/fetch',
      payload: {
        sortName:"contract_room_no"
      }
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
      type: 'contract/fetch',
      payload: params,
    });
  };

  handleSearch = e => {
    console.log("handleSearch===")
    // e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.sortName = "contract_room_no"
      console.log("fieldsValue==", fieldsValue)
     
      // this.setState({
      //   formValues: values,
      // });
      // 分页查询
      dispatch({
        type: 'contract/fetch',
        payload: fieldsValue,
      });
    });
  };

  handleModalVisible = (flag, modalType, user) => {
    console.log("handleModalVisible   modalType===", modalType)
    console.log("handleModalVisible   user===", user)
    this.setState({
      modalVisible: !!flag,
      modalType,
      modifyContract: user
    });
  };
  toAdd = () => {
    router.push('/contract-manage/add');
  }
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
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
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem {...formItemLayout} label="学生">
              {getFieldDecorator('contract_stu', {
              })(<UserSelectInput role="STU" placeholder="选择学生" />)}
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
      title: '课时ID',
      dataIndex: 'contract_no',
    },
    {
      title: '姓名',
      dataIndex: 'emp_name_fus',
    },
    {
      title: '直播间ID',
      dataIndex: 'contract_room_no',
    },
    {
      title: '总课时',
      dataIndex: 'contract_hour',
    },
    {
      title: '剩余课时',
      dataIndex: 'contract_rest_hour',
    },
    {
      title: '课时费用',
      dataIndex: 'contract_amount',
    },
  ];
  render() {
    const {
      contract: { data },
      loading,
    } = this.props;
    // 数据来源
    const { modalVisible, modalType, modifyContract, pagination } = this.state;
    return (
      <PageHeaderWrapper title="查询用户">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.toAdd()}>
              新建
            </Button>
          </div>
        </Card>
        <Card bordered={false} className={styles.tableList}>
          <Table
            loading={loading}
            dataSource={data.list}
            // key={item.id}
            rowKey={record => record.contract_no}
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
          type={modalType} modifyContract={modifyContract} onSearch={this.handleSearch} />
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
