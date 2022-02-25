import { useLocation} from "react-router-dom";
import './OrderDetail.css';
import { Link } from "react-router-dom";

export default function OrderDetail(){
    const location =useLocation();
    const order = location.state.order;
    const project = order.reward.project;
    console.log(order);

    function leftPad(value){ 
        if (value >= 10) { 
            return value; 
        } 
        return `0${value}`; 
    }
    function toStringByFormatting(source, delimiter = '. ') { 
        const year = source.getFullYear(); 
        const month = leftPad(source.getMonth() + 1); 
        const day = leftPad(source.getDate()); 
        return [year, month, day].join(delimiter); 
    }

    return (
        <section>
        <div className="project-container">
            <div className="project-img">
                <a href={"/projectdetail/" + order.orderNo}>
                    <img src={require(`../../../${project.projectImage}`)} alt="projectImg" />
                </a>
            </div>
            <div className="project-text">
                <div className="cate-maker">{project.category.categoryName} | {project.maker.userName}</div>
                <div className="longtitle">
                    <a href={"/projectdetail/" + order.orderNo}>
                        {project.longTitle}
                    </a>
                </div>
                <div>
                    <span className="sumprice">{project.projectChange.sumPrice.toLocaleString('ko-KR')}원 </span>
                    <span className="rate"> {project.achiveRate}%</span>
                    <span className="payresult">· {order.orderResult}</span>
                </div>
                <Link to={"/"} className="message">
                    창작자에게 문의
                </Link>
            </div>
        </div>
        <div className="orderinfo-container">
            <div className="orderinfo-title"><p>후원 정보</p></div>
            <div className="orderinfo">
                <table>
                <thead>
                    <tr>
                        <th>후원 날짜</th>
                        <td>{toStringByFormatting(new Date(order.orderDate))}</td>
                    </tr>
                    <tr>
                        <th>후원 번호</th>
                        <td>{order.orderNo}</td>
                    </tr>
                    <tr>
                        <th>펀딩 마감일</th>
                        <td>{toStringByFormatting(new Date(order.reward.project.endDate))}</td>
                    </tr>
                </thead>
                </table>
            </div>

            <div className="orderinfo-title"><p>선물 정보</p></div>
            <div className="orderinfo">
                <table>
                <thead>
                    <tr>
                        <th>선물 구성</th>
                        <td>{order.reward.rewardName}
                            {order.reward.itemName &&
                                <ul className="item">
                                    <li>{order.reward.itemName}</li>
                                </ul>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>후원 금액</th>
                        <td>{order.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <th>전달 상태</th>
                        <td>{order.reward.deliverSelect === '1' ? 
                            (order.orderResult === '펀딩실패' ?
                            '펀딩실패' : '배송 예정'
                            ) :
                            '미배송 상품'
                        }</td>
                    </tr>
                </thead>
                </table>
            </div>

            <div className="orderinfo-title"><p>결제 정보</p></div>
            <div className="orderinfo">
                <table>
                <thead>
                    <tr>
                        <th>결제 수단</th>
                        <td>카드({order.card.cardNum.substring(12)})</td>
                    </tr>
                    <tr>
                        <th>결제 금액</th>
                        <td>{order.totalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <th>결제 상태</th>
                        <td>{order.orderResult}</td>
                    </tr>
                </thead>
                </table>
            </div>
            {order.reward.deliverSelect === '1' &&
            <>
            <div className="orderinfo-title"><p>배송 정보</p></div>
            <div className="orderinfo">
                <table>
                <thead>
                    <tr>
                        <th>받는 사람</th>
                        <td>{order.address.receiverName}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{order.address.receiverPhone.substring(0, 3)}-{order.address.receiverPhone.substring(3, 7)}-{order.address.receiverPhone.substring(7)}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>({order.address.receiverZipcode}) {order.address.receiverAddress} {order.address.receiverAddressDetailed}</td>
                    </tr>
                    <tr>
                        <th>운송장 번호</th>
                        <td>운송장 번호가 등록되지 않았습니다.</td>
                    </tr>
                </thead>
                </table>
            </div>
            </>
            }
            <Link to="/orderlist" replace={true}><button type="button" className="orderlistpage">후원목록 보기</button></Link>
        </div>
        </section>
    )
}