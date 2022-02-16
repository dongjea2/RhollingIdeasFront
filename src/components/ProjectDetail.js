import React from 'react';
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';


export default function ProjectDetail() {

    const { prodNo } = useParams();
    console.log({prodNo});

  return (
      <>
        <h1>프로젝트 {prodNo}의 상세 페이지</h1>

        <Link to={'/projectdetail/' + Number(prodNo)} >
          <button>커뮤니티 내용</button>
        </Link>
      </>

  );
}