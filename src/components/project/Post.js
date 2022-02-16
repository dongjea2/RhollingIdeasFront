import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';

const Community = () =>{
    const [info, setInfo] = useState();

}




export default function Post() {

    const { prodNo } = useParams();
   
        return ( 
        <>
            <div>
             프로젝트 {prodNo}의 커뮤니티
                <div>게시글번호</div>
                <div>게시글내용</div>
                <div> 
                    입력<input type={"text"} placeholder={"커뮤니티 게시글 작성"}></input> 
                </div>
                <button>작성</button>
            </div>
                <Comments></Comments>
        </> 
        );
}
