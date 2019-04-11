import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Button, Icon, List,Card} from "antd";

class WhiteList extends PureComponent {
    constructor(props) {
        super(props);
    }

    // 进入到缩略图的场景
    changeClass = (index) => {
       this.props.room.setScenePath("/record/class" + (index + 1));
    };

    render() {

        return (
            <div className="whiteList">
                <List
                    grid={{column: 1, gutter: 0}}
                    className="white-lists"
                    dataSource={this.props.whiteList}
                    renderItem={(item, index) => (
                        <List.Item >
                            <Card
                                hoverable
                                bodyStyle={{display:'none'}}
                                cover={<img alt={item.url} src={item.url}/>}
                                onClick={() => this.changeClass(index)}
                            >
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default WhiteList;