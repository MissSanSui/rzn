import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '万卷书教育 首页',
          title: '万卷书教育 首页',
          href: 'wjspt.com',
          blankTarget: true,
        }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 河北万卷书教育科技有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
