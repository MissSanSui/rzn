import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { message, Icon } from 'antd';
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
    confirmDirty: false
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { password } = values
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'resetPassword/reset',
        payload: {
          password,
          type,
          userId: this.props.location.query.user_id
        },
      });
    }
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    if (value && this.state.confirmDirty) {
      this.resetForm.validateFields(['passwordSub'], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== this.resetForm.getFieldValue('password')) {
      callback(`${formatMessage({ id: 'app.result.error.nosame' })}`);
    } else {
      callback();
    }
  }

  renderMessage = content => {
    message.success(content);
  }

  render() {
    const { submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.resetForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'form.resetPassword' })}>
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'form.passwd' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
                {
                  validator: this.validateToNextPassword,
                }
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
                {
                  validator: this.compareToFirstPassword,
                }
              ]}
              onBlur={this.handleConfirmBlur}
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
