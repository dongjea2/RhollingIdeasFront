import styles from './OrderPage.module.css';
import item from '../../api/mock/orderMock.json'
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';


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
                    <OrderButton/>
                </div>
            </div>
        </div>
        </>
    );
}



function OrderButton(){

    return(

				<div className={styles.itemRight}>
				<form>

				<div className={styles.finalPayment}>최종후원금액 {item.rewardPrice}원</div>
                <button className={styles.paymentButton} >후원하기!</button>
				</form>
				</div>
    );
}
