import item from '../../api/mock/orderMock.json'
import Reward from './reward/Reward';
import OrderProject from './orderProject/OrderProject';
import UserInfo from './userInfo/UserInfo';


export default function OrderPage(){

    return(
        <>
        <div className="orderRap">
            <OrderProject project={item.project}/>
            <Reward item={item}/>
            <UserInfo userInfo={item.userInfo}/>
        </div>
        </>
    );
}

