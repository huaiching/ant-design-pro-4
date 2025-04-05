import { Avatar, Spin } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: { key: React.Key; keyPath: React.Key[]; item: React.ReactInstance }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
    } = this.props;
    return currentUser && currentUser.name ? (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
