import React, { useState } from 'react';
import {Link, Route, Routes, useParams} from "react-router-dom";
import Content from './Content';
import Post from './Post';
import { useNavigate } from 'react-router-dom';


export default function ProjectDetail() {
    const { prodNo } = useParams();
    const [postShow, setPostShow] = useState(false);

    function postView() {
      setPostShow(true);
    }

    function conView(){
      setPostShow(false);
    }


    function Postlook(){
      return <Post></Post>
    }

    function Info(){
      return <Content></Content>
    }
 
  return (
      <>
        <h1>프로젝트 {prodNo}의 상세 페이지</h1>
        
  <div class="container">
	<div class="head">
		<div class="title">
			<div class="category">
			카테고리
			</div>
			<div class="longtitle">
		  긴제목
    			</div>
			<div class="creatoruser">
		 님의 프로젝트
		</div>
		</div>

		<div class="img">
			<div class="projectimg">
        프로젝트이미지부분
			</div>
		</div>
	
		<div class="info">
			<div class="sumprice">
			모인금액<br/>
			<h1>100원</h1>
			</div>
			<div class="duedate">
			남은시간<br/>
			<h1></h1>
			</div>
			<div class="supportcnt">
			후원자수<br/>
			<h1>명</h1>
			</div>
			<div class="ingbox">
			펀딩 진행중<br/>
				<div class="tagetprice">
				목표금액 인 원이 모여야 결제됩니다.
				</div>
				<div class="duedate">
				결제시작일은 일 입니다.
				</div>
			</div>
			</div>
	</div>
	<hr/>
	<div class="bot">
	<div class="content">

	<div class="postcon">
  <button onClick={postView}> 커뮤니티 내용</button>
          <button onClick={conView}>게시글 내용</button>
          {postShow? <Postlook/>:<Info/>}

	</div>

<div class="reward">
		
		</div>


	</div>
</div>

    </div>
      </>
    
  );
}