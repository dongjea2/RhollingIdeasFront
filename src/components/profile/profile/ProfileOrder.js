import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleModal from "../../modal/SimpleModal";
import styles from '../Profile.module.css';

export default function ProfileOrder() {
    const [isLike ,setIsLike ] = useState(false);
    const [user, setUser] = useState('');
    const [cnt, setCnt] = useState(0);
    const userNo = window.sessionStorage.getItem('userNo');
    const userUrl = window.sessionStorage.getItem('userUrl');

    useEffect(() => {
        axios.get("/profile/order")
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, [cnt]);
    console.log(user)

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
                </div>
                <div className={styles.HeaderSelect}>
                    <span>
                        <Link to={"/profile/" + userUrl} className={styles.notSelectedA}>소개</Link>
                    </span>
                    {user.userNo === Number(userNo) &&
                    <span className="selected-span">
                        <Link to={"/profile/" + userUrl +"/order"} className={styles.selectedA}>후원한 프로젝트 {user.orders && user.orders.length}</Link>
                    </span>
                    }
                    <span>
                        <Link to={"/profile/" + userUrl +"/created"} className={styles.notSelectedA}>올린 프로젝트 {user.createdProjectCnt}</Link>
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
                    <span>{user.orders && user.orders.length}</span>개의 프로젝트가 있습니다.
                </div>
                <div className={styles.Content}>
                {user.orders && user.orders.map((order) => (
                    <div className={styles.item} key={order.orderNo}>
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
                                <span className={styles.category}> {order.categoryName} | {order.userName} </span>
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
            </div>
        </section>
    )
}