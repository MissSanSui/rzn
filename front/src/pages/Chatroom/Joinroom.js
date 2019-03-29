import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Row, Col, Button, Icon, Modal} from "antd";
import "white-web-sdk/style/index.css";
import Camera from "./Camera";
import Courseware from "./Courseware";
import WhiteList from "./WhiteList";

let room = null;
const whiteImg = [
    {
        key: 0,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        key: 1,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        key: 2,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
];



class Chatroom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            whiteImgList: whiteImg
        }
    }


    async componentWillMount() {
        const miniToken = 'WHITEcGFydG5lcl9pZD1scGMxOEtuU3JaUlE3YWFmUm1wZFNFaEFhM3J3TzB5T01pOTYmc2lnPTM5ZWQxYWY3ZjE3OGE5MTU1ZThmNDFhNmMyNThiYWExNTU0MDA5MmE6YWRtaW5JZD0xMjQmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1ODI5NzQ5NTAmYWs9bHBjMThLblNyWlJRN2FhZlJtcGRTRWhBYTNyd08weU9NaTk2JmNyZWF0ZV90aW1lPTE1NTE0MTc5OTgmbm9uY2U9MTU1MTQxNzk5ODMxMDAw';

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
        //room.setScenePath("/math");
        function onWindowResize() {
            room.refreshViewSize();
        }

        window.addEventListener("resize", onWindowResize);


        this.setState({
            room: room,
        });
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
        //this.state.room.putScenes("/init");
    };

    render() {
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

                        <Col span={24}>
                            <RoomWhiteboard room={this.state.room}
                                            style={{width: '100%', height: '100vh'}}/>
                        </Col>

                    </div>
                    <div className="room-right">
                        <Col span={24} style={{paddingLeft: '5px'}}>
                            <Camera />


                            <WhiteList add={this.add.bind(this)} whiteList={this.state.whiteImgList}/>

                        </Col>

                    </div>


                </div>
                : <div>Loading</div>
        )
    }
}

export default Chatroom;

serviceWorker.unregister();
