import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import AgoraRTC from "agora-rtc-sdk";
import {Icon} from "antd";

class Camera extends PureComponent {
    constructor(props) {
        super(props);

    }
    componentWillUnmount(){
        this.state.client && this.state.client.unpublish(this.state.localStream);
        this.state.localStream && this.state.localStream.close();
        this.state.client &&
        this.state.client.leave(
            () => {
                console.log('Client succeed to leave.');
            },
            () => {
                console.log('Client failed to leave.');
                }
            );
    }

    async componentDidMount() {
        // 加入视频直播间
        const appleId =this.props.appleId||''
        const vedioId =this.props.vedioId
        const userId =this.props.userId
        console.log("camera componentDidMount appleId==",appleId)
        console.log("camera componentDidMount vedioId==",vedioId)
        console.log("camera componentDidMount userId==",userId)
        const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
        
        this.setState({
            client: client
        });
        var that = this;

        client.init(appleId, function () {
            console.log("AgoraRTC client initialized");
            // 初始化成功后加入频道
            client.join(null, vedioId, userId, function (uid) {
                console.log("User " + uid + " join channel successfully");
                var localStream = AgoraRTC.createStream({
                        streamID: uid,
                        audio: true,
                        video: true,
                        screen: false
                    }
                );

                that.setState({
                    localStream: localStream
                });

                localStream.init(function () {
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

                

            }, function (err) {
                console.log("Join channel failed", err);
            });

            client.on('stream-added', function (evt) {
                var stream = evt.stream;
                that.setState({
                    stream: stream
                });
                console.log("New stream added: " + stream.getId());
                console.log(stream.getId() == '1');
                if (stream.getId() == '1') {
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
                let streamId = `remote_${remoteStream.getId()}`
                that.addVideoStream(streamId)
                remoteStream.play(streamId);
            })

            client.on('peer-leave', that.removeVideoStream)

        }, function (err) {
            console.log("AgoraRTC client init failed", err);
        });

    }

    addVideoStream(streamId){
        let streamDiv=document.createElement("div");
        streamDiv.id= streamId;
        streamDiv.style.transform="rotateY(180deg)";
        streamDiv.style.height="100%";
        this.refs.agora_remote.appendChild(streamDiv);
    }

    removeVideoStream (evt) {
        let stream = evt.stream;
        stream.stop();
        let remDiv=document.getElementById(`remote_${stream.getId()}`);
        remDiv.parentNode.removeChild(remDiv);
        console.log("Remote stream is removed " + stream.getId());
    }

    // 开启或者关闭摄像头
    leaveVideo = ()=> {
        this.state.localStream.isVideoOn() ? this.state.localStream.disableVideo() : this.state.localStream.enableVideo();
    };



    render() {
        return (
            <div className="camera">
                <div id='agora_local' style={{width: '50%', height: '120px',float:'left'}}></div>
                <div id='agora_remote' style={{width: '50%', height: '120px',float:'left'}}  ref="agora_remote"/>

                <Icon type="video-camera" theme="filled" onClick={() => this.leaveVideo()}/>
            </div>
        )
    }
}

export default Camera;