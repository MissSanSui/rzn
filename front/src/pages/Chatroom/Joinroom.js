import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import styles from './Joinroom.less';
import {RoomWhiteboard} from 'white-react-sdk';
import {WhiteWebSdk} from 'white-web-sdk';
import * as serviceWorker from './serviceWorker';
import AgoraRTC from 'agora-rtc-sdk'
import Redirect from 'umi/redirect';

import { 
  Row,
  Col,
  Button
} from 'antd';

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
    const joinWhiteUrl = 'https://cloudcapiv4.herewhite.com/room/join?uuid=2866465814e84a30b5a1d47886bc3142&token=' + miniToken;

    const joinWhiteInit = {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      }
    };
    const resWhite = await fetch(joinWhiteUrl, joinWhiteInit);
    const jsonWhite = await resWhite.json();
    // 加入电子白板
    const whiteWebSdk = new WhiteWebSdk();
    room = await whiteWebSdk.joinRoom({uuid: '2866465814e84a30b5a1d47886bc3142', roomToken: jsonWhite.msg.roomToken});
    room.setViewMode("broadcaster");
    // room.removeScenes("/");
    this.setState({room: room});

    // 加入视频直播间
    // const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
    // client.init(jsonChat.appleId, function () {
    //   console.log("AgoraRTC client initialized");
    //   // 初始化成功后加入频道
    //   client.join(null, jsonChat.data.video_id, '1', function(uid) {
    //     console.log("User " + uid + " join channel successfully");
    //     var localStream = AgoraRTC.createStream({
    //       streamID: uid,
    //       audio: true,
    //       video: true,
    //       screen: false}
    //     );
    //     localStream.init(function() {
    //       console.log("getUserMedia successfully");
    //       localStream.play('agora_local');
        
    //       client.publish(localStream, function (err) {
    //         console.log("Publish local stream error: " + err);
    //       });
          
    //       client.on('stream-published', function (evt) {
    //         console.log("Publish local stream successfully");
    //       });

    //     }, function (err) {
    //       console.log("getUserMedia failed", err);
    //     });
        
    //   }, function(err) {
    //     console.log("Join channel failed", err);
    //   });

    //   client.on('stream-added', function (evt) {
    //     var stream = evt.stream;
    //     console.log("New stream added: " + stream.getId());
    //     console.log(stream.getId() == '1');
    //     if(stream.getId() == '1') {
    //       client.leave(function () {
    //         console.log("Leave channel successfully");
    //         return (<Redirect to="/user/login" />);
    //       }, function (err) {
    //         console.log("Leave channel failed");
    //       });
    //     }
      
    //     client.subscribe(stream, function (err) {
    //       console.log("Subscribe stream failed", err);
    //     });
    //   });
    //   client.on('stream-subscribed', function (evt) {
    //     var remoteStream = evt.stream;
    //     console.log("Subscribe remote stream successfully: " + remoteStream.getId());
    //     remoteStream.play('agora_remote');

      

    //   })


    
    // }, function (err) {
    //   console.log("AgoraRTC client init failed", err);
    // });

   

  }

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
      <div>
        <Button type="primary" htmlType="submit" onClick={this.add}>
          加一页
        </Button>
        <Button type="primary" htmlType="submit" onClick={this.qiehuan}>
          切换
        </Button>
        <Button type="primary" htmlType="submit" onClick={this.chaxun}>
          查询
        </Button>  
        <Col span={21}>
          <RoomWhiteboard room={this.state.room}
                        style={{width: '100%', height: '100vh', border: '1px solid'}}/>
        </Col>
        <Col span={3} style={{paddingLeft: '5px'}}>
          {/* <div id='agora_local' style={{width: '190px', height: '190px'}}/>
          <div id='agora_remote' style={{width: '190px', height: '190px'}}/> */}
        </Col>

      </div>
      : <div>Loading</div>
    )
  }
}

export default Chatroom;

serviceWorker.unregister();
