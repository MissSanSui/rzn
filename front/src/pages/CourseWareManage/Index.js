import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal,
  message, Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UserSelectInput from '@/pages/UserManage/UserSelectInput';

import Detail from './Detail';
import styles from './Index.less';

const FormItem = Form.Item;
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
class CourseWare extends PureComponent {
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
    // e.preventDefault();
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
  onAddCourseWare = () => {
    router.push('/courseWare-manage/add');
  }
  handleModalVisible = (flag, courseWare) => {
    this.setState({
      modalVisible: !!flag,
      modifyCourseWare: courseWare
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
            <FormItem label="教师">
              {getFieldDecorator('coursewares_tea', {
              })(<UserSelectInput role="TEA" placeholder="请选择教师" />)}
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
      title: '课件图片',
      dataIndex: 'coursewares_images',
      render: (text, obj) => {
        let src = ""
        if (obj && obj.coursewares_images) {
          src = coursewares_images
        }
        return (
          <img src={src} />
        )
      }
    },

    {
      title: '课件内容',
      dataIndex: 'coursewares_content',
    },
    {
      title: '教师',
      dataIndex: 'emp_name_fut',
    }
  ];
  render() {
    const {
      courseWare: { data },
      loading,
    } = this.props;
    // 数据来源
    const { modalVisible, pagination, modifyCourseWare } = this.state;
    return (
      <PageHeaderWrapper title="查询课件">
        <Card bordered={false}>
          {/* <div className={styles.tableListForm}>{this.renderSimpleForm()}</div> */}
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={this.onAddCourseWare}>
              新建
              </Button>
          </div>
        </Card>
        <Card bordered={false} className={styles.tableList}>
          <Table
            loading={loading}
            dataSource={data.list}
            // key={item.id}
            rowKey={record => record.coursewares_no}
            columns={this.columns}
            pagination={data.pagination}
            onChange={this.handleStandardTableChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.handleModalVisible(true, record)
                },
              };
            }}
          />
        </Card>
        <Detail modalVisible={modalVisible} onCancel={() => this.handleModalVisible(false)}
          modifyCourseWare={modifyCourseWare}
          onSearch={this.handleSearch} />
      </PageHeaderWrapper>
    );
  }
}

export default CourseWare;
