import React, {PureComponent} from "react";
import {RoomWhiteboard} from "white-react-sdk";
import {WhiteWebSdk} from "white-web-sdk";
import * as serviceWorker from "./serviceWorker";
import {Button, Icon, List,Card} from "antd";

class WhiteList extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="whiteList">
                <Button type="primary" onClick={this.props.add.bind(this)}>加一页</Button>
                <List
                    grid={{column: 1, gutter: 0}}

                    dataSource={this.props.whiteList}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                height="150px"
                                hoverable
                                cover={<img alt='' src={item}/>}
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