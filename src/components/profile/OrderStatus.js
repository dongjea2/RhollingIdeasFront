import { Link } from 'react-router-dom';
import contents from './orderlistcontent.json';

// 각 후원(주문) 상태별로 보여주기 위한 컴포넌트
export default function OrderStatus({ list }){
    const status = contents.filter(function (content){
        return content.id === list[0].userId;
    });
    return(
        <>
        <div className='order'>
            <div className="payment-cont">
                <span className='paymentresult'>{status[0].paymentresult}</span>
                ({list.length})
            </div>
            {list.map(order => 
            <div className="each-order-content" key={order.id}>
                <div className="date-payno">{status[0].date_pay_no} | 후원번호 {order.id} </div>
                <div className="longtitle">
                    <Link to={"/orderdetail/" + Number(order.id)}>
                        {order.title}
                    </Link>
                </div>
                <div className="deliverselect">
                    무료배송 or 미배송상품
                </div>
                <div className='reward-item'>
                    <div>
                        리워드이름 있으면 출력
                    </div>
                    아이템있으면
                    <ul>
                        <li>아이템이름</li>
                    </ul>
                </div>
                {status[0].paymentresult !== '펀딩 실패' && 
                <>
                <div className='deliverdate'>선물 전달 예정일</div>
                <div className='totalprice'>000원 결제 완료</div>
                </>
                }
            </div>
             )}
        </div>
        </>
    )
}