import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Profile.module.css';

export default function Profile(){
    const {userUrl} = useParams();
    const [user, setUser] = useState('');
    const [cnt, setCnt] = useState(0);
    const userNo = window.sessionStorage.getItem('userNo');
    const [profileShow, setProfileShow] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        axios.get("/profile/"+ userUrl)
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

    const followClick = (follow) => {
        axios.post('/editfollow',
            {
                userNo: {userNo:userNo},
                follow: {userNo:follow}
            }
        ).then(function (response) {
            console.log(response);
            setCnt(cnt + 1);
        })
        .catch(function (error) {
            alert("로그인이 필요한 서비스입니다.");
            window.location.replace("/login");
        });
    }

    return(
        <section>
            <div className={styles.Header}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileContainerCon}>
                        <div className={styles.profileImg}><img src={require(`../../${user && user.userImage}`)} alt='img'/></div>
                        <div className={styles.userName}>
                            {user.userName}
                            {
                                user.userNo === Number(userNo) &&
                                <Link to={'/profile/accountset'}>
                                    <img src={require('../../images/profile/setting.png')} alt="profileSetting" />
                                </Link>
                            }
                        </div>
                    </div>
                    <div className={styles.followButtonContainer}>
                        {
                            user.userNo === Number(userNo) ?
                            <div></div> :
                            user.followCheck === true ?
                            <button className="following-button" onClick={(e)=>followClick(user.userNo, e)}>
                                <img src={require("../../images/profile/check1.png")} alt="followButtonCheckImg" />
                                <span>팔로잉</span>
                            </button> :
                            <button className="follow-button" onClick={(e)=>followClick(user.userNo, e)}>
                                <span>+ 팔로우</span>
                            </button>
                        }
                    </div>
                </div>
                <div className={styles.HeaderSelect}>
                    <span className="selected-span">
                        {/* <div onClick={introShow} className={isSelected? styles.selectedA : styles.notSelectedA}>소개</div> */}
                        <Link to={"/profile/" + user.userUrl} className={styles.selectedA}>소개</Link>
                    </span>
                    {user.userNo === Number(userNo) &&
                    <span>
                        {/* <div onClick={orderShow} className={isSelected? styles.selectedA : styles.notSelectedA}>후원한 프로젝트 {user.orderProjectCnt}</div> */}
                        <Link to={"/profile/" + user.userUrl +"/order"} className={styles.notSelectedA}>후원한 프로젝트 {user.orderProjectCnt}</Link>
                    </span>
                    }
                    <span>
                        <Link to={"/profile/" + user.userUrl +"/created"} className={styles.notSelectedA}>올린 프로젝트 {user.createdProjectCnt}</Link>
                    </span>
                    <span>
                        <Link to={"/profile/" + user.userUrl +"/follower"} className={styles.notSelectedA}>팔로워 {user.followerCnt}</Link>
                    </span>
                    <span>
                        <Link to={"/profile/" + user.userUrl +"/following"} className={styles.notSelectedA}>팔로잉 {user.followingCnt}</Link>
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