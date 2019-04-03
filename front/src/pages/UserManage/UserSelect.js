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
import Detail from '@/pages/ContractManage/Detail';
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
export default class UserSelect extends PureComponent {
    state = {
        formValues: {},
    };
    componentDidMount() {
        console.log(" UserSelect componentDidMount==")
        const { dispatch, role } = this.props;
        dispatch({
            type: 'userManage/fetch',
            payload: {
                role
            }
        })
    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        console.log("pagination====", pagination);
        const { dispatch, role } = this.props;
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
        params.role = role
        dispatch({
            type: 'userManage/fetch',
            payload: params,
        });
    };

    handleSearch = e => {
        // e.preventDefault();
        const { dispatch, form,role } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                role:role
            };
            dispatch({
                type: 'userManage/fetch',
                payload: values,
            });
        });
    };

    renderSimpleForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={12} sm={24}>
                        <FormItem label="用户姓名">
                            {getFieldDecorator('emp_name')(<Input placeholder="请输入用户姓名" />)}
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
            dataIndex: 'mobile',
        },
    ];
    render() {
      
        console.log("this.props===",this.props)
        const {
            userManage: { data },
            loading,
        } = this.props;
        // let data=this.props.userManage?this.props.userManage.data:{list:[],pagination:{}}
        // 数据来源
        const { modalVisible, modalType, modifyUser, pagination } = this.state;
        return (
            <Card bordered={false}>
                <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                <Table
                    loading={loading}
                    dataSource={data.list}
                    rowKey={user => user.user_id}
                    columns={this.columns}
                    pagination={data.pagination}
                    onChange={this.handleStandardTableChange}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                this.props.onSelect(record)
                            },
                        };
                    }}
                />
            </Card>
        );
    }
}




