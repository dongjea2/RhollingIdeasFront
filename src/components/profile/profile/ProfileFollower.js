import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../Profile.module.css'

export default function ProfileFollower(){
    const {userUrl} = useParams();
    const [user, setUser] = useState('');
    const [cnt, setCnt] = useState(0);
    const userNo = window.sessionStorage.getItem('userNo');

    useEffect(() => {
        axios.get("/profile/"+ userUrl + "/follower")
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
                        <div className={styles.profileImg}><img src={require(`../../../${user && user.userImage}`)} alt='img'/></div>
                        <div className={styles.userName}>
                            {user.userName}
                            {
                                user.userNo === Number(userNo) &&
                                <Link to={'/profile/accountset'}>
                                    <img src={require('../../../images/profile/setting.png')} alt="profileSetting" />
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
                                <img src={require("../../../images/profile/check1.png")} alt="followButtonCheckImg" />
                                <span>팔로잉</span>
                            </button> :
                            <button className="follow-button" onClick={(e)=>followClick(user.userNo, e)}>
                                <span>+ 팔로우</span>
                            </button>
                        }
                    </div>
                </div>
                <div className={styles.HeaderSelect}>
                    <span>
                        <Link to={"/profile/" + userUrl} className={styles.notSelectedA}>소개</Link>
                    </span>
                    {user.userNo === Number(userNo) &&
                    <span>
                        <Link to={"/profile/" + userUrl +"/order"} className={styles.notSelectedA}>후원한 프로젝트 {user.orderProjectCnt}</Link>
                    </span>
                    }
                    <span>
                        <Link to={"/profile/" + userUrl +"/created"} className={styles.notSelectedA}>올린 프로젝트 {user.createdProjectCnt}</Link>
                    </span>
                    <span className="selected-span">
                        <Link to={"/profile/" + userUrl +"/follower"} className={styles.selectedA}>팔로워 {user.followerCnt}</Link>
                    </span>
                    <span>
                        <Link to={"/profile/" + userUrl +"/following"} className={styles.notSelectedA}>팔로잉 {user.followingCnt}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.introduceContent}>
                {
                    user.follows && user.follows.length === 0 ? 
                    <div className="no-content">
                        <img src={require('../../../images/profile/default.png')} alt="no_folloing"/>
                        <div>팔로워가 없습니다.</div>
                    </div> :
                    <div className="follow-list-wrapper">
                    <div className="follow-list">
                        {user.follows && user.follows.map((user) => 
                            <div className="follow-item" key={user.userNo}>
                                <div className="follow-user-img">
                                    <img src={require(`../../../${user.userImage}`)} alt="user_img" />
                                </div>
                                <div className="follow-item-content">
                                    <div className="follow-item-descption">
                                        <div className="follow-user-name">
                                            <Link to={"/profile/" + user.userUrl}>{user.userName}</Link>
                                        </div>
                                        <div className="follow-user-intro">
                                            {user.userIntroduction}
                                        </div>
                                        <div className="follow-status">
                                            팔로워 {user.followerCnt} · 올린 프로젝트 {user.createdCnt}
                                        </div>
                                    </div>
                                    <div className="follow-button-content">
                                    {
                                        user.followCheck === true ?
                                        <button className="following-button" onClick={(e)=>followClick(user.userNo, e)}>
                                            <img src={require("../../../images/profile/check1.png")} alt="followButtonCheckImg" />
                                            <span>팔로잉</span>
                                        </button> :
                                        user.userNo === Number(userNo) ?
                                        <div></div> :
                                        <button className="follow-button" onClick={(e)=>followClick(user.userNo, e)}>
                                            <span>+ 팔로우</span>
                                        </button>
                                    }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                }
            </div>
        </section>
    )
}