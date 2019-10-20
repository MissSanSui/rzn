import React, { PureComponent } from "react";
import { RoomWhiteboard } from "white-react-sdk";
import { WhiteWebSdk } from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import { Button, Icon, List, Card } from "antd";

class WhiteList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sceneName: ""
        }

    }
    componentWillReceiveProps(nextProps) {
        let sceneState = nextProps.room.state.sceneState||{}
        let path =sceneState.scenePath?sceneState.scenePath.split("/"):[];
        let sceneName = path.length>0?path[path.length-1]:""
        this.setState({ sceneName })
    }
    // 进入到缩略图的场景
    changeClass = (sceneName) => {
        this.props.room.setScenePath("/record/" + sceneName);
        this.setState({ sceneName })
    };
    setupDivRef = (ref, path) => {
        if (ref) {
            this.ref = ref;
            this.props.room.scenePreview(path, ref, 150, 120);
        }
    }
    render() {
        let sceneState = this.props.room.state.sceneState;
        console.log("sceneState====", sceneState)
        const scenes = sceneState.scenes || [];
        const sceneDir = "/record"
        let path =sceneState.scenePath?sceneState.scenePath.split("/"):[];
        let sceneName = path.length>0?path[path.length-1]:""
        // let sceneName =this.state.sceneName
        return (
            <div className="whiteList">
                <List
                    grid={{ column: 1, gutter: 0 }}
                    className="white-lists"
                    dataSource={scenes}
                    renderItem={(scene, index) => (
                        <div style={{
                            width: "100%", height: "120px",
                            border: scene.name == sceneName ? "0.5px solid blue" : "0.5px solid gray", marginBottom: "10px"
                        }}
                            onClick={() => this.changeClass(scene.name)}
                            ref={(ref) => this.setupDivRef(ref, sceneDir + "/" + scene.name)} />
                    )}
                />
                {/* <List
                    grid={{ column: 1, gutter: 0 }}
                    className="white-lists"
                    dataSource={this.props.whiteList}
                    renderItem={(item, index) => (
                        <List.Item >
                            <Card
                                hoverable
                                bodyStyle={{ display: 'none' }}
                                cover={<img alt={item.url} src={item.url} />}
                                onClick={() => this.changeClass(index)}
                            >
                            </Card>
                        </List.Item>
                    )}
                /> */}
            </div>
        )
    }
}

export default WhiteList;