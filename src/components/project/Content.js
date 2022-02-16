import React, {Component ,useState} from 'react';
import { useParams } from 'react-router-dom';

export default function Content(){
    const { prodNo } = useParams();
   
    return ( 
    <div>
        프로젝트 {prodNo}의 상세내용
    </div>  
    );
}
