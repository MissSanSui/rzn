import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, Password, Submit } = Login;

@connect(({ resetPassword, loading }) => ({
  resetPassword,
  submitting: loading.effects['resetPassword/reset'],
}))
class ForgotPassword extends Component {
  state = {
    type: 'account',
    id: ''
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'resetPassword/reset',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'form.resetPassword' })}>
            {/* { !submitting && this.renderMessage(formatMessage({ id: 'app.result.error.title' })) } */}
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'form.passwd' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
            />
            <Password
              name="passwordSub"
              placeholder={`${formatMessage({ id: 'form.passwdSub' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.passwdSub.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Submit loading={submitting}>
            <FormattedMessage id="form.submit" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default ForgotPassword;
