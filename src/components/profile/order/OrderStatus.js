import { Link } from 'react-router-dom';
import contents from './orderlistcontent.json';
import styles from './OrderList.module.css';

// 각 후원(주문) 상태별로 보여주기 위한 컴포넌트
export default function OrderStatus({ list }){
    //주문 상태 출력 위한
    const status = contents.filter(function (content){
        return content.orderResult === list[0].orderResult;
    });
    //날짜포맷
    // function leftPad(value){ 
    //     if (value >= 10) { 
    //         return value; 
    //     } 
    //     return `0${value}`; 
    // }
    // function toStringByFormatting(source, delimiter = '-') { 
    //     const year = source.getFullYear(); 
    //     const month = leftPad(source.getMonth() + 1); 
    //     const day = leftPad(source.getDate() -1); 
    //     return [year, month, day].join(delimiter); 
    // }

    return(
        <>
        <div className={styles.order}>
            <div className={styles.orderCont}>
                <span className={styles.orderResult}>{status[0].orderResult}</span>
                ({list.length})
            </div>
            {list.map(order => 
            <div className={styles.eachOrderContent} key={order.orderNo}>
                <div className={styles.orderImg}>
                    <Link to={'/orderlist/' + Number(order.orderNo)} state={{order: order}} >
                        <img src={require(`../../../${order.reward.project.projectImage}`)} alt="project image" />
                    </Link>
                </div>
                <div>
                    <div className={styles.datePayno}>{order.orderDate.substring(0, 10)} | 후원번호 {order.orderNo} </div>
                    <div className={styles.longTitle}>
                        <Link to={'/orderlist/' + Number(order.orderNo)} state={{order: order}}>
                            {order.reward.project.longTitle}
                        </Link>
                    </div>
                    {order.reward.rewardName !== null &&
                        <div className={styles.rewardName}>
                            {order.reward.rewardName}
                        </div>
                    }
                    <div className={styles.rewardItem}>
                        {/* {order.reward.rewardName !== null &&
                            <div>
                                {order.reward.rewardName}
                            </div>} */}
                        {order.reward.itemName !== null &&
                            <ul>
                                <li>{order.reward.itemName}</li>
                            </ul>}
                    </div>
                    {order.orderResult !== '펀딩실패' && 
                    <>
                    <div className={styles.deliverDate}>선물 전달 예정일 {order.reward.project.endDate.substring(0, 10)}</div>
                    {order.orderResult === '결제완료' ?
                        <div className={styles.totalPrice}>{order.totalPrice.toLocaleString('ko-KR')}원 결제 완료</div> :
                        <div className={styles.totalPrice}>{order.totalPrice.toLocaleString('ko-KR')}원 결제 예정</div>
                    }
                    </>
                    }
                </div>
            </div>
             )}
        </div>
        </>
    )
}