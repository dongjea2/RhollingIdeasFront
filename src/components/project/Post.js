import React, {Component, useState} from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';

export default function Post() {

    const { prodNo } = useParams();
   
            return ( 
                <>
            <div>
                프로젝트 {prodNo}의 커뮤니티게시글내용
            </div>
            <Comments></Comments>
            </> 
            );
}
