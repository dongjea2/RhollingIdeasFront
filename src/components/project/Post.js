import axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';
import './Post.css'

export default function Post() {    
    const { prodNo } = useParams(); 

    const [post, setPost] = useState('');

    const usernoRef = useRef(null);
    const postconRef = useRef(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let userno = usernoRef.current.value;
        let postcon = postconRef.current.value;

        let data = {
          project: {projectNo: prodNo},
          maker: {userNo: userno},
          postContent: postcon
        }

        console.log(data);

        axios.post("/projectdetail/post",  JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        }).then((res) => {
          console.log(res);
          setPlag(plag + 1);
        }).catch(err => console.log(err));
        
      }
      


      const [info, setInfo] = useState([]);
      const [plag,setPlag] = useState('');
        
      useEffect(() => {
        axios.get("/projectdetail/post/" + Number(prodNo))
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, [plag]);

        return ( 
        <>
        <h3>프로젝트 {prodNo}의 커뮤니티</h3>
            <form className='postinput'>
            {window.sessionStorage.getItem("userName")} 
            <div style={{display:'none'}}ref={usernoRef}>{window.sessionStorage.getItem("userNo")}</div> 
              <input className='postinput_text' type="text"ref={postconRef} placeholder="커뮤니티 게시글 작성" />
              <button onClick={handleSubmit}>작성</button>
            </form>
            <div>
             
             {info.map((post)=>
             <div className='postdetail' key={post.postNo}>
                
                <div>유저이름:{post.maker.userName}</div>
                <div>게시글내용:{post.postContent}</div>
                </div >
              )}
            </div>
        </> 
        );
}

