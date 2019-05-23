import React, { PureComponent } from "react";
import { connect } from "dva";
import { Col, Button, Modal, Checkbox, Card, List, Popover, message, Icon } from "antd";
import CourseWareSelect from "./../CourseWareManage/CourseWareSelect"


class CourseImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }
    hide = () => {
        this.setState({
            visible: false,
        });
    }
    show = () => {
        this.setState({
            visible: true,
        });
    }
    
    handleVisibleChange = (visible) => {
        // this.setState({ visible });
    }

    render() {
        var src = this.props.src || ""
        const content = (
            <div>
                <img src={src + "?x-oss-process=image/resize,m_lfit,h_500,w_500"} alt="" />
                < Icon type="close" onClick={this.hide} style={{ position: "absolute", top: "15px", right: "20px",backgroundColor:"white" }} />
            </div>
        )

        return (
            <Popover placement="rightTop" title=''
                content={content} trigger="click"
                visible={this.state.visible}
                onClick={this.show}
                onVisibleChange={this.handleVisibleChange}
            >
                <img src={src} alt="" />
            </Popover>
        )
    }
}
export default CourseImage;