import axios from 'axios';
import { useEffect, useState } from 'react';
import './OrderList.css';
import OrderStatus from './OrderStatus';

// 후원(주문)현황 컴포넌트
export default function OrderList() {
    const [infos, setInfo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    axios.get('http://localhost:9998/reward/3')
    .then((Response)=>{console.log(Response.data)})
    .catch((Error)=>{console.log(Error)})
    // 가상데이터
    useEffect(() => {
        axios.get('http://localhost:9998/reward/3')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
    }, []);

    // 검색내역으로 필터된 목록
    const filteredList = infos.filter((order) => {
                                if(searchTerm === ""){
                                    return order;
                                }else if(order.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return order;
                                }else{
                                    return null;
                                }});
    
    // 펀딩 실패 리스트
    const failList = filteredList.filter(function (order){
        return order.userId === 1;
    });

    // 진행중 리스트
    const ongoingList = filteredList.filter(function (order){
        return order.userId === 2;
    });
    
    // 펀딩 성공 리스트
    const fundingSuccessList = filteredList.filter(function (order){
        return order.userId === 3;
    });

    // 주문 성공 리스트
    const orderSuccessList = filteredList.filter(function (order){
        return order.userId === 4;
    });

    const orderlength = failList.length + ongoingList.length + fundingSuccessList.length + orderSuccessList.length;
    return(
        <section>
        <div className="interest-header">
            <div className="interest-h1"><h1>후원현황</h1></div>
            </div>
            <div className="order-list">
            <div className="order-cnt-search">
                <div className="order-cnt">
                <span>{orderlength}</span>건의 후원 내역이 있습니다.
                </div>
                <div className="order-search">
                <div><img src={require('../../../images/mainpage/search2.png')} alt="search" /></div>
                <input type="search" placeholder="프로젝트, 선물, 창작자를 검색하세요" className="search-input" defaultValue="" autoComplete="off" onChange={(e) => {setSearchTerm(e.target.value);}} />
                </div>
            </div>
        </div>
        {
            infos.length === 0 ?
        <div className="noorder-content">
            <br/><br/>
            <div className="no-content">
              <img src={require('../../../images/profile/empty present.png')} alt="empty_present" />
              <div>후원한 프로젝트가 없습니다.</div>
            </div>
        </div> :
        <div className="order-content">
            {failList.length !== 0 && <OrderStatus list={failList} />}
            {ongoingList.length !== 0 && <OrderStatus list={ongoingList}/>}
            {fundingSuccessList.length !== 0 && <OrderStatus list={fundingSuccessList}/>}
            {orderSuccessList.length !== 0 && <OrderStatus list={orderSuccessList}/>}
        </div>
        }
        </section>
    )
}