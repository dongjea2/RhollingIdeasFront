import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SimpleModal from '../modal/SimpleModal';
import styles from './ProjectMini.module.css';
import heartImg from '../../images/mainpage/heart2.png';
import emptyHeartImg from '../../images/mainpage/heart.png';

export default function ProjectCarecel({ project }) {

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
         .catch(err => alert("로그인하세요"));

  }

  //b.좋아요 등록
  const handleAddLike= () => {
    axios.post('/interest', {
      "likeProject": { "projectNo" : project.projectNo},
      //임시로 만든 유저번호
      "likeUser" :{ "userNo" : window.sessionStorage.getItem("userNo")} })
        .then( res=>setIsLike(true))
        .then(res=>setModalVisible(true))
        .then(setButtonDisable(true),
                //하트버튼 1.5초 뒤에 눌리게 설정(서버 과부화 방지)
                setTimeout(()=>{ setButtonDisable(false); setModalVisible(false); }, 1000))
         .catch(err => alert("로그인하세요"));
  }

  return (
    <>
    <Link to={'/projectdetail/'+Number( project && project.projectNo)}>
      <img src ={require(`../../${ project && project.projectImage }`)} className={styles.itemImage}  alt={project && project.projectNo}/>
    </Link>

    {isLike === true ? 
        <HeartBtn onClick={handleDeleteLike} disabled={buttonDisable}/> 
        :
        <EmptyHeartBtn onClick={handleAddLike} disabled={buttonDisable}/>
    }

    <div className={styles.info}>

        <div className={styles.catelink}>
            <Link to={'/discover?category='+Number( project && project.category.categoryNo)}>
            <span className={styles.category}> {project && project.category.categoryName} </span>
            </Link>
            <span className={styles.category}>|</span>
            <span className={styles.company}> {project && project.maker.userName} </span>
        </div>

        <Link to={'/projectdetail/'+Number(project && project.projectNo)}>
        <span className={styles.title}>{project && project.longTitle}</span> 
        </Link>
        <div className={styles.priceAndPercent}>
            <span className={styles.percent}>{project && project.achiveRate}% 달성</span>
        </div>
    </div>

        {/*좋아요 수정시 안내 모달*/}
        {
            modalVisible && 
            <SimpleModal visible={modalVisible} closable={true} maskClosable={false} onClose={closeModal}>
              
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

`

const EmptyHeartBtn= styled.button`
    position: relative;
    top: -259px;
    left: 313px;
    width: 30px;
    height: 30px;
    background: url(${emptyHeartImg}) center center / 100% no-repeat;

    `
const HeartBtn= styled.button`
    position: relative;
    top: -259px;
    left: 313px;
    width: 30px;
    height: 30px;
    background: url(${heartImg}) center center / 100% no-repeat; 
`