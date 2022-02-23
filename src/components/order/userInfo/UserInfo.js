import styles from './UserInfo.module.css';

export default function UserInfo({project}){


    return(
        <>
        <div className={styles.title}>
        <h3>후원자 정보</h3>
        </div>
        <div className={styles.boxForm}>
            <div className={styles.boxItem}>연락처 : {project&& project.maker.userPhone} </div>
            <div className={styles.boxItem}>이메일 : {project&& project.maker.userId} </div>
        </div>
</>
    );
}
