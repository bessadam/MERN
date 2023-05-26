import React from 'react';
import styles from './UserInfo.module.scss';
// redux
import { useSelector } from 'react-redux';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const name = useSelector(state => state.auth.name);

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={"https://mui.com/static/images/avatar/5.jpg"} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
