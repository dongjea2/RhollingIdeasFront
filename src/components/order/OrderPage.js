import styles from './OrderPage.module.css';
import item from '../../api/mock/orderMock.json'
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';
import Loading from '../Loading';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function OrderPage(){

    return(
        <>
        <div className="orderRap">
            <OrderProject project={item.project}/>
            <div className={styles.itemLeftRight}>
                <div className={styles.Left}>
                    <Reward item={item}/>
                    <UserInfo userInfo={item.userInfo}/>
                </div>
                <div className={styles.Right}>
                    <OrderButton />
                </div>
            </div>
        </div>
        </>
    );
}



function OrderButton(){
    const [lodingFinish , setLodingFinish] = useState(true);
    const [buttonDisable, setButtonDisable] = useState(false);
    const navigate = useNavigate();

    function handleClick(e) {

        e.preventDefault();
        setLodingFinish(false);
        setButtonDisable(true);
       // setTimeout(() => { window.location.replace("/")}, 2000);
        setTimeout(() => { navigate('/')}, 2000);
        


    }

    return(
				<div className={styles.itemRight}>
				<form>
				<div className={styles.finalPayment}>최종후원금액 {item.rewardPrice}원</div>
                <button className={styles.paymentButton} disabled={buttonDisable} onClick={handleClick}> 
                    {lodingFinish ?  '후원하기!': <Loading/>}
                </button>
				</form>
				</div>
    );
}
