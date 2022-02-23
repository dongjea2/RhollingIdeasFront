import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';


export default function Post() {    
    const { prodNo } = useParams(); 

    const [post, setPost] = useState(postInfo);
    
    const usernoRef = useRef(null);
    const postnoRef = useRef(null);
    const postconRef = useRef(null);
    const postdateRef = useRef(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let user = usernoRef.current.value;
        let post = postnoRef.current.value;
        let postcon = postconRef.current.value;
        let post = postdateRef.current.value;

            fetch(`url 넣어야 됨`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : name,
                    id : id,
                    pwd : pwd
                })
            })
          }



    const submitClick = async (e) => {
        console.log(post);
        this.setState({
            userNo:'',
            postNo:'',
            postCon:'',
            postDate:''
        });
      };

      let userid = window.localStorage.getItem('userid');

      const [info, setInfo] = useState([]);

      useEffect(() => {
        axios.get("/projectdetail/post/1")
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, []);

        return ( 
        <>
            <div>
             프로젝트 {prodNo}의 커뮤니티
             {info.map((post)=>
             <div key={post.postNo}>
                <div style={{display:'none'}}>게시글번호{post.prodNo}json데이터 테스트입니다
                {postInfo.postNo}</div>
                <div>유저이름:{post.maker.userNo}</div>
                <div>게시글내용:{post.postContent}</div>
                <div className='postWrite' > 
                    입력<input type={"text"} placeholder={"커뮤니티 게시글 작성"} defaultValue={post.postCon} onClick={handleChange}></input> 
                    <button type='submit' onClick={submitClick}>작성</button>
                </div>
                </div >
              )}
            </div>
                <Comments></Comments>
        </> 
        );
}
