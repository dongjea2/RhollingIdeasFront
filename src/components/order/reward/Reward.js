import styles from './Reward.module.css';

export default function Reward({item}){

    const { rewardNo, rewardPrice, rewardName, deliverDate, rewardNum,
        itemName, deliverSelect, project, makerInfo} = item;

    

    return(
        <>
        <div className={styles.title}> <h3>선물정보</h3> </div>
        <div className={styles.boxForm}>
            <div className={styles.boxItem}>선물구성 : {rewardName} {itemName} </div>
            <div className={styles.boxItem}>선물금액 : {rewardPrice}원</div>
            <div className={styles.boxItem}>예상 전달일 : {deliverDate}</div>
        </div>
        </>
    );
}
