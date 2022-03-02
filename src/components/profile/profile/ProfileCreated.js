import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from '../Profile.module.css';

export default function ProfileCreated() {
    const {userUrl} = useParams();
    const [user, setUser] = useState('');
    const [cnt, setCnt] = useState(0);
    const userNo = window.sessionStorage.getItem('userNo');
    
    useEffect(() => {
        axios.get("/profile/" + userUrl + "/created")
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

    //좋아요 버튼
    const [buttonDisable , setButtonDisable] = useState(false);

    //a.좋아요 해제
    const handleDeleteLike= (projectNo) => {
      axios.delete('/interest', { 
        data :{
        "likeProject": { "projectNo" : projectNo},
        //임시로 만든 유저
        "likeUser" :{ "userNo" : window.sessionStorage.getItem("userNo")}
        }, }
        ).then(function(response){
            console.log(response);
            setCnt(cnt + 1);
        })
        .then(setButtonDisable(true),
                  //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                  setTimeout(()=>{ setButtonDisable(false); }, 1000))
        .catch(err => alert("로그인 하세요"));
    }
    //b.좋아요 등록
    const handleAddLike= (projectNo) => {
        axios.post('/interest', {
          "likeProject": { "projectNo" : projectNo},
          //임시로 만든 유저번호
          "likeUser" :{ "userNo" : 1} })
            .then(function(response){
                console.log(response);
                setCnt(cnt + 1);
            })
            .then(setButtonDisable(true),
                    //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                    setTimeout(()=>{ setButtonDisable(false);}, 1000))
            .catch(err => alert("로그인하세요"));
      }

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
                    <span className="selected-span">
                        <Link to={"/profile/" + userUrl +"/created"} className={styles.selectedA}>올린 프로젝트 {user.createdProjectCnt}</Link>
                    </span>
                    <span>
                        <Link to={"/profile/" + userUrl +"/follower"} className={styles.notSelectedA}>팔로워 {user.followerCnt}</Link>
                    </span>
                    <span>
                        <Link to={"/profile/" + userUrl +"/following"} className={styles.notSelectedA}>팔로잉 {user.followingCnt}</Link>
                    </span>
                </div>
            </div>
            <div>
                <div className={styles.orderCnt}>
                    <span>{user.projects && user.projects.length}</span>개의 프로젝트가 있습니다.
                </div>
                {
                    user.projects && user.projects.length === 0 ?
                    <div className={styles.noContent}>
                        <img src={require('../../../images/profile/empty present.png')} alt="no_following"/>
                        <div>올린 프로젝트가 없습니다.</div>
                    </div> :
                    <div className={styles.Content}>
                    {user.projects && user.projects.map((order) => (
                        <div className={styles.item} key={order.projectNo}>
                            <Link to={'/projectdetail/'+Number(order.projectNo)}>
                            <img className={styles.itemImage} src={require(`../../../${order.projectImage}`)} alt={order.projectNo}/>
                            </Link>

                            {order.checkLike === true ? 
                            <button className={styles.like} onClick={(e) => handleDeleteLike(order.projectNo, e)} disabled={buttonDisable}/> 
                            :
                            <button className={styles.notLike} onClick={(e) => handleAddLike(order.projectNo, e)} disabled={buttonDisable}/>
                            }
                            <div className={styles.info} style={{marginTop:'-25px'}}>

                                <div className={styles.catelink}>
                                    <span className={styles.category}> {order.categoryName} | {order.makerName} </span>
                                </div>

                                <Link to={'/projectdetail/'+Number(order.projectNo)}>
                                <span className={styles.title}>{order.longTitle}</span> 
                                </Link>
                                <span className={styles.brief}>{order.projectBrief}</span>
                                <div className={styles.priceAndPercent}>
                                    <span className={styles.percent}>{order.achiveRate}%</span>
                                    <span className={styles.sumPrice}>{order.sumPrice.toLocaleString('ko-KR')}원</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                }
            </div>
        </section>
    )
}