import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './Profile.module.css'

export default function Profile(){
    const userUrl = 1;
    const [user, setUser] = useState('');
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
                    <div className={styles.userName}><h1>{user && user.userName}</h1></div>
                </div>
                <div className={styles.interestSelect}>
                    <span className="selected-span">
                        <Link to="/profile/1" className={styles.selectedA} style={{color: "black"}}>소개</Link>
                    </span>
                    <span>
                        <Link to="/" className={styles.notSelectedA}>후원한 프로젝트</Link>
                    </span>
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
        </section>
    )
}