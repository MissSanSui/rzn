import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import AvatarList from '@/components/AvatarList';
import stylesProjects from './Chatroom.less';

@connect(({ list }) => ({
  list,
}))
class Center extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }
  render() {
    const {
      list: { list },
    } = this.props;
    return (
      <List
        className={stylesProjects.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={stylesProjects.card}
              hoverable
              cover={<img alt={item.room_introduce} src={item.room_background} />}
            >
              <Card.Meta title={<a>{item.room_introduce}</a>}/>
              <div className={stylesProjects.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                {/* <div className={stylesProjects.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map(member => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${member.id}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div> */}
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Center;
