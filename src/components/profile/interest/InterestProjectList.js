import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../Profile.module.css';
import SimpleModal from "../../modal/SimpleModal";

export default function InterestProjectList(){
    const [inters, setInterests] = useState([]);
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        axios.get("/interestlist")
        .then(res => setInterests(res.data))
        .catch(err => console.log(err));
    }, [cnt]);

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

    // //좋아요 누른 리스트
    // const interestList = inters.filter(function (inter){
    //     return inter.interestAlarm === "I";
    // });

    // //알림신청 리스트
    // const alarmList = inters.filter(function(alarm){
    //     return alarm.interestAlarm === "A";
    // })

    return(
        <section>
            <div className={styles.Header}>
                <div className={styles.HeaderH1}><h1>관심 프로젝트</h1></div>
                <div className={styles.HeaderSelect}>
                    <span className={styles.selectedSpan}>
                        <Link to="/interestlist" replace={true} className={styles.selectedA} style={{color: "black"}}>좋아한 {inters.iProject && inters.iProject.length}</Link>
                    </span>
                    <span>
                        <Link to="/prelaunchedlist" className={styles.notSelectedA} >알림신청 {inters.aProjectCnt}</Link>
                    </span>
                </div>
            </div>
            <div className={styles.selectContent}>
                
                {
                    inters.iProject && inters.iProject.length === 0 ?
                <div className={styles.noContent}>
                    <img src={require('../../../images/profile/empty heart.png')} alt="empty like project" />
                    <div>좋아한 프로젝트가 없습니다.</div>
                </div> :
                
                <div className={styles.Content}>
                {inters.iProject && inters.iProject.map((inter) => (
                    <div className={styles.item} key={inter.projectNo}>
                        <Link to={'/projectdetail/'+Number(inter.projectNo)}>
                        <img className={styles.itemImage} src={require(`../../../${inter.projectImage}`)} alt={inter.projectNo}/>
                        </Link>

                        {/*<button className={styles.like}></button>*/}
                        <button className={styles.like} onClick={(e) => handleDeleteLike(inter.projectNo, e)} disabled={buttonDisable}></button>

                        <div className={styles.info} style={{marginTop:'-25px'}}>

                            <div className={styles.catelink}>
                                <span className={styles.category}> {inter.categoryName} | {inter.userName} </span>
                            </div>

                            <Link to={'/projectdetail/'+Number(inter.projectNo)}>
                            <span className={styles.title}>{inter.longTitle}</span> 
                            </Link>
                            <span className={styles.brief}>{inter.projectBrief}</span>
                            <div className={styles.priceAndPercent}>
                                <span className={styles.percent}>{inter.achiveRate}%</span>
                                <span className={styles.sumPrice}>{inter.sumPrice.toLocaleString('ko-KR')}원</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                }
            </div>
            {/*좋아요 취소시 안내 모달*/}
            {
                modalVisible && 
                <SimpleModal visible={modalVisible} closable={true} maskClosable={false} onClose={closeModal}>
                
                <div>취소되었습니다.</div>
                </SimpleModal>
            }
        </section>
    )
}