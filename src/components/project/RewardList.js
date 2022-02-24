import axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Post() {    
    const { prodNo } = useParams(); 

      const [info, setInfo] = useState([]);

      useEffect(() => {
        axios.get("/rewardlist/" + Number(prodNo))
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
       }, []);

       console.log(info);

        return ( 
        <>
        
             프로젝트 {prodNo}의 선물정보
            {/* Link to orderno/{rewardNo} */}
            
            {info.map((reward)=>
             <Link to={`/order/${reward.rewardNo}`}>
             <div key={reward.rewardNo}>
                <div style={{display:'none'}}>선물번호{reward.rewardNo}</div>
                <div>선물금액:{reward.rewardPrice}</div>
                <div>선물이름:{reward.rewardName}</div>
                <div>선물재고:{reward.rewardNum}</div>
            </div>
            </Link>
            )}
        </> 
        );
}

