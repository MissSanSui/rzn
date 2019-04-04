import React, {PureComponent} from "react";
import {List, Card, Form, Row, Col, Select, Typography, Switch, Button} from "antd";
import {connect} from "dva";
import {FormattedMessage} from "umi-plugin-react/locale";
import TagSelect from "@/components/TagSelect";
import StandardFormRow from "@/components/StandardFormRow";

const {Option} = Select;
const FormItem = Form.Item;
const {Title} = Typography;

const listData = [
    {
        name: '小学组',
        data: [

            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
        ]

    },
    {
        name: '初中组',
        data: [

            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
        ]
    },
    {
        name: '高中组',
        data: [
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
            {
                title: '数学',
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
            },
        ]
    },
]


@connect(({room}) => ({
    list: room.list,
}))
@Form.create({
    onValuesChange({dispatch}, changedValues, allValues) {
        // 表单项变化时请求数据
        // eslint-disable-next-line
        console.log(changedValues, allValues);
        // 模拟查询表单生效
        dispatch({
            type: 'room/fetch',
            payload: {
                count: 8,
            },
        });
    },
})
class Center extends PureComponent {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'room/fetch',
            payload: {
                count: 8,
            },
        });
    }

    render() {
        const {
            list: {list},
            form,
        } = this.props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const actionsTextMap = {
            expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand"/>,
            collapseText: (
                <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse"/>
            ),
            selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All"/>,
        };
        return (
            <div>
                <Card bordered={false} className="cardStyle">
                    <Form layout="inline">
                        <StandardFormRow title="所属类目" block style={{paddingBottom: 11}}>
                            <FormItem>
                                {getFieldDecorator('category')(
                                    <TagSelect actionsText={actionsTextMap}>
                                        <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                                        <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                                        <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                                        <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                                        <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                                        <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                                    </TagSelect>
                                )}
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="其它选项" grid last>
                            <Row gutter={16}>
                                <Col lg={8} md={10} sm={10} xs={24}>
                                    <FormItem {...formItemLayout} label="作者">
                                        {getFieldDecorator('author', {})(
                                            <Select placeholder="不限" style={{maxWidth: 200, width: '100%'}}>
                                                <Option value="lisa">王昭君</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={8} md={10} sm={10} xs={24}>
                                    <FormItem {...formItemLayout} label="好评度">
                                        {getFieldDecorator('rate', {})(
                                            <Select placeholder="不限" style={{maxWidth: 200, width: '100%'}}>
                                                <Option value="good">优秀</Option>
                                                <Option value="normal">普通</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </StandardFormRow>
                    </Form>
                </Card>
                <List
                    className="listData"
                    grid={{column: 1, gutter: 100}}

                    dataSource={listData}
                    renderItem={item => (
                        <List.Item>
                            <Title level={3}>{item.name}</Title>
                            <List
                                grid={{column: 6, gutter: 15}}
                                dataSource={item.data}
                                renderItem={item1 => (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            cover={<img alt={item1.title} src={item1.avatar}/>}
                                        >
                                            <Card.Meta description={item1.subDescription}/>
                                            <Button className="Chatroom-btn">进入房间</Button>
                                        </Card>
                                    </List.Item>
                                )}
                            />


                        </List.Item>

                    )}
                />
            </div>


        );
    }
}

export default Center;
