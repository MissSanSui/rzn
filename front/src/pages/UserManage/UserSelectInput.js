
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
    Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal,
    message, Badge, Divider, Steps, Radio, Table,
} from 'antd';
import UserSelect from './UserSelect'
@connect()
export default class SelectInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            userModalVisible:false
        };
    }

    onSelect = (user) => {
        this.setState({
            empName: user.emp_name,
        })
        const onChange = this.props.onChange;
        if (onChange) {
            onChange( user.user_id );
        }
        this.onCancel()
    }
    showModal = () => {
        this.setState({
            userModalVisible: true
        })
    }
    onCancel = () => {
        this.setState({
            userModalVisible: false
        })
    }
    render() {
        const { size, role,
            loading, } = this.props;
        const { empName, userModalVisible, placeholder } = this.state;
        const {

        } = this.props;
        var title = "选择用户"
        if (role == "STU") {
            title = "选择学生"
        }
        return (
            <span>
                <Input
                    type="text"
                    size={size}
                    value={empName}
                    onClick={this.showModal}
                    placeholder={placeholder}
                    style={{ width: '65%', marginRight: '3%' }}
                />
                <Modal
                    destroyOnClose
                    title={title}
                    visible={userModalVisible}
                    onCancel={this.onCancel}
                    width="60%"
                >
                    <UserSelect role={this.props.role} onSelect={this.onSelect}  />
                </Modal >
            </span>
        );
    }
}