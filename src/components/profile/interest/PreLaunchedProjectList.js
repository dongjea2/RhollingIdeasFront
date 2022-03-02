import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleModal from "../../modal/SimpleModal";
import styles from '../Profile.module.css';

export default function PreLaunchedProjectList(){
    const [alarms, setAlarms] = useState([]);
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        axios.get("/prelaunchedlist")
        .then(res => setAlarms(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

    //알림신청 버튼
    const [buttonDisable , setButtonDisable] = useState(false);
    //알림신청 변경 안내 모달
    const [modalVisible, setModalVisible] = useState(false)
    const closeModal = () => { setModalVisible(false) }

    //a.알림신청 해제
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
                        <Link to="/interestlist" replace={true} className={styles.notSelectedA}>좋아한 {alarms.iProjectCnt}</Link>
                    </span>
                    <span className={styles.selectedSpan}>
                        <Link to="/prelaunchedlist" replace={true} className={styles.selectedA} style={{color: "black"}}>알림신청 {alarms.aProject && alarms.aProject.length}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.selectContent}>
                {
                    alarms.aProject && alarms.aProject.length === 0 ?
                <div className={styles.noContent}>
                    <img src={require('../../../images/profile/empty alarm.png')} alt="no_like_project" />
                    <div>알림신청한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.Content}>
                {alarms.aProject && alarms.aProject.map((alarm) => (
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
            {/*알림신청 취소시 안내 모달*/}
            {
                modalVisible && 
                <SimpleModal visible={modalVisible} closable={true} maskClosable={false} onClose={closeModal}>
                
                <div>취소되었습니다.</div>
                </SimpleModal>
            }
        </section>
    )
}