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
import styles from './Index.less';
import { getUserId, getUserInfo } from '@/utils/authority';

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
@connect(({ mychatroom, user }) => ({
    data: mychatroom.data,
    currentUser: user.currentUser
}))
@Form.create()
class MyRoomList extends PureComponent {
    state = {
        modalVisible: false,
        pagination: {
            current: 1,
            pageSize: 2
        }
    };
    componentDidMount() {
        console.log("componentDidMount==")
        this.handleSearch()
        const {  currentUser } = this.props;
        let _currentUser = currentUser.role ? currentUser : getUserInfo()
        if (_currentUser.role == "STU") {
            this.timer = setInterval(() => this.handleSearch(), 5000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        console.log("pagination====", pagination);
        const { dispatch, currentUser } = this.props;
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
        switch (currentUser.role) {
            case "STU":
                fieldsValue.contract_stu = currentUser.user_id
                break;
            case "TEA":
                params.room_owner = currentUser.user_id
                break;
            default:
                break;
        }
        // 分页查询
        console.log(params);
        dispatch({
            type: 'mychatroom/fetchMyList',
            payload: params,
        });
    };
    joinRoom = (room) => {
        console.log("joinRoom  room===", room)
        router.push({ pathname: '/join-room', query: { roomId: room.room_id } })
    }
    handleSearch = e => {
        console.log("handleSearch===")
        // e.preventDefault();
        const { dispatch, form, currentUser } = this.props;
        let _currentUser = currentUser.role ? currentUser : getUserInfo()
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log("fieldsValue==", fieldsValue)
            switch (_currentUser.role) {
                case "STU":
                    fieldsValue.contract_stu = _currentUser.user_id || getUserId()
                    break;
                case "TEA":
                    fieldsValue.room_owner = _currentUser.user_id || getUserId()
                    break;
                default:
                    break;
            }
            // 分页查询
            dispatch({
                type: 'mychatroom/fetchMyList',
                payload: fieldsValue,
            });
        });
    };
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
                    {/* <Col md={6} sm={24}>
                        <FormItem {...formItemLayout} label="学生">
                            {getFieldDecorator('contract_stu', {
                            })(<UserSelectInput role="STU" placeholder="选择学生" />)}
                        </FormItem>
                    </Col> */}
                    <Col md={6} sm={24}>
                        <FormItem {...formItemLayout} label="直播间号">
                            {getFieldDecorator('contract_room_id', {
                            })(<Input placeholder="请输入直播间号" />)}
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
            title: '直播间ID',
            dataIndex: 'room_id',
        },
        {
            title: '直播间描述',
            dataIndex: 'room_introduce',
        },
        {
            title: '主播老师',
            dataIndex: 'emp_name_owner',
        },
        {
            title: '年级',
            dataIndex: 'room_grade',
            render: (text) => {
                var grade = text
                switch (text) {
                    case "PRI":
                        grade = "小学"
                        break;
                    case "JUN":
                        grade = "初中"
                        break;
                    case "SEN":
                        grade = "高中"
                        break;
                    default:
                        break;
                }
                return grade
            }
        },
        {
            title: '课程',
            dataIndex: 'room_course',
            render: (text) => {
                var course = text
                switch (text) {
                    case "MATH":
                        course = "数学"
                        break;
                    case "ENG":
                        course = "英语"
                        break;
                    case "LAN":
                        course = "语文"
                        break;
                    case "MAN":
                        course = "理综"
                        break;
                    case "COM":
                        course = "文综"
                        break;
                    default:
                        break;
                }
                return course
            }
        },
        // {
        //     title: '剩余课时',
        //     dataIndex: 'contract_rest_hour',
        // },
        {
            title: '状态',
            dataIndex: 'room_start',
            render: (text) => {
                if (text == "Y") {
                    return "开播中"
                } else {
                    return "未开播"
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'user_ids',
            align: 'center',
            render: (text, room) => {
                var role = this.props.currentUser.role
                var user_id = this.props.currentUser.user_id
                if ((room.room_start == "Y" && role == "STU" && text == user_id) || role == "TEA") {
                    return (<a onClick={() => this.joinRoom(room)}>进入直播间</a>)
                } else {
                    return ("-")
                }
            }
        },

    ];
    render() {
        // 数据来源
        const { modifyContract, data } = this.props;
        return (
            <PageHeaderWrapper title="查询直播间">
                {/* <Card bordered={false}>
                    <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                </Card> */}
                <Card bordered={false} className={styles.tableList}>
                    <Table
                        // loading={loading}
                        dataSource={data.list}
                        // key={item.id}
                        rowKey={record => record.room_id}
                        columns={this.columns}
                        pagination={data.pagination}
                        onChange={this.handleStandardTableChange}
                    // onRow={(record) => {
                    //     return {
                    //         onClick: () => {
                    //             this.handleModalVisible(true, 'modify', record)
                    //         },
                    //     };
                    // }}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default MyRoomList;
