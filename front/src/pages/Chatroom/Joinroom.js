import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Row, Col, Button, Icon, Modal} from "antd";
import "white-web-sdk/style/index.css";
import Camera from './Camera';
import Courseware from './Courseware';
import AgoraRTC from 'agora-rtc-sdk'
let room = null;


class Chatroom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            room: null
        }
    }


    async componentWillMount() {
        const miniToken = 'WHITEcGFydG5lcl9pZD1scGMxOEtuU3JaUlE3YWFmUm1wZFNFaEFhM3J3TzB5T01pOTYmc2lnPTM5ZWQxYWY3ZjE3OGE5MTU1ZThmNDFhNmMyNThiYWExNTU0MDA5MmE6YWRtaW5JZD0xMjQmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1ODI5NzQ5NTAmYWs9bHBjMThLblNyWlJRN2FhZlJtcGRTRWhBYTNyd08weU9NaTk2JmNyZWF0ZV90aW1lPTE1NTE0MTc5OTgmbm9uY2U9MTU1MTQxNzk5ODMxMDAw';

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

        const whiteWebSdk = new WhiteWebSdk();

        const url = 'https://cloudcapiv4.herewhite.com/room?token=' + miniToken;
        const requestInit = {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: '我的第一个 White 房间',
                limit: 100, // 房间人数限制
            }),
        };
        const res = await fetch(url, requestInit);
        const json = await res.json();
        const room = await whiteWebSdk.joinRoom({
            uuid: json.msg.room.uuid,
            roomToken: json.msg.roomToken});

        this.setState({room: room});


        // 加入视频直播间
        const appleId = '4c2508e4a3b94c72a5c56e80281760fd';
        const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
        client.init(appleId, function () {
          console.log("AgoraRTC client initialized");
          // 初始化成功后加入频道
          client.join(null, 'fans', '1', function(uid) {
            console.log("User " + uid + " join channel successfully");
            var localStream = AgoraRTC.createStream({
              streamID: uid,
              audio: true,
              video: true,
              screen: false}
            );
            localStream.init(function() {
              console.log("getUserMedia successfully");
              localStream.play('agora_local');

              client.publish(localStream, function (err) {
                console.log("Publish local stream error: " + err);
              });

              client.on('stream-published', function (evt) {
                console.log("Publish local stream successfully");
              });

            }, function (err) {
              console.log("getUserMedia failed", err);
            });

          }, function(err) {
            console.log("Join channel failed", err);
          });

          client.on('stream-added', function (evt) {
            var stream = evt.stream;
            console.log("New stream added: " + stream.getId());
            console.log(stream.getId() == '1');
            if(stream.getId() == '1') {
              client.leave(function () {
                console.log("Leave channel successfully");
              }, function (err) {
                console.log("Leave channel failed");
              });
            }

            client.subscribe(stream, function (err) {
              console.log("Subscribe stream failed", err);
            });
          });
          client.on('stream-subscribed', function (evt) {
            var remoteStream = evt.stream;
            console.log("Subscribe remote stream successfully: " + remoteStream.getId());
            remoteStream.play('agora_remote');


          })


        }, function (err) {
          console.log("AgoraRTC client init failed", err);
        });


    }

    eraser = ()=> {
        room.setMemberState({
            currentApplianceName: "eraser"
        });
    };
    selector = ()=> {
        room.setMemberState({
            currentApplianceName: "selector"
        });
    };
    pencil = ()=> {
        room.setMemberState({
            currentApplianceName: "pencil",
            strokeColor: [255, 0, 0],
            strokeWidth: 2,
        });
    };
    rectangle = ()=> {
        room.setMemberState({
            currentApplianceName: "rectangle"
        });
    };
    ellipse = ()=> {
        room.setMemberState({
            currentApplianceName: "ellipse"
        });
    };
    text = ()=> {
        room.setMemberState({
            currentApplianceName: "text",

            textSize: 14
        });
    };

    add = () => {
        room.putScenes("/math", [{name: "geometry"}]);
    };

    qiehuan = () => {
        room.setScenePath("/math/geometry");
    };

    chaxun = () => {
        console.log(room.state.sceneState);
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
                            <Button type="primary" htmlType="submit" onClick={this.add}>加一页</Button>
                        </Col>
                        <div id='agora_local' style={{width: '190px', height: '190px'}}/>
                         <div id='agora_remote' style={{width: '190px', height: '190px'}}/>
                    </div>

                    {/*
                     <Button type="primary" htmlType="submit" onClick={this.add}>加一页</Button>
                     <Button type="primary" htmlType="submit" onClick={this.qiehuan}>切换</Button>
                     <Button type="primary" htmlType="submit" onClick={this.chaxun}>查询</Button>
                     */}
          


                </div>
                : <div>Loading</div>
        )
    }
}

export default Chatroom;

serviceWorker.unregister();
