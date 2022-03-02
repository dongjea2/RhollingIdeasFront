import styles from './Project.module.css';
import leftDayImg from '../../images/mainpage/time.PNG'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import SimpleModal from '../modal/SimpleModal';
import heartImg from '../../images/mainpage/heart2.png';
import emptyHeartImg from '../../images/mainpage/heart.png';

export default function Project({ project }) {

    //좋아요 버튼
    const [isLike ,setIsLike ] = useState(project && project.loginedUserProjectInterest);
    const [buttonDisable , setButtonDisable] = useState(false);
    //좋아요 변경 안내 모달
    const [modalVisible, setModalVisible] = useState(false)
    const closeModal = () => { setModalVisible(false) }

    //a.좋아요 해제
    const handleDeleteLike= () => {
      axios.delete('/interest', { 
        data :{
        "likeProject": { "projectNo" : project.projectNo},
        //임시로 만든 유저
        "likeUser" :{ "userNo" : window.sessionStorage.getItem("userNo")}
        }, })
          .then( res=>setIsLike(false))
          .then(res=>setModalVisible(true))
          .then(setButtonDisable(true),
                  //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                  setTimeout(()=>{ setButtonDisable(false); setModalVisible(false); }, 1000))
          .catch(err => alert("로그인 하세요"));

    }

    //b.좋아요 등록
    const handleAddLike= () => {
      axios.post('/interest', {
        "likeProject": { "projectNo" : project.projectNo},
        //임시로 만든 유저번호
        "likeUser" :{ "userNo" : 1} })
          .then( res=>setIsLike(true))
          .then(res=>setModalVisible(true))
          .then(setButtonDisable(true),
                  //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                  setTimeout(()=>{ setButtonDisable(false); setModalVisible(false); }, 1000))
          .catch(err => alert("로그인하세요"));
    }



  return (
    <>
        <Link to={'/projectdetail/'+Number( project.projectNo)}>
          <img src ={require(`../../${ project.projectImage}`)} className={styles.itemImage}  alt={ project.projectNo}/>
        </Link>

        {isLike === true ? 
          <button className={styles.like} onClick={handleDeleteLike} disabled={buttonDisable}/> 
          :
          <button className={styles.notLike} onClick={handleAddLike} disabled={buttonDisable}/>
        }
        <div className={styles.info}>
            <Link to={'/projectdetail/'+Number( project.projectNo)}>
            <span className={styles.title}>{ project.longTitle}</span> 
            </Link>
            <div className={styles.catelink}>
              <span className={styles.category}> { project.category.categoryName} </span>
              <span className={styles.category}>|</span>
              <span className={styles.company}> { project.maker.userName} </span>
            </div>

            <span className={styles.iteminfo}>{ project.projectBrief}</span>

            <div className={styles.priceAndPercent}>
                      <span className={styles.price}>{Number( project.projectChange.sumPrice).toLocaleString('ko-KR')}원</span>
                      <span className={styles.percent}>{ project.achiveRate}%</span>
                      <span className={styles.leftDay}> <img src={leftDayImg}/> {project.remainDayCnt>0 ?project.remainDayCnt+"일 남음" :"종료"} </span>
            </div>
         </div>

        {/*좋아요 수정시 안내 모달*/}
        {
            modalVisible && <SimpleModal visible={modalVisible} closable={true} maskClosable={false} onClose={closeModal}>
              {isLike === true ?  <Heart/>: <EmptyHeart/> }
            </SimpleModal>
        }
    </>
  );
}

const Heart= styled.button`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  background: url(${heartImg}) center center / 100% no-repeat;

`

const EmptyHeart= styled.button`
 position: relative;
  top: 0px;
 left: 0px;

 width: 100px;
 height: 100px;
background: url(${emptyHeartImg}) center center / 100% no-repeat;
 animation-duration: 0.25s;

`