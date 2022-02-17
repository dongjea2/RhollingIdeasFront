import styles from './UserInfo.module.css';

export default function UserInfo({userInfo}){

    const {  userPhoneNum,userId , userName} = userInfo;

    return(
        <>
<div className={styles.title}>
    <h3>후원자 정보</h3>
</div>
<div className={styles.boxform}>
        <div className={styles.boxItem}>연락처 : {userPhoneNum} </div>
        <div className={styles.boxItem}>이메일 : {userId} </div>
</div>
</>
    );
}
