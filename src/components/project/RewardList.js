import axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';


export default function Post() {    
    const { prodNo } = useParams(); 

      const [info, setInfo] = useState([]);

      useEffect(() => {
        axios.get("/reward/" + Number(prodNo))
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, []);

       console.log(info);

        return ( 
        <>
             프로젝트 {prodNo}의 선물정보
             <div key={info && info.rewardNo}>
                <div style={{display:'none'}}>선물번호{info && info.rewardNo}</div>
                <div>선물금액:{info.rewardPrice}</div>
                <div>선물이름:{info.rewardName}</div>
                <div>선물재고:{info.rewardNum}</div>
            </div>
        </> 
        );
}

