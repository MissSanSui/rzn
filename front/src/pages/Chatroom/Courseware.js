import React, { PureComponent } from "react";
import "./Joinroom.less";
import { connect } from "dva";
import { Col, Button, Modal, Checkbox, Card, List, Avatar, Popover, message, Select } from "antd";
import CourseWareSelect from "./../CourseWareManage/CourseWareSelect"

const Option = Select.Option;

@connect(({ room, user }) => ({
    room,
    currentUser: user.currentUser
}))
class Courseware extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            roomId: 1,
            bigImg: null,
            modal: {
                title: "请选择您要上传的课件",
                width: '60%',
            },
            user_ids: [],
        }
    }
    componentDidMount() {
        console.log("componentDidMount==")
        console.log("componentDidMount== this.props.currentUser.role", this.props.currentUser)
        const { dispatch, roomId, currentUser } = this.props;
        if (currentUser.role == "TEA") {
            // dispatch({
            //     type: 'room/deleteCourseWareAndUser',
            //     payload: { roomId: roomId },
            //     success: (data) => {
            //         console.log("componentDidMount data===", data)
            //     }
            // });
            dispatch({
                type: 'room/fetchContracts',
                payload: {
                    contract_room_id: roomId
                }
            })
        }
        dispatch({
            type: 'room/fetchImages',
            payload: {
                room_id: roomId
            }
        })


    }
    onSelect = (courseWare) => {
        const { roomId, dispatch } = this.props
        var data = {}
        data.room_id = roomId;
        data.coursewares_no = courseWare.coursewares_no
        console.log("onSelect   data===", data)
        dispatch({
            type: 'room/saveCourseWare',
            payload: data,
            // success: () => {
            //     message.success('添加成功!');
            //     // this.handleCancel()
            // },
            // fail: (res) => {
            //     console.log("fail====", res)
            //     message.error('添加失败！');
            // },
        });
    }
    onRemove = (courseWare) => {
        console.log("onRemove courseWare== ", courseWare)
        const { roomId, dispatch } = this.props
        var data = {}
        data.room_id = roomId;
        data.coursewares_no = courseWare.coursewares_no
        console.log("onRemove   data===", data)
        dispatch({
            type: 'room/removeCourseWare',
            payload: data,
            // success: () => {
            //     message.success('删除成功！');
            //     // this.handleCancel()
            // },
            // fail: (res) => {
            //     console.log("fail====", res)
            //     message.error('删除失败！');
            // },
        });
    }
    showModal = () => {
        this.setState({
            visible1: true,
            bigImg: null,
            modal: {
                title: "请选择您要上传的课件",
                width: '60%',
            }
        });
    };
    handleOk = (e) => {
        this.setState({
            visible1: false,
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible1: false,
        });
    };
    onSelectStu = (value) => {
        console.log("onSelectStu value==", value)
        const { dispatch } = this.props
        dispatch({
            type: 'room/selectUsers',
            payload: value,
        });
    }
    render() {
        const { imageList, courseWareIds, contractList } = this.props.room
        let oldRoom = this.props.oldRoom||{}
        const children = []
        contractList.forEach(contract => {
            children.push(<Option key={contract.contract_stu}>{contract.emp_name_fus}</Option>);
        });
        return (
            <div>
                <Col span={19} className="cardStyle">
                    <div className="Courseware-upload" style={{ display: (this.props.currentUser.role == "TEA" ? 'block' : 'none') }} >
                        <Select
                            // mode="multiple"
                            disabled={oldRoom.room_start=="Y"}
                            style={{ width: '100%' }}
                            placeholder="请选择学生"
                            defaultValue={oldRoom.user_ids}
                            onChange={this.onSelectStu}
                        >
                            {children}
                        </Select>
                        <Button type="primary" block icon="picture" style={{ marginTop: "10px" }}
                            onClick={this.showModal.bind(this)}>上传课件</Button>
                    </div>
                    <List
                        grid={{ column: 1 }}
                        className="Courseware-list"
                        dataSource={imageList}
                        renderItem={item => (
                            <List.Item>
                                <Popover placement="rightTop" title=''
                                    content={(<img src={item.coursewares_images} alt="" />)} trigger="click">
                                    <img src={item.coursewares_images} alt="" />
                                </Popover>
                            </List.Item>
                        )}
                    />
                </Col>
                <Modal
                    title={this.state.modal.title}
                    width={this.state.modal.width}
                    visible={this.state.visible1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.bigImg == null ?
                        <CourseWareSelect onSelect={(courseWare) => this.onSelect(courseWare)}
                            onRemove={(courseWare) => this.onRemove(courseWare)}
                            selectKeys={courseWareIds} />
                        : <img alt="" src={this.state.bigImg} />}
                </Modal>
            </div>
        )
    }
}
export default Courseware;




