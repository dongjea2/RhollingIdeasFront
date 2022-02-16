import {useParams} from "react-router-dom";
import React, { useState } from 'react';
import Post from "./Post";

export default function ProjectDetail() {

    const { prodNo } = useParams();
    console.log({prodNo});

    // const [post, setPost] = useState("content");
    function postClick(){
      console.log('click post');
    }

  return (
      <>
        <h1>프로젝트 {prodNo}의 상세 페이지</h1>
        <button onClick={postClick}>커뮤니티 보기</button>
        <Link to="/post/:projectNo">
          <button>post</button>
        </Link>
      </>

  );
}