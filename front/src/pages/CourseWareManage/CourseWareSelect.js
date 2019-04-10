import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal,
  message, Table,
} from 'antd';
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
  selectCourseWare = (record) => {
    this.props.onSelect(record)
  }
  handleSearch = e => {
    console.log("handleSearch===")
    // e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const params = {
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

  columns = [
    {

    },
    {
      title: '课件ID',
      dataIndex: 'coursewares_no',
    },
    // {
    //   title: '课件图片',
    //   dataIndex: 'coursewares_images',
    //   render: (text, obj) => {
    //     let src = ""
    //     if (obj && obj.coursewares_images) {
    //       src = coursewares_images
    //     }
    //     return (
    //       <img src={src} />
    //     )
    //   }
    // },
    {
      title: '课件内容',
      dataIndex: 'coursewares_content',
    },
    {
      title: '教师',
      dataIndex: 'emp_name_fut',
    },
    {
      title: '创建时间',
      dataIndex: 'created_date',
    }
  ];
  render() {
    const {
      courseWare: { data },
      loading,
      selectType,
      selectKeys,
    } = this.props;
    // 数据来源
    console.log("selectKeys===", selectKeys)
    const { modalVisible, pagination, modifyCourseWare } = this.state;
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys: selectKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("selectedRowKeys===", selectedRowKeys)
      },
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        if (selected) {
          this.props.onSelect(record)
        }else{
          this.props.onRemove(record)
        }
      }
    }
    return (
      <Card bordered={false} className={styles.tableList}>
        <Table
          loading={loading}
          dataSource={data.list}
          // key={item.id}
          rowKey={record => record.coursewares_no}
          columns={this.columns}
          pagination={data.pagination}
          onChange={this.handleStandardTableChange}
          rowSelection={selectType == "one" ? null : rowSelection}
          onRow={(record) => {
            if (selectType == "one") {
              return {
                onClick: () => {
                  this.selectCourseWare(record)
                },
              };
            } else {
              return null
            }
          }}
        />
      </Card>
    );
  }
}

export default CourseWare;
