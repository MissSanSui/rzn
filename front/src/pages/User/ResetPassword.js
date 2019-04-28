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
class ResetPassword extends Component {
  state = {
    type: 'account',
    same: true
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { password, passwordSub } = values
    if (!err) {
      const { dispatch } = this.props;
      if (password !== passwordSub) {
        this.setState({
          same: false
        })
        return
      }
      dispatch({
        type: 'resetPassword/reset',
        payload: {
          password,
          type,
          user_Id: this.props.location.query.user_id
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { resetPassword, submitting } = this.props;
    const { type, same } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          onChange={}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'form.resetPassword' })}>
            {resetPassword.status === 'error' && 
              !submitting && this.renderMessage(formatMessage({ id: 'app.result.error.title' })) }
            {!same && this.renderMessage(formatMessage({ id: 'app.result.error.nosame' }))}
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
                }
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

export default ResetPassword;
