import React, { PureComponent,Component } from "react";
import { RoomWhiteboard } from "white-react-sdk";
import { WhiteWebSdk } from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import { Row, Col, Button, Icon, Modal, Tooltip, Drawer, Input, Select, message } from "antd";
import router from 'umi/router';
import "white-web-sdk/style/index.css";
import Courseware from "./Courseware";
import WhiteList from "./WhiteList";
import Camera from "./Camera";
import { connect } from "dva";
import iconfont from './iconfont.js'

@connect(({ room, user }) => ({
    room,
    currentUser: user.currentUser
}))
class Chatroom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            roomId: 1,
            visible: false,
            modalVisible: false,
            confirmLoading: false,
            creatWhiteLoading: true,
            whiteImgList: []
        }
    }

    joinRoom = async (oldRoom) => {
        console.log("joinRoom===oldRoom==", oldRoom)
        const { dispatch, currentUser } = this.props
        console.log("joinRoom===currentUser==", currentUser)

        if (currentUser.role == "TEA") {
            if (oldRoom.room_start == "Y") {
                dispatch({
                    type: 'room/selectUsers',
                    payload: oldRoom.user_ids,
                });
            } else {
                const url = 'https://cloudcapiv4.herewhite.com/room?token=' + oldRoom.miniToken;
                const requestInit = {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: '我的第1个 White 房间',
                        limit: 100, // 房间人数限制
                        mode: 'historied'
                    }),
                };
                const res = await fetch(url, requestInit);
                const json = await res.json();
                console.log("joinRoom json==", json)
                oldRoom.white_id = json.msg.room.uuid
                oldRoom.white_token = json.msg.roomToken
                oldRoom.created_date = ""
                oldRoom.last_updated_date = ""
                this.setState({
                    oldRoom: oldRoom
                })
            }
        } else {
            if (oldRoom.room_start != "Y") {
                message.warn("直播间未开播哦！")
                router.push("/my-chat-room/search")
                return
            }else if(currentUser.user_id!=oldRoom.user_ids){
                message.warn("没权限进入直播间哦！")
                router.push("/my-chat-room/search")
                return
            }
        }

        const whiteWebSdk = new WhiteWebSdk({
            zoomMaxScale: 1,
            zoomMinScale: 1,
        });
        
        const room = await whiteWebSdk.joinRoom({
            uuid: oldRoom.white_id,
            roomToken: oldRoom.white_token
        });

        room.setMemberState({
            strokeWidth: 1,
            strokeColor: currentUser.role == "TEA" ? [255, 0, 0] : [0, 0 ,255],
        });

        function onWindowResize() {
            room.refreshViewSize();
        }
        window.addEventListener("resize", onWindowResize);
        const classNum = 1;
        this.setState({
            room: room,
            classNum: classNum
        });

        // 插入场景，并切换到最新场景
        this.state.room.putScenes("/record", [{ name: "class" + classNum }]);
        this.state.room.setScenePath("/record/class" + classNum);
    }
    componentWillMount() {
        console.log("componentDidMount this.props==", this.props.location.query)
        var query = this.props.location.query
        this.setState({
            roomId: query.roomId,
        })
        const { dispatch } = this.props

        dispatch({
            type: 'room/fetchRoom',
            payload: { room_id: query.roomId },
            success: (data) => {
                console.log("componentDidMount data===", data)
                this.setState({
                    oldRoom: data
                })
                this.joinRoom(data)
            }
        });
    }
    eraser = () => {
        this.state.room.setMemberState({
            currentApplianceName: "eraser"
        });
    };
    selector = () => {
        this.state.room.setMemberState({
            currentApplianceName: "selector"
        });
    };
    pencil = () => {
        const { currentUser } = this.props
        this.state.room.setMemberState({
            currentApplianceName: "pencil",
            strokeColor: currentUser.role == "TEA" ? [255, 0, 0] : [0, 0, 255],
            strokeWidth: 1,
        });
    };
    rectangle = () => {
        this.state.room.setMemberState({
            currentApplianceName: "rectangle"
        });
    };
    ellipse = () => {
        this.state.room.setMemberState({
            currentApplianceName: "ellipse"
        });
    };
    text = () => {
        this.state.room.setMemberState({
            currentApplianceName: "text",
            textSize: 14
        });
    };

    classList = () => {
        const url1 = 'https://cloudcapiv4.herewhite.com/handle/rooms/snapshots?roomToken=' +
            this.state.room.roomToken;
        fetch(url1, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                width: '150px',
                height: '120px',
                scenePath: '/record',
                uuid: this.state.room.uuid
            }),
        }).then(res => res.clone().json()).then(res => {
            const datetime = (new Date()).getTime();
            res.msg.forEach((element, index) => {
                res.msg[index].url = res.msg[index].url + '?_v=' + datetime;
            });
            this.setState({
                whiteImgList: res.msg,
                creatWhiteLoading: true
            });
        });
    };
    add = () => {
        const classNum = this.state.classNum + 1;
        this.setState({
            creatWhiteLoading: false,
            classNum: classNum
        });
        console.log(classNum)
        this.state.room.putScenes("/record", [{ name: "class" + classNum }]);
        this.state.room.setScenePath("/record/class" + classNum);

        const url1 = 'https://cloudcapiv4.herewhite.com/handle/rooms/snapshots?roomToken=' +
            this.state.room.roomToken;
        fetch(url1, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                width: '150px',
                height: '120px',
                scenePath: '/record',
                uuid: this.state.room.uuid
            }),
        }).then(res => res.clone().json()).then(res => {
            console.log(res.msg)
            const datetime = (new Date()).getTime();
            res.msg.forEach((element, index) => {
                res.msg[index].url = res.msg[index].url + '?_v=' + datetime;
            });
            this.setState({
                whiteImgList: res.msg,
                creatWhiteLoading: true
            });
        });
    };


    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.classList();
    };

    onHide = () => {
        this.setState({
            visible: false,
        });
    };
    onStart = () => {
        const { userIds, courseWareIds } = this.props.room
        const { dispatch } = this.props
        const { roomId, oldRoom } = this.state
        if(oldRoom.room_start=="Y"){
            message.warn("已经开始直播了！")
            return
        }
        if (userIds == "" || userIds.length == 0) {
            message.warn("请选择学生！")
            return
        }
        if (courseWareIds.length == 0) {
            message.warn("请选择课件！")
            return
        }
        var that = this
        Modal.confirm({
            title: '是否开始直播?',
            content: '请确认已经选择好学生和课件！',
            onOk() {
                dispatch({
                    type: 'room/saveCourseWareAndUser',
                    payload: {
                        room_id: roomId,
                    },
                    success: () => {
                        oldRoom.room_start = "Y"
                        dispatch({
                            type: 'room/updateRoom',
                            payload: oldRoom,
                            success: (data) => {
                                message.success("成功开播！")
                                oldRoom.room_start = "Y"
                                that.setState({
                                    oldRoom:{...oldRoom,...{room_start:"Y"}}
                                })
                            }
                        });
                    },
                    fail: (msg) => {
                        message.warn("操作失败！" + msg)
                    },
                })
            },
            onCancel() {
            },
        });
    }
    onClose = () => {
        const { dispatch } = this.props
        const { roomId, oldRoom } = this.state
        Modal.confirm({
            title: '是否结束直播?',
            content: '结束直播后将不能直接返回！',
            onOk() {
                dispatch({
                    type: 'room/deleteCourseWareAndUser',
                    payload: {
                        room_id: roomId,
                    },
                    success: () => {
                        oldRoom.room_start = "N"
                        oldRoom.created_date = ""
                        oldRoom.last_updated_date = ""
                        dispatch({
                            type: 'room/updateRoom',
                            payload: oldRoom,
                            success: (data) => {
                                message.success("直播结束！")
                                router.push({ pathname: '/my-chat-room/search' })
                            }
                        });
                    },
                    fail: (msg) => {
                        message.warn("操作失败！" + msg)
                    },
                })
            },
            onCancel() {

            },
        });

    }
    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });

        setTimeout(() => {
            this.setState({
                modalVisible: false,
                confirmLoading: false,
            });
        }, 1000);
    };
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        let { modalVisible, confirmLoading, roomId, oldRoom } = this.state;
        const MyIcon = Icon.createFromIconfontCN({
            scriptUrl: './iconfont.js.js', // 在 iconfont.cn 上生成
        });
        const { currentUser } = this.props
        console.log("oldRoom===", oldRoom)
        return (
            this.state.room ?
                <div className="joinRoomStyle">
                    <div className="room-left">
                        <Camera appleId={oldRoom.appleId} vedioId={oldRoom.video_id} userId={currentUser.user_id} />
                        <Courseware roomId={roomId} oldRoom={oldRoom} />
                    </div>
                    <div className="room-middle">
                        <ul className="room-icon">
                            <li>
                                <MyIcon type="icon-xiangpica" onClick={this.eraser.bind(this)} />
                            </li>
                            <li>
                                <Icon type="edit" theme="filled" onClick={this.pencil.bind(this)} />
                            </li>
                            {/* <li>
                                <Icon type="font-size" onClick={this.text.bind(this)} />
                            </li> */}
                            <li>
                                <Icon type="border" onClick={this.rectangle.bind(this)} />
                            </li>
                        </ul>

                        <div className="video-icon">
                            <div style={{ display: currentUser.role == "TEA" ? "block" : "none" }}>
                                <Tooltip placement="topLeft" title="开启直播" >
                                    <Icon type="play-circle" theme="filled" onClick={this.onStart} />
                                </Tooltip>
                                <Tooltip placement="topLeft" title="关闭直播">
                                    <Icon type="close-circle" theme="filled" onClick={this.onClose} />
                                </Tooltip>
                            </div>
                            <Modal
                                title="是否保存当前课程"
                                visible={modalVisible}
                                onOk={this.handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={this.handleCancel}
                            >
                                <Input placeholder="课程描述" />
                            </Modal>
                        </div>
                        <div className="menu-icon">
                            <Icon type="menu-fold" onClick={this.showDrawer} />
                        </div>
                        <Col span={24}>
                            <RoomWhiteboard room={this.state.room}
                                style={{ width: '100%', height: '100vh' }} />
                        </Col>

                    </div>
                    <Drawer
                        mask={false}
                        placement="right"
                        width="200"
                        closable={true}
                        onClose={this.onHide}
                        visible={this.state.visible}
                    >

                        <div className="whiteBtn" style={{ display: currentUser.role == "TEA" ? "block" : "none" }}>
                            <Button type="primary"
                                disabled={this.state.creatWhiteLoading ? '' : 'disabled'}
                                onClick={this.state.creatWhiteLoading ? this.add.bind(this) : null}
                            >创建画板</Button>
                        </div>
                        <WhiteList add={this.add.bind(this)} whiteList={this.state.whiteImgList} room={this.state.room} />

                    </Drawer>


                </div>
                : <div>Loading</div>
        )
    }
}

export default Chatroom;

serviceWorker.unregister();