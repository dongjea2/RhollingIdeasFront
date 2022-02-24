import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './OrderList.module.css';
import OrderStatus from './OrderStatus';

// 후원(주문)현황 컴포넌트
export default function OrderList() {
    const [orders, setOrder] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    //가상데이터
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //     .then(res => setInfo(res.data))
    //     .catch(err => console.log(err));
    // }, []);

    useEffect(() => {
        axios.get("/orderlist")
        .then(res => setOrder(res.data))
        .catch(err => console.log(err));
    }, []);

    // 검색내역으로 필터된 목록
    const filteredList = orders.filter((order) => {
                                if(searchTerm === ""){
                                    return order;
                                }else if(order.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return order;
                                }else{
                                    return null;
                                }});
    
    // 펀딩 실패 리스트
    const failList = filteredList.filter(function (order){
        return order.orderResult === "펀딩실패";
    });

    // 진행중 리스트
    const ongoingList = filteredList.filter(function (order){
        return order.orderResult === "진행중";
    });
    
    // 펀딩 성공 리스트
    const fundingSuccessList = filteredList.filter(function (order){
        return order.orderResult === "펀딩성공";
    });

    // 주문 성공 리스트
    const orderSuccessList = filteredList.filter(function (order){
        return order.orderResult === "결제완료";
    });

    const orderlength = failList.length + ongoingList.length + fundingSuccessList.length + orderSuccessList.length;
    return(
        <section>
        <div className={styles.orderHeader}>
            <div className={styles.interestH1}><h1>후원현황</h1></div>
            </div>
            <div className={styles.orderList}>
            <div className={styles.orderCntSearch}>
                <div className={styles.orderCnt}>
                <span>{orderlength}</span>건의 후원 내역이 있습니다.
                </div>
                <div className={styles.orderSearch}>
                <div><img src={require('../../../images/mainpage/search2.png')} alt="search" /></div>
                <input type="search" placeholder="프로젝트, 선물, 창작자를 검색하세요" className="search-input" defaultValue="" autoComplete="off" onChange={(e) => {setSearchTerm(e.target.value);}} />
                </div>
            </div>
        </div>
        {
            orders.length === 0 ?
        <div className={styles.noOrderContent}>
            <br/><br/>
            <div className={styles.noContent}>
              <img src={require('../../../images/profile/empty present.png')} alt="empty_present" />
              <div>후원한 프로젝트가 없습니다.</div>
            </div>
        </div> :
        <div className={styles.orderContent}>
            {failList.length !== 0 && <OrderStatus list={failList} />}
            {ongoingList.length !== 0 && <OrderStatus list={ongoingList}/>}
            {fundingSuccessList.length !== 0 && <OrderStatus list={fundingSuccessList}/>}
            {orderSuccessList.length !== 0 && <OrderStatus list={orderSuccessList}/>}
        </div>
        }
        </section>
    )
}