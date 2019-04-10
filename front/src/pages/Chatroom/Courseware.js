import React, { PureComponent } from "react";
import "./Joinroom.less";
import { connect } from "dva";
import { Col, Button, Modal, Checkbox, Card, List, Avatar, message,Popover } from "antd";
import CourseWareSelect from "./../CourseWareManage/CourseWareSelect"

const pushOption = [];

@connect(({ room }) => ({
    room
}))
class Courseware extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            roomId: 1,
            indeterminate: true,
            checkAll: false,
            bigImg: null,
            modal: {
                title: "请选择您要上传的课件",
                width: '60%',
            }
        }
    }
    componentDidMount() {
        console.log("componentDidMount==")
        const { dispatch, roomId } = this.props;

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
            success: () => {
                message.success('添加成功!');
                // this.handleCancel()
            },
            fail: (res) => {
                console.log("fail====", res)
                message.error('添加失败！');
            },
        });
    }
    onRemove = (courseWare) => {
        console.log("onRemove courseWare== ",courseWare)
        const { roomId, dispatch } = this.props
        var data = {}
        data.room_id = roomId;
        data.coursewares_no = courseWare.coursewares_no
        console.log("onRemove   data===", data)
        dispatch({
            type: 'room/removeCourseWare',
            payload: data,
            success: () => {
                message.success('删除成功！');
                // this.handleCancel()
            },
            fail: (res) => {
                console.log("fail====", res)
                message.error('删除失败！');
            },
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
        const brr = [];
        this.setState({
            visible1: false,
            checkedList: []
        });
        this.state.checkedList.map(item => {
            pushOption.push(plainOptions[item]);
            for (let i = 0; i < plainOptions.length; i++) {
                if (i != item) {
                    brr.push(plainOptions[i])
                }
            }
            //plainOptions.splice(plainOptions[item],1);
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible1: false,
        });
    };
    render() {

        const { imageList,courseWareIds } = this.props.room

        return (
            <div>
                <Col span={19} className="cardStyle">
                    <div className="Courseware-upload">
                        <Button type="primary" block icon="picture"
                            onClick={this.showModal.bind(this)}>上传课件</Button>
                    </div>
                    <List
                        grid={{ column: 1 }}
                        className="Courseware-list"
                        dataSource={imageList}
                        renderItem={item => (
                            <List.Item>
                                <Popover placement="rightTop" title=''
                                         content={(<img src={item.coursewares_images} alt=""/>)} trigger="click">
                                    <img src={item.coursewares_images} alt=""/>
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
                        onRemove ={(courseWare)=>this.onRemove(courseWare)}
                        selectKeys={courseWareIds} />
                        : <img alt="" src={this.state.bigImg} />}
                </Modal>
            </div>
        )
    }
}
export default Courseware;




