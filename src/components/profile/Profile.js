import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './Profile.module.css'

export default function Profile(){
    const {userUrl} = useParams();
    const [user, setUser] = useState('');
    const userId = window.localStorage.getItem('userId');
    useEffect(() => {
        axios.get("/profile/"+ Number(userUrl))
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, []);
    console.log(user);
    return(
        <section>
            <div className={styles.interestHeader}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileImg}><img src={require(`../../${user && user.userImage}`)} alt='img'/></div>
                    <div className={styles.userName}>
                        {user && user.userName}
                        <Link to={'/profile/accountset'}>
                            <img src={require('../../images/profile/setting.png')} alt="profileSetting" />
                        </Link>
                    </div>
                </div>
                <div className={styles.interestSelect}>
                    <span className="selected-span">
                        <Link to="/profile/" className={styles.selectedA} style={{color: "black"}}>소개</Link>
                    </span>
                    {user.userId === userId &&
                    <span>
                        <Link to="/" className={styles.notSelectedA}>후원한 프로젝트</Link>
                    </span>
                    }
                    <span>
                        <Link to="/" className={styles.notSelectedA}>올린 프로젝트</Link>
                    </span>
                    <span>
                        <Link to="/" className={styles.notSelectedA}>팔로워</Link>
                    </span>
                    <span>
                        <Link to="/" className={styles.notSelectedA}>팔로잉</Link>
                    </span>
                </div>
            </div>
            <div className={styles.introduceContent}>
                <div className={styles.introduce}>
                    {!user.userIntroduction ?
                        <div className={styles.noIntro}>등록된 소개가 없습니다.</div> :
                        <div className={styles.intro}>{user.userIntroduction}</div>
                    }
                </div>
            </div>
        </section>
    )
}