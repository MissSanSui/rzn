import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Row, Col, Button, Icon, Modal, Tooltip, Drawer, Input} from "antd";
import "white-web-sdk/style/index.css";
import Courseware from "./Courseware";
import WhiteList from "./WhiteList";
import Camera from "./Camera";

let room = null;
let miniToken = 'WHITEcGFydG5lcl9pZD1scGMxOEtuU3JaUlE3YWFmUm1wZFNFaEFhM3J3TzB5T01pOTYmc2lnPTM5ZWQxYWY3ZjE3OGE5MTU1ZThmNDFhNmMyNThiYWExNTU0MDA5MmE6YWRtaW5JZD0xMjQmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1ODI5NzQ5NTAmYWs9bHBjMThLblNyWlJRN2FhZlJtcGRTRWhBYTNyd08weU9NaTk2JmNyZWF0ZV90aW1lPTE1NTE0MTc5OTgmbm9uY2U9MTU1MTQxNzk5ODMxMDAw';

class Chatroom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            roomId:1,
            visible: false,
            modalVisible: false,
            confirmLoading: false,
            creatWhiteLoading: true,
            whiteImgList: []
        }
    }


    async componentWillMount() {

        const whiteWebSdk = new WhiteWebSdk();
        const url = 'https://cloudcapiv4.herewhite.com/room?token=' + miniToken;
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
        const room = await whiteWebSdk.joinRoom({
            uuid: json.msg.room.uuid,
            roomToken: json.msg.roomToken
        });


        function onWindowResize() {
            room.refreshViewSize();
        }

        window.addEventListener("resize", onWindowResize);


        this.setState({
            room: room,
        });
        this.state.room.putScenes("/record", [{name: "class" + this.state.whiteImgList.length}]);
        this.state.room.setScenePath("/record/class" + this.state.whiteImgList.length);
    }

    eraser = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "eraser"
        });
    };
    selector = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "selector"
        });
    };
    pencil = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "pencil",
            strokeColor: [255, 0, 0],
            strokeWidth: 2,
        });
    };
    rectangle = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "rectangle"
        });
    };
    ellipse = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "ellipse"
        });
    };
    text = ()=> {
        this.state.room.setMemberState({
            currentApplianceName: "text",

            textSize: 14
        });
    };

    classList = ()=> {
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
        }).then(res=>res.clone().json()).then(res=> {

            this.setState({
                whiteImgList: res.msg,
                creatWhiteLoading: true
            });

        });
        console.log(this.state.whiteImgList);
    };
    add = ()=> {
        const num = this.state.whiteImgList.length;
        console.log(num)
        this.setState({
            creatWhiteLoading: false
        });

        this.classList();
        this.state.room.putScenes("/record", [{name: "class" + num}]);
        this.state.room.setScenePath("/record/class" + num);

    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.classList();
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
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
        const { modalVisible, confirmLoading ,roomId} = this.state;
        return (
            this.state.room ?
                <div className="joinRoomStyle">
                    <div className="room-left">
                        <Camera />
                        <Courseware roomId={roomId}/>
                    </div>
                    <div className="room-middle">
                        <ul className="room-icon">
                            <li>
                                <Icon type="delete" theme="filled" onClick={this.eraser.bind(this)}/>
                            </li>
                            <li>
                                <Icon type="edit" theme="filled" onClick={this.pencil.bind(this)}/>
                            </li>
                            <li>
                                <Icon type="font-size" onClick={this.text.bind(this)}/>
                            </li>
                            <li>
                                <Icon type="border" onClick={this.rectangle.bind(this)}/>
                            </li>
                        </ul>

                        <div className="video-icon">
                            <Tooltip placement="topLeft" title="开启直播">
                                <Icon type="play-circle" theme="filled"/>
                            </Tooltip>
                            <Tooltip placement="topLeft" title="关闭直播">
                                <Icon type="close-circle" theme="filled" onClick={this.showModal}/>
                            </Tooltip>
                            <Modal
                                title="是否保存当前课程"
                                visible={modalVisible}
                                onOk={this.handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={this.handleCancel}
                            >
                                <Input placeholder="课程描述"/>
                            </Modal>
                        </div>
                        <div className="menu-icon">
                            <Icon type="menu-fold" onClick={this.showDrawer}/>
                        </div>
                        <Col span={24}>
                            <RoomWhiteboard room={this.state.room}
                                            style={{width: '100%', height: '100vh'}}/>
                        </Col>

                    </div>
                    <Drawer
                        mask={false}
                        placement="right"
                        width="200"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >

                        <div className="whiteBtn">
                            <Button type="primary"
                                    disabled={this.state.creatWhiteLoading ? '' : 'disabled'}
                                    onClick={this.state.creatWhiteLoading ? this.add.bind(this) : null}
                            >创建画板</Button>
                        </div>
                        <WhiteList add={this.add.bind(this)} whiteList={this.state.whiteImgList}/>

                    </Drawer>


                </div>
                : <div>Loading</div>
        )
    }
}

export default Chatroom;

serviceWorker.unregister();
