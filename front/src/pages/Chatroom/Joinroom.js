import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Row, Col, Button, Icon, Modal,Tooltip,Drawer,Input} from "antd";
import "white-web-sdk/style/index.css";
import Courseware from "./Courseware";
import WhiteList from "./WhiteList";
import Camera from "./Camera";

let room = null;
let miniToken = 'WHITEcGFydG5lcl9pZD1scGMxOEtuU3JaUlE3YWFmUm1wZFNFaEFhM3J3TzB5T01pOTYmc2lnPTM5ZWQxYWY3ZjE3OGE5MTU1ZThmNDFhNmMyNThiYWExNTU0MDA5MmE6YWRtaW5JZD0xMjQmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1ODI5NzQ5NTAmYWs9bHBjMThLblNyWlJRN2FhZlJtcGRTRWhBYTNyd08weU9NaTk2JmNyZWF0ZV90aW1lPTE1NTE0MTc5OTgmbm9uY2U9MTU1MTQxNzk5ODMxMDAw';

const whiteImg = [];

class Chatroom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            visible: false,
            modalVisible: false,
            confirmLoading: false,
            whiteImgList: whiteImg
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

        room.putScenes("/math", [{name: "geometry"}]);
        room.setScenePath("/math/geometry");


        function onWindowResize() {
            room.refreshViewSize();
        }

        window.addEventListener("resize", onWindowResize);


        this.setState({
            room: room,
        });


        //获取封面
        const url1 = 'https://cloudcapiv4.herewhite.com/handle/rooms/snapshots?roomToken=' +
            room.roomToken;
        const pageRes = await fetch(url1, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                width: '150px',
                height: '120px',
                scenePath: '/math/geometry',
                uuid: room.uuid
            }),
        });
        const pageJson = await pageRes.json();
        this.setState({
            whiteImgList: pageJson.msg,
        });

        console.log(this.state.whiteImgList);

        // 加载直播间信息
        // const enterChatUrl = '/api/chat/enterChat';
        // const enterChatInit = {
        //   method: 'POST',
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     account: 'gaohe'
        //   }),
        // };
        // const resChat = await fetch(enterChatUrl, enterChatInit);
        // const jsonChat = await resChat.json();
        // console.log(jsonChat);

        // 获取电子白板token
        // const joinWhiteUrl = 'https://cloudcapiv4.herewhite.com/room/join?uuid=' + jsonChat.data.white_id + '&token=' + jsonChat.miniToken;
        // const joinWhiteUrl = 'https://cloudcapiv4.herewhite.com/room/join?uuid=4a4050bb2bd04f58a456301891036f3a&token=' + miniToken;

        // const joinWhiteInit = {
        //   method: 'POST',
        //   headers: {
        //     "content-type": "application/json",
        //   }
        // };
        // const resWhite = await fetch(joinWhiteUrl, joinWhiteInit);
        // const jsonWhite = await resWhite.json();
        // // 加入电子白板
        // const whiteWebSdk = new WhiteWebSdk();
        // room = await whiteWebSdk.joinRoom({uuid: '4a4050bb2bd04f58a456301891036f3a', roomToken: jsonWhite.msg.roomToken});
        // room.setViewMode("broadcaster");
        // // room.removeScenes("/");
        // this.setState({room: room});


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

    add = ()=> {

        const that = this;
        const url = 'https://cloudcapiv4.herewhite.com/room?token=' + miniToken;
        fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: 'no2',
                limit: '100',
                mode: 'historied'
            }),
        }).then(res=>res.clone().json()).then(res=> {

            const msg = res.msg;
            console.log(msg)


            /*
            fetch('https://cloudcapiv4.herewhite.com/handle/rooms/snapshots?roomToken=' +
                that.state.room.roomToken, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    width: '100px',
                    height: '100px',
                    uuid: msg.room.uuid,
                    scenePath: '/math',
                }),
            }).then(res=>{
                res.clone().json();
                console.log(res)
            }).then(res=> {
                console.log(res)
            }).catch(error=>console.error('Error:', error))
            */
        }).catch(error => console.error('Error:', error))


    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
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
        const { modalVisible, confirmLoading } = this.state;
        return (
            this.state.room ?
                <div className="joinRoomStyle">
                    <div className="room-left">
                        <Courseware />
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
                                <Icon type="play-circle" theme="filled" />
                            </Tooltip>
                            <Tooltip placement="topLeft" title="关闭直播">
                                <Icon type="close-circle" theme="filled" onClick={this.showModal} />
                            </Tooltip>
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
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Camera />
                        <div className="whiteBtn">
                            <Button type="primary" onClick={this.add.bind(this)}>创建画板</Button>
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
