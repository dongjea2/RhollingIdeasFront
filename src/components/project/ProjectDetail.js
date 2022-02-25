import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from "react-router-dom";
import Content from './Content';
import Post from './Post';
import Rewardlist from './RewardList'
import axios from 'axios';

import './ProjectDetail.css'


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
              <h1>{info && info.endDate.substring(0,10)}</h1>
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
              <div onClick={conView}>게시글내용 div</div>
              <button onClick={postView}> 커뮤니티 내용</button>
              <button onClick={conView}> 게시글 내용</button>
              {postShow ? <Postlook /> : <Info />}
            </div>
    

            <div className="reward">
              {/* <Rewardlist></Rewardlist> */}
              <Link to="/order/1"> <div>선물부분</div></Link>
            </div>


          </div>
        </div>

      </div>
    
    </>

  );
}