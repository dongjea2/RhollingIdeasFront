import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from '../Profile.module.css';

export default function PreLaunchedProjectList(){
    const location = useLocation();
    const alarms = location.state.alarms;
    const intersLength = location.state.intersLength;
    const [cnt, setCnt] = useState(0);

    //좋아요 버튼
    const [buttonDisable , setButtonDisable] = useState(false);
    //좋아요 변경 안내 모달
    const [modalVisible, setModalVisible] = useState(false)
    const closeModal = () => { setModalVisible(false) }

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
        .then(res=>setModalVisible(true))
        .then(setButtonDisable(true),
                  //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                  setTimeout(()=>{ setButtonDisable(false); setModalVisible(false); }, 1000))
        .catch(err => alert("로그인 하세요"));

    }

    return(
        <section>
            <div className={styles.Header}>
                <div className={styles.HeaderH1}><h1>관심 프로젝트</h1></div>
                <div className={styles.HeaderSelect}>
                    <span>
                        <Link to="/interestlist" replace={true} className={styles.notSelectedA}>좋아한 {intersLength}</Link>
                    </span>
                    <span className={styles.selectedSpan}>
                        <Link to="/prelaunchedlist" state={{alarms: alarms, intersLength: intersLength}} replace={true} className={styles.selectedA} style={{color: "black"}}>알림신청 {alarms.length}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.selectContent}>
                {
                    alarms.length === 0 ?
                <div className={styles.noContent}>
                    <img src={require('../../../images/profile/empty alarm.png')} alt="no_like_project" />
                    <div>알림신청한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.Content}>
                {alarms.map((alarm) => (
                    <div className={styles.item} key={alarm.projectNo}>
                        <Link to={'/projectdetail/'+Number(alarm.projectNo)}>
                            <img className={styles.itemImage} src={require(`../../../${alarm.projectImage}`)} alt={alarm.projectNo}/>
                        </Link>

                        <div className={styles.info}>

                            <div className={styles.catelink}>
                                <span className={styles.category}> {alarm.categoryName} | {alarm.userName} </span>
                            </div>

                            <Link to={'/projectdetail/'+Number(alarm.projectNo)}>
                            <span className={styles.title}>{alarm.longTitle}</span> 
                            </Link>
                            <span className={styles.brief}>{alarm.projectBrief}</span>
                        </div>
                        <div className={styles.alarmButtonWrap}>
                            <button className={styles.alarmButton} onClick={(e) => handleDeleteLike(alarm.projectNo, e)} disabled={buttonDisable}>알림신청 중</button>
                        </div>
                    </div>
                ))}
                </div>
                }
            </div>
        </section>
    )
}