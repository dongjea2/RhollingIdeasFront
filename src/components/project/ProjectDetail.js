import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from "react-router-dom";
import Content from './Content';
import Post from './Post';
import Rewardlist from './RewardList'
import axios from 'axios';

import './ProjectDetail.css'
import styled from 'styled-components';


export default function ProjectDetail() {
  const { prodNo } = useParams();
  const [postShow, setPostShow] = useState(false);

  function postView() {
    setPostShow(true);
  }

  function conView() {
    setPostShow(false);
  }
  function Postlook() {
    return <Post></Post>
  }

  function Info() {
    return <Content></Content>
  }


  const [info, setInfo] = useState('');
  const [plag,setPlag] = useState('');
        
      useEffect(() => {
        axios.get("/project/" + Number(prodNo))
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, [plag]);

       console.log(info);
  return (
    <>
      <div className="container">
        <div className="head">
          <div className="title">
            <div className="category">
              {info && info.category.categoryName}
            </div>
            <div className="longtitle">
              {info && info.longTitle}
            </div>
            <div className="creatoruser">
            <div>{info && info.maker.userName}</div>
            </div>
          </div>

          <div className="img">
            <div className="projectimg">
            <img src={require(`../../${info && info.projectImage}`)} alt={info}/>
            </div>
          </div>

          <div className="info">
            <div className="sumprice">
              모인금액<br />
              <h1>{info && info.projectChange.sumPrice.toLocaleString('ko-KR')}원</h1>
            </div>
            <div className="duedate">
              남은시간<br />
              <Price>{info.remainDayCnt > 0 ?  info.remainDayCnt+"일 남음": "프로젝트 종료"}</Price>
            </div>
            <div className="supportcnt">
              후원자수<br />
              <h1>{info && info.projectChange.supportCnt}명</h1>
            </div>
            <div className="ingbox">
              펀딩 진행중<br />
              <div className="tagetprice">
                목표금액 인{info && info.targetPrice.toLocaleString('ko-KR')} 원이 모여야 결제됩니다.
              </div>
              <div className="duedate">
                결제시작일은 {info && info.startDate.substring(0,10)}일 입니다.
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="bot">
          <div className="content">
            
            <div className="postcon">
              <div onClick={conView}></div>
              <button onClick={postView}> 커뮤니티 내용</button>
              <button onClick={conView}> 게시글 내용</button>
              {postShow ? <Postlook /> : <div>{info.projectContent}</div>}
            </div>
    

            <div className="reward">
            {info && info.reward.map((reward)=>
             <Link to={`/order/${reward.rewardNo}`}>
               <RewardBox key={reward.rewardNo}>
                <div style={{display:'none'}}>선물번호{reward.rewardNo}</div>
                <div>선물금액:{reward.rewardPrice}</div>
                <div>선물이름:{reward.rewardName}</div>
                <div>선물재고:{reward.rewardNum}</div>
               </RewardBox>
            </Link>
            )}
            </div>


          </div>
        </div>

      </div>
    
    </>

  );
}

const Price = styled.div`
font-size: 35px;
margin-bottom: 10px;
font-weight: 600;
`


const RewardBox= styled.div`

font-size:18px;
font-weight: 600;
	border-radius: 5px;
  border: 1px solid gray;
  padding: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
    
    transition-duration: 0.15s;
    &:hover{
      background-color: rgb(255,87,87);
    }
`
