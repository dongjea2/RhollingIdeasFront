import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';


export default function Post() {    
    const { prodNo } = useParams();
   
    const postInfo = {
        userNo:'',
        postNo:'',
        postCon:'',
        postDate:''
    } 

    const [post, setPost] = useState(postInfo);

    
    const handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    const submitClick = () => {
        console.log(post);
        this.setState({
            userNo:'',
            postNo:'',
            postCon:'',
            postDate:''
        });
      };

      let userid = window.localStorage.getItem('userid');


        return ( 
        <>
            <div>
             프로젝트 {prodNo}의 커뮤니티
                <div style={{display:'none'}}>게시글번호{postInfo.postNo}</div>
                <div>유저이름{postInfo.userNo}</div>
                <div>게시글내용{postInfo.postCon}</div>
                <div className='postWrite' > 
                    입력<input type={"text"} placeholder={"커뮤니티 게시글 작성"} defaultValue={post.postCon} onClick={handleChange}></input> 
                    <button type='submit' onClick={submitClick}>작성</button>
                </div>
            </div>
                <Comments></Comments>
        </> 
        );
}
