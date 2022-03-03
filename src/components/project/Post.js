import axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

            <form>
              <Flex>

              <PostInput ref={postconRef} placeholder="댓글을 입력하세요" />
              <div style={{display:'none'}}ref={usernoRef}>{window.sessionStorage.getItem("userNo")}</div> 
              <AddButton onClick={handleSubmit}>작성</AddButton>
              </Flex>
            </form>
            <div>
             프로젝트 커뮤니티
             {info.map((post)=>
             <PostBox key={post.postNo}>

               <PostOwner> {post.maker.userName} </PostOwner>
                <PostContent>{post.postContent}</PostContent>
             </PostBox>
              )}
            </div>
        </> 
        );
}

const Flex= styled.div`
display:flex;
margin-bottom:70px;
margin-top:50px;
`

const PostBox = styled.div`
    border: 1px solid darkgrey;
    border-radius: 4px;
    max-width: 530px;
    margin-top: 5px;
    margin-bottom: 15px;
`
const PostOwner= styled.div`
    font-size: 15px;
    height:25px;
    color:white;
    background-color: rgb(255,87,87);
    margin-bottom: 18px;
`

const PostContent = styled.div`
    margin-top: 5px;
    margin-bottom: 8px;
    margin-left: 3px;
    font-size: 19px;
    font-weight: 600;
`
const PostInput= styled.input`
    border-radius: 4px;
    width: 530px;
    height: 80px;
    font-size: 20px;
`

const AddButton= styled.button`
    font-size: 20px;
    min-width: 120px;
    width: auto;
    height: 80px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 5px;
    border: 0px;
    outline: none;
    font-weight: normal;
    box-sizing: border-box;
    background-color: rgb(255,87,87);
    font-weight: 600;
    color: rgb(255, 255, 255);

  &:hover {
    color: black;
`