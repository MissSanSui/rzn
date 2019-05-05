import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import SelectLang from '@/components/SelectLang';
import styles from './Home.less';
import logo from '@/assets/logo.png';
import getPageTitle from '@/utils/getPageTitle';

const links =[]

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 河北万卷书教育科技有限公司
  </Fragment>
);

export default class Home extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    return (
        <div className={styles.container}>
          {/* <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>万卷书教育</span>
                </Link>
              </div>
              <div className={styles.desc}>万卷书是保定地区最有影响力的在线教育平台</div>
            </div>
            {children}
          </div> */}
          <div className={styles.pic}></div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
    );
  }
}

