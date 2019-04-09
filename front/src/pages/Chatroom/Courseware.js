import React, {PureComponent} from "react";
import "./Joinroom.less";
import {Col, Button, Modal, Checkbox, Card, List, Avatar} from "antd";

const plainOptions = [
    {

        title: 0,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 1,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 2,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
    ,
    {
        title: 3,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
    ,
    {
        title: 4,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 5,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {

        title: 6,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 7,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 8,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
    ,
    {
        title: 9,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
    ,
    {
        title: 10,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    {
        title: 11,
        img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
];
const pushOption = [];

const CheckboxGroup = Checkbox.Group;


class Courseware extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            bigImg: null,
            modal: {
                title: "请选择您要上传的课件",
                width: '60%',
            }
        }
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    };


    showModal = () => {
        this.setState({
            visible1: true,
            bigImg: null,
            modal: {
                title: "请选择您要上传的课件",
                width: '60%',
            }
        });
    };


    handleOk = (e) => {

        const brr = [];
        this.setState({
            visible1: false,
            checkedList: []
        });
        this.state.checkedList.map(item=> {
            pushOption.push(plainOptions[item]);
            for (let i = 0; i < plainOptions.length; i++) {
                if (i != item) {
                    brr.push(plainOptions[i])
                }
            }
            //plainOptions.splice(plainOptions[item],1);
        });


    };
    handleCancel = (e) => {

        this.setState({
            visible1: false,
        });
    };

    imgclick = (img)=> {

        this.setState({
            visible1: true,
            bigImg: img,
            modal: {
                title: "",
                width: '600px',
            }
        });
        console.log(this.state)
    };

    render() {

        const modalShow = ()=> {
            return (
                <CheckboxGroup value={this.state.checkedList}
                               onChange={this.onChange}>

                    <List
                        grid={{column: 6, gutter: 10}}

                        dataSource={plainOptions}
                        renderItem={item => (
                            <List.Item>
                                <Checkbox
                                    className={'CheckboxStyle'}
                                    value={item.title}
                                >
                                </Checkbox>
                                <img src={item.img} alt=""/>
                            </List.Item>

                        )}
                    />


                </CheckboxGroup>
            )

        };

        return (
            <div>
                <Col span={19} className="cardStyle">
                    <div className="Courseware-upload">
                        <Button type="primary" block icon="picture"
                                onClick={this.showModal.bind(this)}>上传课件</Button>
                    </div>


                    <List
                        grid={{column: 1}}
                        className="Courseware-list"
                        dataSource={pushOption}
                        renderItem={item => (
                            <List.Item>
                                <img src={item.img} alt="" onClick={this.imgclick.bind(this, item.img)}/>
                            </List.Item>

                        )}
                    />
                </Col>
                <Modal
                    title={this.state.modal.title}
                    width={this.state.modal.width}
                    visible={this.state.visible1}

                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >


                    {this.state.bigImg == null ? modalShow() : <img alt="" src={this.state.bigImg}/>}


                </Modal>
            </div>
        )
    }
}

export default Courseware;




