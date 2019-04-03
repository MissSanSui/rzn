import React, {PureComponent} from "react";
import "./Joinroom.less";
import {Col, Button, Modal, Checkbox, Card, List, Avatar} from "antd";

const plainOptions = [
    {

        title: 0,
        img: 'http://img0.imgtn.bdimg.com/it/u=4235563522,1399401048&fm=200&gp=0.jpg'
    },
    {
        title: 1,
        img: 'http://img2.a0bi.com/upload/ttq/20150802/1438503585635.jpg'
    },
    {
        title: 2,
        img: 'http://b.hiphotos.baidu.com/zhidao/pic/item/267f9e2f0708283896af675aba99a9014d08f1da.jpg'
    }
    ,
    {
        title: 3,
        img: 'http://pic171.nipic.com/file/20180704/26129549_092612455034_2.jpg'
    }
    ,
    {
        title: 4,
        img: 'http://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/eac4b74543a98226d7a9ff488c82b9014a90eb71.jpg'
    },
    {
        title: 5,
        img: 'http://img2.imgtn.bdimg.com/it/u=3386645186,1292480344&fm=26&gp=0.jpg'
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
                <Col span={20} className="cardStyle">
                    <Button type="primary" block icon="picture"
                            className="Courseware-upload"
                            onClick={this.showModal.bind(this)}>上传课件</Button>

                    <List
                        grid={{column: 1}}

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




